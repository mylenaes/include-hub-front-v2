import { useState } from "react";
import type { FormEvent } from "react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { infoRotulo } from "../../utils/formatadores";
import type { Projeto } from "../../types/projeto";
import type { RotuloSaude } from "../../types/rotulos";

interface CardSaudeProjetoProps {
  projeto: Projeto;
  salvando: boolean;
  erro: string | null;
  onSalvar: (status: RotuloSaude, justificativa?: string) => void;
}

const opcoes: RotuloSaude[] = ["NO_PRAZO", "EM_RISCO", "ATRASADO"];

const CardSaudeProjeto = ({
  projeto,
  salvando,
  erro,
  onSalvar,
}: CardSaudeProjetoProps) => {
  const [status, setStatus] = useState<RotuloSaude>(projeto.status);
  const [justificativa, setJustificativa] = useState("");
  const atual = infoRotulo(projeto.status);
  const semMudanca = status === projeto.status && justificativa.trim() === "";
  const faltaJustificativa = status === "ATRASADO" && justificativa.trim() === "";

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    if (semMudanca || salvando) return;
    onSalvar(status, justificativa.trim() || undefined);
    setJustificativa("");
    if (semMudanca || faltaJustificativa || salvando) return;
  };

  return (
    <form
      onSubmit={enviar}
      className="flex flex-col gap-5 rounded-2xl border border-[#A5AED8]/50 bg-[#2A2E42] p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-white">{projeto.nome}</h2>
        <Badge texto={atual.texto} cor={atual.cor} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {opcoes.map((opcao) => {
          const selecionado = status === opcao;
          return (
            <button
              key={opcao}
              type="button"
              onClick={() => setStatus(opcao)}
              aria-pressed={selecionado}
              className={`rounded-lg border py-3 text-xl font-medium transition ${
                selecionado
                  ? "border-blue-500 bg-[#16294F] text-blue-300"
                  : "border-[#A5AED8]/50 text-white hover:bg-[#33385A]"
              }`}
            >
              {infoRotulo(opcao).texto}
            </button>
          );
        })}
      </div>

      <textarea
        value={justificativa}
        onChange={(e) => setJustificativa(e.target.value)}
        placeholder={
          status === "ATRASADO"
            ? "Justificativa (obrigatória para Atrasado)"
            : "Justificativa (opcional)"
        }
        aria-label="Justificativa"
        rows={4}
        className="w-full resize-none rounded-lg border border-[#A5AED8]/50 bg-[#2A2E42] px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      {erro && (
        <p role="alert" className="text-sm text-red-500">
          {erro}
        </p>
      )}

      <Button type="submit" disabled={semMudanca || faltaJustificativa || salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
};
export default CardSaudeProjeto;