import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from pydantic import BaseModel
from typing import List

db_url = os.getenv("DATABASE_URL", "postgresql://user:password@db:5432/wallet_db")
engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class CardDB(Base):
    __tablename__ = "cards"
    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    code = Column(String)
    color = Column(String)

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CardSchema(BaseModel):
    id: str
    name: str
    code: str
    color: str

@app.post("/sync")
def sync_cards(cards: List[CardSchema], db: Session = Depends(lambda: SessionLocal())):
    for card in cards:
        db_card = db.query(CardDB).filter(CardDB.id == card.id).first()
        if db_card:
            db_card.name = card.name
            db_card.code = card.code
            db_card.color = card.color
        else:
            db.add(CardDB(**card.dict()))
    db.commit()
    return {"status": "synced"}

@app.get("/cards")
def get_cards(db: Session = Depends(lambda: SessionLocal())):
    return db.query(CardDB).all()