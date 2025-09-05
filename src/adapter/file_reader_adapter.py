import io
from typing import Union
from pypdf import PdfReader
from fastapi import UploadFile

class FileReaderAdapter:
    def __init__(self):
        pass

    async def read_txt_or_pdf_file(self, file: UploadFile) -> str:
        filename = file.filename.lower()

        file_bytes = await file.read()

        if filename.endswith(".txt"):
            return file_bytes.decode("utf-8", errors="ignore")

        elif filename.endswith(".pdf"):
            return self._read_pdf(file_bytes)

        else:
            raise ValueError("Unsupported file format. Please upload .txt or .pdf")

    def _read_pdf(self, file_bytes: bytes) -> str:
        reader = PdfReader(io.BytesIO(file_bytes))
        content = []
        for page in reader.pages:
            text = page.extract_text() or ""
            content.append(text)
        return "\n".join(content)
