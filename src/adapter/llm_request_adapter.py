import google.generativeai as genai

class LLMRequestAdapter:
    def __init__(self, api_key):
        genai.configure(api_key=api_key)

        # Modelo gratuito do Gemini
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    async def send_data_to_llm_and_decide(self, text: str) -> str:
        prompt = f"""
        Classifique o texto abaixo como 'Produtivo' ou 'Improdutivo'.
        Produtivo: Emails que requerem uma ação ou resposta específica
        (ex.: solicitações de suporte técnico, atualização sobre casos em aberto, dúvidas sobre o sistema).
        Improdutivo: Emails que não necessitam de uma ação imediata 
        (ex.: mensagens de felicitações, agradecimentos).
        Responda apenas com uma das palavras: Produtivo ou Improdutivo.

        Texto: {text}
        """
        return await self.request_to_llm(prompt)

    async def suggest_response(self, text: str, classification: str) -> str:
        if classification == "Improdutivo":
            prompt = f"""
            O texto abaixo foi classificado como 'Improdutivo'. 
            Sugira uma resposta profissional e direta para o e-mail.

            Texto: {text}
            """

            return await self.request_to_llm(prompt)
    
        prompt = f"""
        O texto abaixo foi classificado como 'Produtivo'. 
        Sugira uma resposta profissional e direta para o e-mail.

        Texto: {text}
        """
        return await self.request_to_llm(prompt)

    async def request_to_llm(self, prompt: str):
        response = self.model.generate_content(prompt)
        return response.text.strip()