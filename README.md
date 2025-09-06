# Classificador de E-mails

## Descrição do Projeto

O Classificador de E-mails é uma aplicação full-stack que utiliza inteligência artificial para classificar e-mails como "Produtivos" ou "Improdutivos" e sugerir respostas apropriadas. A aplicação permite o processamento de e-mails através de arquivos (PDF/TXT) ou texto direto.

### Funcionalidades

- Classificação automática de e-mails como "Produtivos" ou "Improdutivos"
- Geração de sugestões de resposta profissional para e-mails
- Suporte para processamento de arquivos PDF e TXT
- Interface web intuitiva para interação com o usuário
- Processamento de texto em português e inglês

## Tecnologias Utilizadas

### Backend
- **FastAPI**: Framework web para construção da API
- **spaCy**: Biblioteca de processamento de linguagem natural
- **Google Gemini**: API de inteligência artificial para classificação e geração de respostas
- **pypdf**: Biblioteca para leitura de arquivos PDF
- **Docker**: Containerização da aplicação

### Frontend
- **React**: Biblioteca JavaScript para construção da interface
- **Axios**: Cliente HTTP para requisições à API
- **Bootstrap**: Framework CSS para estilização
- **Docker**: Containerização da aplicação

## Pré-requisitos

- Docker instalado
- Conta no Google AI Studio com chave de API

## Configuração Inicial

1. **Obter chave de API do Google Gemini**:
   - Acesse [Google AI Studio](https://aistudio.google.com/)
   - Crie uma conta e gere uma chave de API
   - Adicione a chave ao arquivo `.env`:
     ```
     GOOGLE_API_KEY=SuaChaveDeAPIAqui
     ```

## Execução com Docker

### Como executar

1. **Certifique-se de que você tem uma chave de API do Google Gemini configurada no arquivo `.env`**:
   ```
   GOOGLE_API_KEY=SuaChaveDeAPIAqui
   ```

2. **Construir e executar com Docker**:
   ```bash
   docker build -t email-classifier .
   docker run -p 80:80 --env-file .env email-classifier
   ```

3. **Acessar a aplicação**:
   - Aplicação: http://localhost
   - Backend API: http://localhost/api

## Deploy em Plataformas Gratuitas

### Railway.app (Recomendado)

1. **Crie uma conta em [railway.app](https://railway.app)**
2. **Conecte seu repositório GitHub**
3. **Selecione o repositório com seu projeto**
4. **Railway detectará automaticamente o Dockerfile**
5. **Configure as variáveis de ambiente (GOOGLE_API_KEY)**
6. **Clique em "Deploy"**

### Render.com

1. **Crie uma conta em [render.com](https://render.com)**
2. **Conecte seu repositório GitHub**
3. **Escolha "Web Service"**
4. **Configure para usar Dockerfile**
5. **Defina as variáveis de ambiente**
6. **Faça o deploy**

## Estrutura do Projeto

```
email-classifier/
├── src/
│   ├── adapter/
│   │   ├── file_reader_adapter.py
│   │   ├── llm_request_adapter.py
│   │   └── nlp_process_adapter.py
│   └── services/
│       └── process_email_service.py
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── component/
│   │   ├── page/
│   │   └── ...
│   └── ...
├── main.py
├── requirements.txt
├── requirements-docker.txt
├── Dockerfile
├── nginx.conf
└── .env
```

## API Endpoints

### Processar arquivo de e-mail
```
POST /api/process-email-file
Content-Type: multipart/form-data
```

### Processar texto de e-mail
```
POST /api/process-email-text
Content-Type: application/json
Body: { "emailText": "Texto do e-mail aqui" }
```

## Como Funciona

1. **Processamento de Texto**: O texto do e-mail é pré-processado usando spaCy para remover stopwords e aplicar lematização
2. **Classificação**: O texto processado é enviado para a API do Google Gemini para classificação como "Produtivo" ou "Improdutivo"
3. **Geração de Resposta**: Com base na classificação, uma sugestão de resposta apropriada é gerada
4. **Interface**: O frontend exibe a classificação e a sugestão de resposta ao usuário

## Considerações sobre a API do Google Gemini

- É necessário ter uma chave de API válida do Google AI Studio
- A chave deve ser configurada na variável de ambiente `GOOGLE_API_KEY`
- O modelo utilizado é o `gemini-1.5-flash`, que é gratuito mas tem limites de uso
- Para produção, considere utilizar modelos pagos com maiores limites

## Arquitetura Docker

O projeto utiliza uma abordagem de multi-stage build com um único Dockerfile que:

1. **Build do Frontend**: Utiliza Node.js Alpine para construir a aplicação React
2. **Backend + Nginx**: 
   - Utiliza Python 3.11 slim para executar o backend FastAPI
   - Instala o Nginx para servir o frontend e fazer proxy reverso para o backend
   - Configura o Nginx para servir o frontend na raiz (/) e o backend na rota /api

## Limitações Conhecidas

- O modelo gratuito do Google Gemini pode ter limites de requisições por minuto
- O processamento de arquivos PDF grandes pode levar mais tempo
- A precisão da classificação depende da qualidade do modelo de IA

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este repositório é fornecido exclusivamente para avaliação de habilidades técnicas no processo de recrutamento da AutoU. Nenhum direito é concedido para uso, modificação ou redistribuição do código sem permissão explícita do autor.