import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// Interceptor para respostas de erro
api.interceptors.response.use(
  (response) => response, // Se der certo, apenas retorna a resposta
  (error) => {
    // Verifica se é erro vindo da API
    if (error.response) {
      // Aqui você pode customizar a mensagem
      const message = error.response.data?.detail || "Erro inesperado no servidor";
      
      // Rejeita a Promise com uma mensagem formatada
      return Promise.reject({
        status: error.response.status,
        message: message,
        data: error.response.data
      });
    }

    // Caso não tenha resposta (ex: servidor caiu)
    return Promise.reject({
      status: 500,
      message: "Não foi possível conectar ao servidor"
    });
  }
);

export default api;