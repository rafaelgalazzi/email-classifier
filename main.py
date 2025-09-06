from fastapi import FastAPI, UploadFile, File, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from src.services.process_email_service import ProcessEmailService

app = FastAPI(title="AutoU Email Classifier", root_path="/api")

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
    try:
        process_email_result = await email_service.process_email_file(file)
        print(process_email_result)
        return JSONResponse(content={
            "response_suggestion": process_email_result["response_suggestion"],
            "classification": process_email_result["classification"]
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar email: {str(e)}")


@app.post("/process-email-text")
async def process_email_text(payload: dict = Body(...)):
    email_text = payload.get("emailText")

    if not email_text:
        raise HTTPException(status_code=400, detail="O campo 'emailText' é obrigatório")

    email_service = ProcessEmailService()

    try:
        process_email_result = await email_service.process_email_text(email_text)
        print(process_email_result)
        return JSONResponse(content={
            "response_suggestion": process_email_result.get("response_suggestion", ""),
            "classification": process_email_result.get("classification", "unknown")
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar email: {str(e)}")