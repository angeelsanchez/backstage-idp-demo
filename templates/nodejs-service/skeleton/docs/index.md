# ${{ values.name }}

${{ values.description }}

## Descripcion

Este servicio fue creado automaticamente mediante el Scaffolder de Backstage.

## API Endpoints

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/` | Informacion del servicio |
| GET | `/health` | Health check |

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar tests
npm test
```

## Despliegue

El servicio se despliega automaticamente mediante ArgoCD cuando hay cambios en la rama `main`.

## Arquitectura

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   GitHub    │────▶│   GitHub    │────▶│    GHCR     │
│   (code)    │     │   Actions   │     │   (image)   │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Backstage  │◀────│   ArgoCD    │◀────│ Kubernetes  │
│   (portal)  │     │   (gitops)  │     │   (runtime) │
└─────────────┘     └─────────────┘     └─────────────┘
```
