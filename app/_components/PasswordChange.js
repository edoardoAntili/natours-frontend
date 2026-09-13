import { updatePassword } from "../_utils/api";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";
import SuccessMessage from "./SuccessMessage";

export default function PasswordChange() {
  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Password change</h2>

      <form className="form form-user-password" action={updatePassword}>
        <div className="form__group">
          <label className="form__label" htmlFor="password-current">
            Current password
          </label>

          <input
            id="password-current"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            name="passwordCurrent"
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="password">
            New password
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

        <div className="form__group ma-bt-lg">
          <label className="form__label" htmlFor="password-confirm">
            Confirm password
          </label>

          <input
            id="password-confirm"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            name="passwordConfirm"
          />
        </div>

        <div className="form__group right">
          <ErrorMessage errorName="errorPassword" />
          <SuccessMessage successName="successPassword" />

          <SubmitButton
            text="Save password"
            loadingText="Saving..."
            className="btn btn--small btn--green btn--save-password"
          />
        </div>
      </form>
    </div>
  );
}
