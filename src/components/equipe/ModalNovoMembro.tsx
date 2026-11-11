import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import Select from "../ui/Select";
import { formatarPapel } from "../../utils/formatadores";
import type { Papel } from "../../types/auth";
import type { Categoria } from "../../types/categoria";
import type { NovaPessoa } from "../../types/pessoa";

interface ModalNovoMembroProps {
  categorias: Categoria[];
  salvando: boolean;
  erros: Record<string, string>;
  erroGeral: string | null;
  onSalvar: (dados: NovaPessoa) => void;
  onFechar: () => void;
}

const papeis: Papel[] = ["COLABORADOR", "GERENTE"];

const ModalNovoMembro = ({
  categorias,
  salvando,
  erros,
  erroGeral,
  onSalvar,
  onFechar,
}: ModalNovoMembroProps) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [papel, setPapel] = useState<Papel>("COLABORADOR");
  const [categoriaId, setCategoriaId] = useState("");
  const [horas, setHoras] = useState("40");

  const ehGerente = papel === "GERENTE";

  const valido =
    nome.trim() !== "" &&
    email.trim() !== "" &&
    senha !== "" &&
    (ehGerente || categoriaId !== "") &&
    Number(horas) > 0;

  const enviar = (e: FormEvent) => {
  e.preventDefault();
  if (!valido || salvando) return;
  onSalvar({
    nome: nome.trim(),
    email: email.trim(),
    senha,
    papel,
    ...(ehGerente || categoriaId === "" ? {} : { categoriaId: Number(categoriaId) }),
    horasSemanais: Number(horas),
  });
};

  return (
    <Modal titulo="Novo membro" onFechar={onFechar}>
      <form onSubmit={enviar} className="flex flex-col gap-5">
        <Input
          label="Nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="off"
          erro={erros.nome}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          erro={erros.email}
        />
        <Input
          label="Senha inicial"
          name="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="new-password"
          erro={erros.senha}
        />
        <Select
          label="Papel"
          name="papel"
          value={papel}
          onChange={(e) => {
            const novo = e.target.value as Papel;
            setPapel(novo);
            if (novo === "GERENTE") setCategoriaId("");
          }}
          opcoes={papeis.map((p) => ({ valor: p, texto: formatarPapel(p) }))}
          erro={erros.papel}
        />
        <Select
          label="Categoria"
          name="categoriaId"
          value={categoriaId}
          disabled={ehGerente}
          onChange={(e) => setCategoriaId(e.target.value)}
          opcoes={categorias.map((c) => ({ valor: String(c.id), texto: c.nome }))}
          erro={erros.categoriaId}
        />
        <Input
          label="Horas semanais"
          name="horasSemanais"
          type="number"
          min={1}
          step={0.5}
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
          erro={erros.horasSemanais}
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
export default ModalNovoMembro;