import { updateAccountSettings } from "../_utils/api";
import SubmitButton from "./SubmitButton";

export default function AccountSettings({ user }) {
  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>

      <form className="form form-user-data" action={updateAccountSettings}>
        <div className="form__group">
          <label className="form__label" htmlFor="name">
            Name
          </label>

          <input
            id="name"
            className="form__input"
            type="text"
            defaultValue={user.name}
            required
            name="name"
          />
        </div>

        <div className="form__group ma-bt-md">
          <label className="form__label" htmlFor="email">
            Email address
          </label>

          <input
            id="email"
            className="form__input"
            type="email"
            defaultValue={user.email}
            required
            name="email"
          />
        </div>

        <div className="form__group form__photo-upload">
          <img
            className="form__user-photo"
            src={`/img/users/${user.photo}`}
            alt="User photo"
          />

          <input
            id="photo"
            className="form__upload"
            type="file"
            accept="image/*"
            name="photo"
          />

          <label htmlFor="photo">Choose new photo</label>
        </div>

        <div className="form__group right">
          <SubmitButton
            text="Save settings"
            loadingText="Saving..."
            className="btn btn--small btn--green"
          />
        </div>
      </form>
    </div>
  );
}
