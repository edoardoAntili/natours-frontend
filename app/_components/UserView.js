import AccountSettings from "./AccountSettings";
import PasswordChange from "./PasswordChange";

import { getLoggedInUser } from "../_utils/api";

export default async function UserView() {
  const user = await getLoggedInUser();

  return (
    <div className="flex-1 py-28 px-0">
      <AccountSettings user={user} />

      <div className="w-full h-[1px] bg-[#e0e0e0] my-24 mx-0">&nbsp;</div>

      <PasswordChange />
    </div>
  );
}
