import { useState } from "react";
import { BaseButton } from "../../component/button/BaseButton";
import { BaseCard } from "../../component/card/BaseCard";
import { BaseFileInput } from "../../component/input/BaseFileInput";
import { BaseText } from "../../component/text/BaseText";
import { emailApi } from "../../api/email.api";
import { BaseTextArea } from "../../component/input/BaseTextArea";
import { ResponseBox } from "../../component/card/ResponseBox";
import { BaseRadioGroup } from "../../component/input/BaseRadioGroup";

export function Home() {
  const [loading, setLoading] = useState(false);
  const [filesToSent, setFilesToSent] = useState([]);
  const [emailText, setEmailText] = useState("");
  const [responseSugestionForFile, setResponseSugestionForFile] = useState("");
  const [responseSugestionForText, setResponseSugestionForText] = useState("");
  const { sendEmailTextToProcess, sendEmailFileToProcess } = emailApi();
  const [emailType, setEmailType] = useState("file");

  function handleFiles(files) {
    setFilesToSent(files);
  }

  function handleChangeEmailType(val) {
    setEmailType(val);
  }

  async function handleSendText() {
    if (!emailText.length) {
      alert("Insira o texto do email a ser processado!");
      return;
    }

    try {
      setLoading(true);
      const response = await sendEmailTextToProcess(emailText);
      console.log(response);
      setResponseSugestionForText(response.data.responseSugestion);
      return;
    } catch (e) {
      console.log(e);
      alert("Erro ao processar arquivo: " + e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendFile() {
    if (!filesToSent?.length) {
      alert("Insira o arquivo do email a ser processado!");
      return;
    }
    try {
      setLoading(true);
      const response = await sendEmailFileToProcess(filesToSent[0]);
      console.log(response);
      setResponseSugestionForFile(response.data.responseSugestion);
      return;
    } catch (e) {
      console.log(e);
      alert("Erro ao processar email: " + e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <BaseCard className="d-flex flex-column justify-content-around align-items-center">
        <div>
          <BaseText fontSize="24px">
            Ferramenta para classificação de emails
          </BaseText>
          <BaseText fontSize="16px">
            Selecione qual tipo de email classificar
          </BaseText>
          <BaseRadioGroup
            value={emailType}
            options={[
              { value: "file", label: "Arquivo .pdf/.txt" },
              { value: "text", label: "Texto Puro" },
            ]}
            onChange={(val) => handleChangeEmailType(val)}
          />
        </div>

        {emailType === "file" ? (
          <div className="w-100">
            <BaseText fontSize="16px">Insira os arquivos .pdf/.txt</BaseText>
            <div className="p-md-3 p-1">
              <BaseFileInput
                onFilesSelected={handleFiles}
                allowDirectories={true}
                maxFiles={1}
                accept=".pdf,.txt"
              />
            </div>

            <div className=" mt-0 mb-md-0 mb-3 d-flex justify-content-center">
              <BaseButton
                variant="primary"
                onClick={handleSendFile}
                loading={loading}
              >
                Enviar Arquivo
              </BaseButton>
            </div>
            {responseSugestionForFile && (
              <>
                <ResponseBox responseText={responseSugestionForFile} />
                <BaseText fontSize="16px">
                  Clique para copiar o conteúdo da resposta!
                </BaseText>
              </>
            )}
          </div>
        ) : (
          <div className="w-100">
            <BaseText fontSize="16px">Insira o texto do email</BaseText>
            <BaseTextArea
              value={emailText}
              onChange={setEmailText}
              placeholder="Digite o email aqui"
            />
            <div className=" mt-0 mb-md-0 mb-3 d-flex justify-content-center">
              <BaseButton
                variant="primary"
                onClick={handleSendText}
                loading={loading}
              >
                Enviar Texto
              </BaseButton>
            </div>
            {responseSugestionForText && (
              <>
                <ResponseBox responseText={responseSugestionForText} />
                <BaseText fontSize="16px">
                  Clique para copiar o conteúdo da resposta!
                </BaseText>
              </>
            )}
          </div>
        )}
      </BaseCard>
    </div>
  );
}
