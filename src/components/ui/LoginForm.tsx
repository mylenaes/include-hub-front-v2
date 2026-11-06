import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import logo from "../../assets/IncludeHub-.png";
import Button from "./Button";
import { useAuth } from "../../context/AuthContext";
import { HttpError } from "../../services/http";

function LoginForm() {
  // Estados dos campos
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estado do envio do formulário
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Acesso à autenticação e navegação
  const {
    login,
    user,
    carregando: verificandoSessao,
  } = useAuth();

  const navigate = useNavigate();

  // Redireciona usuários já autenticados
  useEffect(() => {
    if (!verificandoSessao && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, verificandoSessao, navigate]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      await login(email, senha);

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof HttpError) {
        setErro("Email ou senha inválidos");
      } else {
        setErro("Não foi possível conectar ao servidor.");
      }
    } finally {
      setCarregando(false);
    }
  }

  // Aguarda a verificação da sessão
  if (verificandoSessao) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Verificando sessão...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#656877] p-8 rounded-xl shadow-lg flex flex-col gap-5"
      >
        <img
          src={logo}
          alt="Logo da aplicação"
          className="w-64 h-32 object-contain mx-auto"
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          disabled={carregando}
        />

        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          autoComplete="current-password"
          required
          disabled={carregando}
        />

        {erro && (
          <p className="text-sm text-red-300 text-center" role="alert">
            {erro}
          </p>
        )}

        <Button type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
