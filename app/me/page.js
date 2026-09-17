import { Suspense } from "react";
import AccountLoginNotice from "../_components/AccountLoginNotice";
import AccountSettings from "../_components/AccountSettings";
import Loading from "../_components/Loading";
import PasswordChange from "../_components/PasswordChange";
import { getLoggedInUser } from "../_utils/api";

async function AccountContent() {
  const user = await getLoggedInUser();

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
