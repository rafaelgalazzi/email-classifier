from src.adapter.file_reader_adapter import FileReaderAdapter

class ProcessEmailService:

    def __init__(self):
        pass

    def process_email_file(self, data):

        
        file_reader = FileReaderAdapter()
        file_content = file_reader.read_txt_or_pdf_file(data)


        return file_content

    def process_email_text(self, text):
        return text