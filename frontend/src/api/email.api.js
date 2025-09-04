import api from "./index.js"; // axios já configurado

export function emailApi() {
  async function sendEmailTextToProcess(text) {
    return await api.post("/process-email-text", { emailText: text });
  }

  async function sendEmailFileToProcess(files) {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file)); // pode enviar vários

    return await api.post("/process-email-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  return {
    sendEmailTextToProcess,
    sendEmailFileToProcess,
  };
}
