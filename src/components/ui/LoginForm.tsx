import { useState } from "react";
import Input from "./Input";
import logo from "../../assets/IncludeHub-.png";
import Button from "./Button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">

      <form className="w-full max-w-md bg-[#656877] p-8 rounded-xl shadow-lg flex flex-col gap-5">

        <img
          src={logo}
          alt="Logo da aplicação"
          className="w-64 h-32 object-contain mx-auto"
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          autoComplete="email"
          required
        />

        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSenha(event.target.value)
          }
          autoComplete="current-password"
          required
        />

        <Button type="submit">
          Login
        </Button>

      </form>
    </div>
  );
}

export default LoginForm;