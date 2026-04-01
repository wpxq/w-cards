import pytest
from httpx import AsyncClient, ASGITransport
from server import app

@pytest.mark.asyncio
async def test_read_cards():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.get("/cards")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)

@pytest.mark.asyncio
async def text_create_card():
    new_card = {
        "name": "Test",
        "barcode": "13371887",
        "color": "#000000"
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        resp = await ac.post("/sync", json=[new_card])
    assert resp.status_code == 200
    assert "success" in resp.json()["status"]