# Culture NC

A gardening calendar web app for New Caledonia, served by nginx in a Docker container.

## Why

Knowing when to sow, plant, and harvest in New Caledonia's climate isn't something you find in a single place — most calendars are made for temperate/northern-hemisphere gardening and don't apply here. This app gathers local sowing/harvest data and local production periods into one searchable, mobile-friendly tool.

## What it does

- Browse plants with sowing, planting, and harvest periods
- Month view: see what to sow, plant, or harvest for a given month
- Search and filter plants by name
- Tap a plant to see its detail sheet (timeline, photo, description)
- Installable as a PWA for offline use on mobile

## Prerequisites

- Docker

## Run locally

```bash
docker run -d \
  -p 8080:80 \
  nem0oo/culture-nc:latest
```

Open `http://localhost:8080`.

## Build from source

```bash
docker build --build-arg SHA=$(git rev-parse HEAD) -t culture-nc .
docker run -d -p 8080:80 culture-nc
```

## Stack

| Component  | Technology |
|------------|------------|
| Frontend   | React / Vite / Tailwind CSS |
| Server     | nginx (Docker image `nginx:alpine`) |
| CI/CD      | GitHub Actions |
| Registry   | Docker Hub |
| Deployment | n8n (webhook → Watchtower) |

## CI/CD

### Pull Request → `main`

1. Build the Docker image
2. Start the container
3. Verify that `/version.txt` contains the correct commit SHA

### Push to `main`

1. Tag the current `latest` image as `previous` (for rollback)
2. Build and push the new `latest` image to Docker Hub
3. Trigger deployment via n8n webhook
4. Verify production is serving the new commit SHA — roll back to `previous` automatically on failure

### Required secrets

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN`    | Docker Hub access token |
| `N8N_WEBHOOK_ID`     | n8n webhook ID triggering the redeployment |
