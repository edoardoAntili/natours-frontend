import { Suspense } from "react";
import AccountLoginNotice from "../_components/AccountLoginNotice";
import AccountSettings from "../_components/AccountSettings";
import Loading from "../_components/Loading";
import PasswordChange from "../_components/PasswordChange";
import { getLoggedInUserResult } from "../_utils/api";
import AccountRouteError from "../_components/AccountRouteError";

async function AccountContent() {
  const result = await getLoggedInUserResult();
  if (result.status === "error") return <AccountRouteError resource="account" />;
  const user = result.status === "success" ? result.user : null;

  if (!user) return <AccountLoginNotice />;

  return (
    <>
      <AccountSettings user={user} />

      <div className="w-full h-[1px] bg-[#e0e0e0] my-24 mx-0">&nbsp;</div>

      <PasswordChange />
    </>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AccountContent />
    </Suspense>
  );
}
