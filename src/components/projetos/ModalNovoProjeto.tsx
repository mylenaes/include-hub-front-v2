import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import Select from "../ui/Select";
import type { Pessoa } from "../../types/pessoa";
import type { NovoProjeto } from "../../types/projeto";

interface ModalNovoProjetoProps {
  gerentes: Pessoa[];
  salvando: boolean;
  erros: Record<string, string>;
  erroGeral: string | null;
  onSalvar: (dados: NovoProjeto) => void;
  onFechar: () => void;
}

const ModalNovoProjeto = ({
  gerentes,
  salvando,
  erros,
  erroGeral,
  onSalvar,
  onFechar,
}: ModalNovoProjetoProps) => {
  const [nome, setNome] = useState("");
  const [cliente, setCliente] = useState("");
  const [gerenteId, setGerenteId] = useState("");
  const [horas, setHoras] = useState("");

  const valido =
    nome.trim() !== "" && cliente.trim() !== "" && gerenteId !== "" && Number(horas) > 0;

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    if (!valido || salvando) return;
    onSalvar({
      nome: nome.trim(),
      cliente: cliente.trim(),
      gerenteId: Number(gerenteId),
      horasContratadas: Number(horas),
    });
  };

  return (
    <Modal titulo="Novo projeto" onFechar={onFechar}>
      <form onSubmit={enviar} className="flex flex-col gap-5">
        <Input
          label="Nome do projeto"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          erro={erros.nome}
        />
        <Input
          label="Cliente"
          name="cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          erro={erros.cliente}
        />
        <Select
          label="Gerente responsável"
          name="gerenteId"
          value={gerenteId}
          onChange={(e) => setGerenteId(e.target.value)}
          opcoes={gerentes.map((g) => ({ valor: String(g.id), texto: g.nome }))}
          erro={erros.gerenteId}
        />
        <Input
          label="Horas contratadas"
          name="horasContratadas"
          type="number"
          min={1}
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
          erro={erros.horasContratadas}
        />
        {erroGeral && (
          <p role="alert" className="text-sm text-red-500">
            {erroGeral}
          </p>
        )}

        <div className="mt-2 flex gap-3">
          <Button onClick={onFechar} disabled={salvando}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!valido || salvando}>
            {salvando ? "Salvando..." : "Salvar projeto"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default ModalNovoProjeto;