# W-Cards: Offline-First Wallet PWA

A minimalist, high-performance Progressive Web App (PWA) designed to store loyalty cards and barcodes. Built with a focus on speed, offline reliability, and seamless cloud synchronization.

![Preview](https://github.com/wpxq/w-cards/blob/main/w-cards.png)

## Key Features

- **Offline-First Architecture**: Add, view, or delete cards without an internet connection. Data is stored in `localStorage` and synced to the database once you're back online.
- **PWA Ready**: Optimized for mobile. Install it on your iOS or Android home screen for a native app experience.
- **Dynamic Barcodes**: Generates real-time, high-contrast barcodes (CODE128/EAN) for easy scanning at checkout.
- **Fullstack Power**: Powered by a Next.js frontend and a high-speed FastAPI backend.
- **Dockerized**: The entire stack (Frontend, Backend, Database) is orchestrated via Docker Compose for one-command deployment.

## Docker Limits
- **Database**: 256MB RAM, 0.5 CPU
- **Backend**: 512MB RAM, 0.5 CPU
- **Web**: 1024MB RAM, 1.0 CPU

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11), [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database**: [PostgreSQL 15](https://www.postgresql.org/)
- **DevOps**: [Docker](https://www.docker.com/) & Docker Compose

## Setup
```bash
docker-compose up --build
```
### Once the build is finished, you can access the services at:
- **Frontend**: Port 3000
- **Backend**: Port 8000
- **API Docs**: /docs

## Mobile Installation
1. Open the app in your mobile browser
2. Select **"Add to Home Screen"** from the browser menu
3. Use the app even in stores with poor cellular signal

## Config
The system uses env variables for configuration, defined in the `docker-compose.yml` file:
- `DATABASE_URL`: Connection string for the PostgreSQL container.
- `NEXT_PUBLIC_API_URL`: The endpoint used by the frontend to sync data with the backend.
### If you are using Tailscale then add this in `docker-compose.yml`
```yaml
tailscale:
    image: tailscale/tailscale:latest
    hostname: card-wallet
    environment:
      - TS_AUTHKEY=tskey-auth-tvojeklic...
      - TS_STATE_DIR=/var/lib/tailscale
    volumes:
      - ./tailscale_state:/var/lib/tailscale
      - /dev/net/tun:/dev/net/tun
    cap_add:
      - NET_ADMIN
      - NET_RAW
    restart: unless-stopped
```
and you will need to change in `docker-compose.yml` this section `NEXT_PUBLIC_API_URL`