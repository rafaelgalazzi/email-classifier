import { BaseCard } from "../../component/card/BaseCard";
import { BaseText } from "../../component/text/BaseText";

export function About() {
  return (
    <div>
      <BaseCard className="d-flex flex-column justify-content-around align-items-center">
        <div>
          <BaseText fontSize="24px">Sobre este Projeto</BaseText>
          <BaseText fontSize="16px">
            Este projeto foi desenvolvido exclusivamente para a participação em
            um desafio técnico de uma vaga de trabalho.
          </BaseText>
          <BaseText fontSize="16px">
            O objetivo principal é demonstrar habilidades em Frontend, Backend e
            integração com Inteligência Artificial.
          </BaseText>
          <BaseText fontSize="16px" color="#ff6b6b">
            Todo o conteúdo, código-fonte e materiais aqui presentes são de uso
            pessoal e não podem ser utilizados, copiados ou distribuídos para
            outros fins sem autorização expressa.
          </BaseText>
        </div>
      </BaseCard>
    </div>
  );
}
