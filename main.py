from fastapi import FastAPI, UploadFile, Form
from src.controllers.email_controller import EmailController

app = FastAPI(title="AutoU Email Classifier")

email_controller = EmailController()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/process_email")
async def process_email(file: UploadFile = None):
    return email_controller.process_email(file)