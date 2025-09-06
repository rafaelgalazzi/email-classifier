# Etapa 1: Build do frontend (React)
FROM node:16-alpine as build-frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install --production
COPY frontend/ ./
RUN npm run build

# Etapa 2: Backend + Nginx
FROM python:3.11-slim
WORKDIR /app

# Instala dependências Python
COPY requirements-docker.txt .
RUN pip install --no-cache-dir -r requirements-docker.txt

# Instala Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copia backend
COPY . .

# Copia o build do React para o Nginx
COPY --from=build-frontend /app/build /var/www/html

# Copia config do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expondo a porta que o Railway vai mapear
EXPOSE 80

# Comando para rodar FastAPI + Nginx juntos
CMD uvicorn main:app --host 0.0.0.0 --port 8000 & nginx -g "daemon off;"
