import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import CardSaudeProjeto from "../components/saude/CardSaudeProjeto";
import { projetosService } from "../services/projetosService";
import type { Projeto } from "../types/projeto";
import type { RotuloSaude } from "../types/rotulos";

export default function Saude() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [salvandoId, setSalvandoId] = useState<number | null>(null);
  const [errosCard, setErrosCard] = useState<Record<number, string>>({});

  async function carregar() {
    try {
      setCarregando(true);
      setErro(null);
      const todos = (await projetosService.listar()) ?? [];
      // Projetos internos ficam de fora e o back já filtra os do gerente
      setProjetos(todos.filter((p) => p.tipo !== "INTERNO"));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar(id: number, status: RotuloSaude, justificativa?: string) {
    try {
      setSalvandoId(id);
      setErrosCard((e) => ({ ...e, [id]: "" }));
      await projetosService.alterarStatus(id, status, justificativa);
      // Atualiza só o card alterado, sem recarregar a lista inteira
      setProjetos((lista) => lista.map((p) => (p.id === id ? { ...p, status } : p)));
    } catch (e) {
      const mensagem = e instanceof Error ? e.message : "Erro ao salvar o status";
      setErrosCard((erros) => ({ ...erros, [id]: mensagem }));
    } finally {
      setSalvandoId(null);
    }
  }

  return (
    <section>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Saúde dos projetos</h1>
        <p className="mt-2 text-xl text-[#A5AED8]">
          Atualize o status dos projetos pelos quais você é responsável
        </p>
      </header>

      {carregando && <p className="py-10 text-center text-[#A5AED8]">Carregando projetos...</p>}

      {erro && !carregando && (
        <div role="alert" className="flex flex-col items-center gap-4 py-10">
          <p className="text-red-500">{erro}</p>
          <Button onClick={carregar}>Tentar de novo</Button>
        </div>
      )}

      {!carregando && !erro && projetos.length === 0 && (
        <p className="py-10 text-center text-[#A5AED8]">
          Você não é responsável por nenhum projeto.
        </p>
      )}

      {!carregando && !erro && projetos.length > 0 && (
        <div className="flex flex-col gap-8">
          {projetos.map((p) => (
            <CardSaudeProjeto
              key={p.id}
              projeto={p}
              salvando={salvandoId === p.id}
              erro={errosCard[p.id] || null}
              onSalvar={(status, justificativa) => salvar(p.id, status, justificativa)}
            />
          ))}
        </div>
      )}
    </section>
  );
}