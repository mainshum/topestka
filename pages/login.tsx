import { Input } from "@/components/Input";
import { signIn } from "next-auth/react"

const Wrapper = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full min-h-[calc(100svh-82px)]">
      {children}
    </div>
  );
};

const Login = () => {
  return (
    <Wrapper>
      <form onSubmit={(e) => {
        e.preventDefault();
        const input = (e.target as HTMLFormElement).elements.namedItem('email')! as HTMLInputElement;
        signIn("email", { email: input.value });
      }} className="flex flex-col justify-center items-center gap-8 w-80">
        <h1>Login</h1>
        <Input
          name="email"
          className="pl-0 border-b-eblue rounded-none"
          type="email"
          placeholder="Twój email"
        />
        <button
          type="submit"
          className="btn btn-primary"
          aria-label="Zaloguj się"
        >
          Zaloguj się
        </button>
      </form>
    </Wrapper>
  );
};

export default Login;
