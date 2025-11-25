# ${{ values.name }}

${{ values.description }}

## Overview

This is an event landing page deployed using GitOps principles:

- **Source**: GitHub Repository
- **CI/CD**: GitHub Actions
- **Registry**: ghcr.io
- **Deployment**: ArgoCD
- **Platform**: Kubernetes

## Quick Links

- [GitHub Repository](https://github.com/${{ values.owner }}/${{ values.repo }})
- [GitHub Actions](https://github.com/${{ values.owner }}/${{ values.repo }}/actions)

## Architecture

See [Architecture](architecture.md) for deployment details.
