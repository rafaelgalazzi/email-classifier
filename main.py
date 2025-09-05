from fastapi import FastAPI, UploadFile, File, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from src.services.process_email_service import ProcessEmailService

app = FastAPI(title="AutoU Email Classifier")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/process-email-file")
async def process_email_file(file: UploadFile = File(...)):
    email_service = ProcessEmailService()
    process_email_result = await email_service.process_email_file(file)
    return JSONResponse(content={
        "responseSugestion": process_email_result,
        "category": "productive"
    })

@app.post("/process-email-text")
async def process_email_text(payload: dict = Body(...)):
    email_text = payload.get("emailText")
    email_service = ProcessEmailService()
    process_email_result = email_service.process_email_text(email_text)
    return JSONResponse(content={
        "responseSugestion": process_email_result,
        "category": "productive"
    })
