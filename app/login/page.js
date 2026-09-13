import { Suspense } from "react";
import LoginForm from "../_components/LoginForm";
import Loading from "../_components/Loading";

function Login({ searchParams }) {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>

        <Suspense fallback={<Loading />}>
          <LoginForm searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

export default Login;
