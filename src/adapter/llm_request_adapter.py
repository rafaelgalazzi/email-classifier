import google.generativeai as genai

class LLMRequestAdapter:
    def __init__(self, api_key):
        genai.configure(api_key=api_key)

        # Modelo gratuito do Gemini
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    async def send_data_to_llm_and_decide(self, text: str) -> str:
        prompt = f"""
        Classifique o texto abaixo como 'produtivo' ou 'improdutivo'.
        Responda apenas com uma das palavras: produtivo ou improdutivo.

        Texto: {text}
        """
        response = self.model.generate_content(prompt)
        return response.text.strip().lower()

    async def suggest_response(self, text: str, classification: str) -> str:
        if classification == "improdutivo":
            return "Obrigado pela sua mensagem!"
        
        prompt = f"""
        O texto abaixo foi classificado como 'produtivo'. 
        Sugira uma resposta profissional e direta para o e-mail.

        Texto: {text}
        """
        response = self.model.generate_content(prompt)
        return response.text.strip()

    async def request_to_llm(self, prompt: str) -> str:
        response = self.model.generate_content(prompt)
        return response.text.strip()