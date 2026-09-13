import AccountSettings from "./AccountSettings";
import PasswordChange from "./PasswordChange";

import { getLoggedInUser } from "../_utils/api";

export default async function UserView() {
  const user = await getLoggedInUser();

  return (
    <div className="user-view__content">
      <AccountSettings user={user} />

      <div className="line">&nbsp;</div>

      <PasswordChange />
    </div>
  );
}
