import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import logo from "../../assets/IncludeHub-.png";
import fundoLogin from "../../assets/backgroundLogin.jpg";
import Button from "./Button";
import { useAuth } from "../../context/AuthContext";
import { HttpError } from "../../services/http";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const { login, user, carregando: verificandoSessao } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#1B1D29] bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${fundoLogin})` }}
    >
      {verificandoSessao ? (
        <p className="text-white">Verificando sessão...</p>
      ) : (
        <form
          onSubmit={handleLogin}
          className="flex w-full max-w-md flex-col gap-6 rounded-[2rem] bg-[#656877] px-6 py-10 shadow-xl sm:max-w-lg sm:gap-7 sm:px-12 sm:py-14"
        >
         
          <div className="flex justify-center py-2 sm:py-4">
            <img
              src={logo}
              alt="Logo da aplicação"
              className="h-auto w-48 object-contain sm:w-64"
            />
          </div>

          <div className="flex flex-col gap-5">
            <Input
              variante="login"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              disabled={carregando}
            />

            <Input
              variante="login"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              autoComplete="current-password"
              required
              disabled={carregando}
            />
          </div>

          {erro && (
            <p className="text-center text-sm font-medium text-red-200" role="alert">
              {erro}
            </p>
          )}

          <Button type="submit" variante="login" disabled={carregando}>
            {carregando ? "Entrando..." : "Login"}
          </Button>
        </form>
      )}
    </div>
  );
}
export default LoginForm;