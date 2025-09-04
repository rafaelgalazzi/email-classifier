from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from src.services.process_email_service import ProcessEmailService
from fastapi.responses import JSONResponse

app = FastAPI(title="AutoU Email Classifier")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:3000"] para restringir
    allow_credentials=True,
    allow_methods=["*"],   # GET, POST, OPTIONS, etc
    allow_headers=["*"],   # Headers permitidos
)

email_controller = ProcessEmailService()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/process-email-file")
async def process_email(file: UploadFile = None):
    process_email_result = email_controller.process_email_file(file)

    
    return JSONResponse(content={
        "responseSugestion": process_email_result
    })

@app.post("/process-email-text")
async def process_email(file: UploadFile = None):
    process_email_result = email_controller.process_email_text(file)


    
    return JSONResponse(content={
        "responseSugestion": process_email_result
    })