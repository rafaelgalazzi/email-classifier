import api from "./index.js"; // axios já configurado

export function emailApi() {
  async function sendEmailTextToProcess(text) {
    return await api.post("/process-email-text", { emailText: text });
  }

  async function sendEmailFileToProcess(file) {
    const formData = new FormData();
    formData.append("file", file);

    return await api.post("/process-email-file", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return {
    sendEmailTextToProcess,
    sendEmailFileToProcess,
  };
}
