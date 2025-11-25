# Backstage IDP - Cloud Native Latam Summit 2025

Developer portal built with Backstage for GitOps demos.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Backstage  │────▶│   GitHub    │────▶│   Quay.io   │────▶│   ArgoCD    │
│ (Scaffolder)│     │  (CI/CD)    │     │  (Registry) │     │  (GitOps)   │
└─────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
                                                                   │
                                                                   ▼
                                                            ┌─────────────┐
                                                            │ Kubernetes  │
                                                            └─────────────┘
```

## Requirements

- Node.js 18+
- Yarn 4+
- GitHub OAuth App
- Quay.io account

## Setup

```bash
cp .env.example .env
yarn install
yarn dev
```

Required `.env` variables:
- `GITHUB_TOKEN` - Token with `repo` and `workflow` permissions
- `AUTH_GITHUB_CLIENT_ID` / `AUTH_GITHUB_CLIENT_SECRET` - OAuth App credentials
- `QUAY_USERNAME` / `QUAY_PASSWORD` - Quay robot account

## Templates

| Template | Description |
|----------|-------------|
| nodejs-service | Node.js service with GitHub Actions, K8s manifests and TechDocs |
| event-landing | Landing page with full GitOps pipeline |

## Stack

Backstage + GitHub Actions + Quay.io + ArgoCD + Kubernetes
