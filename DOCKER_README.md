# Email Classifier - Docker Setup

## Pré-requisitos
- Docker instalado
- Docker Compose instalado

## Configuração

1. Certifique-se de que você tem uma chave de API do Google Gemini configurada no arquivo `.env`:
```
GOOGLE_API_KEY=SuaChaveDeAPIAqui
```

## Como executar com Docker

### Opção 1: Usando Docker Compose (Recomendado)

```bash
# Construir e iniciar todos os serviços
docker-compose up --build

# Para rodar em background
docker-compose up --build -d
```

### Opção 2: Construir e rodar containers individualmente

```bash
# Construir a imagem do backend
docker build -t email-classifier-backend -f Dockerfile.backend .

# Construir a imagem do frontend
docker build -t email-classifier-frontend -f Dockerfile.frontend .

# Rodar o backend
docker run -p 8000:8000 --env-file .env email-classifier-backend

# Rodar o frontend
docker run -p 3000:3000 email-classifier-frontend
```

## Acessando a aplicação

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Parar os containers

```bash
# Se estiver usando docker-compose
docker-compose down

# Se estiver rodando containers individualmente
docker stop <container_id>
```