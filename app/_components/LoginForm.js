import { login } from "../_utils/api";
import SubmitButton from "./SubmitButton";

async function LoginForm({ searchParams }) {
  const { error } = await searchParams;

  return (
    <form className="form form--login" action={login}>
      <div className="form__group">
        <label className="form__label" htmlFor="email">
          Email address
        </label>

        <input
          id="email"
          className="form__input"
          type="email"
          placeholder="you@example.com"
          required
          name="email"
        />
      </div>

      <div className="form__group ma-bt-md">
        <label className="form__label" htmlFor="password">
          Password
        </label>

        <input
          id="password"
          className="form__input"
          type="password"
          placeholder="••••••••"
          required
          minLength="8"
          name="password"
        />
      </div>

      <div className="form__group">
        <SubmitButton
          text="Login"
          loadingText="Loading..."
          className="btn btn--green"
        />

        {error && <span className="form__error">{error}</span>}
      </div>
    </form>
  );
}

export default LoginForm;
