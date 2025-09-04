import { useState } from "react";
import { BaseButton } from "../../component/button/BaseButton";
import { BaseCard } from "../../component/card/BaseCard";
import { BaseFileInput } from "../../component/input/BaseFileInput";
import { BaseText } from "../../component/text/BaseText";

export function Home() {
  const [loading, setLoading] = useState(false);
  function handleFiles(files) {
    console.log("Arquivos selecionados:", files);
  }

  function handleSendFile() {
    setLoading(true);
    setTimeout(() => {
      alert("Processo finalizado!");
      setLoading(false);
    }, 2000);
  }

  return (
    <div>
      <BaseCard className="d-flex flex-column justify-content-around align-items-center">
        <div>
          <BaseText fontSize="24px">
            Ferramenta para classificação de emails
          </BaseText>
          <BaseText fontSize="16px">
            Insira o .pdf ou .txt do email abaixo
          </BaseText>
        </div>

        <BaseFileInput
          onFilesSelected={handleFiles}
          allowDirectories={true}
          accept=".pdf,.txt"
        />
        <BaseButton variant="primary" onClick={handleSendFile} loading={loading}>
          Enviar Arquivo
        </BaseButton>
      </BaseCard>
    </div>
  );
}
