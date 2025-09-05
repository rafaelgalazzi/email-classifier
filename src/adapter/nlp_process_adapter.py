import spacy

class NLPProcessAdapter:
    def __init__(self, lang= 'pt'):
        if lang == 'pt':
            self.nlp = spacy.load("pt_core_news_sm")
        else: 
            self.nlp = spacy.load("en_core_web_sm")

    def nlp_pre_process(self, text: str) -> str:
        if not text or not isinstance(text, str):
            return ""

        doc = self.nlp(text.lower())
        tokens = [
            token.lemma_
            for token in doc
            if not token.is_stop and token.is_alpha
        ]
        return " ".join(tokens)