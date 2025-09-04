import { useState } from "react";
import { BaseButton } from "../../component/button/BaseButton";
import { BaseCard } from "../../component/card/BaseCard";
import { BaseFileInput } from "../../component/input/BaseFileInput";
import { BaseText } from "../../component/text/BaseText";
import { emailApi } from "../../api/email.api";
import { BaseTextArea } from "../../component/input/BaseTextArea";
import { ResponseBox } from "../../component/card/ResponseBox";

export function Home() {
  const [loading, setLoading] = useState(false);
  const [filesToSent, setFilesToSent] = useState([]);
  const [emailText, setEmailText] = useState("");
  const [responseSugestion, setResponseSugestion] = useState("");
  const { sendEmailTextToProcess, sendEmailFileToProcess } = emailApi();

  function handleFiles(files) {
    setFilesToSent(files);
  }

  async function handleSendFile() {
    if (!filesToSent?.length && !emailText.length) {
      alert("Insira o arquivo do email a ser processado!");
      return;
    }

    try {
      setLoading(true);
      if (filesToSent?.length) {
        const response = await sendEmailFileToProcess(filesToSent);
        console.log(response);
        setResponseSugestion(response.data.responseSugestion);
        return;
      }
      const response = await sendEmailTextToProcess(emailText);
      console.log(response);
      setResponseSugestion(response.data.responseSugestion);
      return;
    } catch (e) {
      console.log(e);
      alert("Erro ao processar arquivo: " + e);
    } finally {
      setLoading(false);
    }
  }

  const isTextDisabled = filesToSent?.length > 0;
  const isFileDisabled = emailText.trim() !== "";

  return (
    <div>
      <BaseCard className="d-flex flex-column justify-content-around align-items-center">
        <div>
          <BaseText fontSize="24px">
            Ferramenta para classificação de emails
          </BaseText>
          <BaseText fontSize="16px">
            Insira o .pdf/.txt do email ou o conteúdo em texto abaixo
          </BaseText>
        </div>

        <BaseTextArea
          value={emailText}
          onChange={setEmailText}
          placeholder="Digite o email aqui"
          maxLength={500}
          disabled={isTextDisabled}
        />

        <BaseFileInput
          onFilesSelected={handleFiles}
          allowDirectories={true}
          maxFiles={1}
          accept=".pdf,.txt"
          disabled={isFileDisabled}
        />
        <div className=" mt-0 mb-md-0 mb-3">
          <BaseButton
            variant="primary"
            onClick={handleSendFile}
            loading={loading}
          >
            Enviar Arquivo
          </BaseButton>
        </div>

        {responseSugestion && (
          <>
            <ResponseBox responseText={responseSugestion} />
            <BaseText fontSize="16px">
              Clique para copiar o conteúdo da resposta!
            </BaseText>
          </>
        )}
      </BaseCard>
    </div>
  );
}
