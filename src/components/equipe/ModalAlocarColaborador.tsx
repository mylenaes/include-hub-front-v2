import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import Select from "../ui/Select";
import type { Categoria } from "../../types/categoria";
import type { NovaAlocacao } from "../../types/alocacao";
import type { Pessoa } from "../../types/pessoa";
import type { Projeto } from "../../types/projeto";

interface ModalAlocarColaboradorProps {
  pessoas: Pessoa[];
  projetos: Projeto[]; 
  categorias: Categoria[];
  salvando: boolean;
  erros: Record<string, string>;
  erroGeral: string | null;
  onSalvar: (projetoId: number, dados: NovaAlocacao) => void;
  onFechar: () => void;
}

const ModalAlocarColaborador = ({
  pessoas,
  projetos,
  categorias,
  salvando,
  erros,
  erroGeral,
  onSalvar,
  onFechar,
}: ModalAlocarColaboradorProps) => {
  const [pessoaId, setPessoaId] = useState("");
  const [projetoId, setProjetoId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [horas, setHoras] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  const periodoValido = inicio !== "" && fim !== "" && fim >= inicio;

  const valido =
    pessoaId !== "" &&
    projetoId !== "" &&
    categoriaId !== "" &&
    Number(horas) > 0 &&
    periodoValido;

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    if (!valido || salvando) return;
    onSalvar(Number(projetoId), {
      pessoaId: Number(pessoaId),
      categoriaId: Number(categoriaId),
      horasPrevistasSemana: Number(horas),
      inicio,
      fim,
    });
  };

  return (
    <Modal titulo="Alocar colaborador" onFechar={onFechar}>
      <form onSubmit={enviar} className="flex flex-col gap-5">
        <Select
          label="Nome"
          name="pessoaId"
          value={pessoaId}
          onChange={(e) => setPessoaId(e.target.value)}
          opcoes={pessoas.map((p) => ({ valor: String(p.id), texto: p.nome }))}
          erro={erros.pessoaId}
        />
        <Select
          label="Projeto"
          name="projetoId"
          value={projetoId}
          onChange={(e) => setProjetoId(e.target.value)}
          opcoes={projetos.map((p) => ({ valor: String(p.id), texto: p.nome }))}
          erro={erros.projetoId}
        />
        <Select
          label="Categoria"
          name="categoriaId"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          opcoes={categorias.map((c) => ({ valor: String(c.id), texto: c.nome }))}
          erro={erros.categoriaId}
        />
        <Input
          label="Horas previstas por semana"
          name="horasPrevistasSemana"
          type="number"
          min={0.5}
          step={0.5}
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
          erro={erros.horasPrevistasSemana}
        />
        <Input
          label="Início"
          name="inicio"
          type="date"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          erro={erros.inicio}
        />
        <Input
          label="Fim"
          name="fim"
          type="date"
          value={fim}
          onChange={(e) => setFim(e.target.value)}
          erro={
            erros.fim ??
            (inicio && fim && fim < inicio ? "O fim não pode ser antes do início" : undefined)
          }
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
            {salvando ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default ModalAlocarColaborador;