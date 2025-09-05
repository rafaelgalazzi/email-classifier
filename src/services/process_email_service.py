from src.adapter.file_reader_adapter import FileReaderAdapter
from src.adapter.nlp_process_adapter import NLPProcessAdapter
from src.adapter.llm_request_adapter import LLMRequestAdapter
import os
from dotenv import load_dotenv

load_dotenv()

class ProcessEmailService:

    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY not configured")
        
        self.api_key = api_key
        pass

    async def process_email_file(self, data):


        file_reader = FileReaderAdapter()
        file_content = await file_reader.read_txt_or_pdf_file(data)

        nlp_process = NLPProcessAdapter(lang='pt')
        pre_processed_text = nlp_process.nlp_pre_process(file_content)


        # Send pre processed text to AI API to decide if it is productive or not and send back a response suggestion

        llm_request = LLMRequestAdapter(self.api_key)

        classification = await llm_request.send_data_to_llm_and_decide(text=pre_processed_text)
        suggestion = await llm_request.suggest_response(text=pre_processed_text, classification=classification)

        return {
            'classification': classification,
            'response_suggestion': suggestion
        }

    async def process_email_text(self, text):

        nlp_process = NLPProcessAdapter()
        pre_processed_text = nlp_process.nlp_pre_process(text)

        # Send pre processed text to AI API to decide if it is productive or not and send back a response suggestion

        llm_request = LLMRequestAdapter(self.api_key)

        classification = await llm_request.send_data_to_llm_and_decide(text=pre_processed_text)
        suggestion = await llm_request.suggest_response(text=pre_processed_text, classification=classification)

        return {
            'classification': classification,
            'response_suggestion': suggestion
        }