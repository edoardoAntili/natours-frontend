import AccountNav from "../_components/AccountNav";
import { getLoggedInUser } from "../_utils/api";

export const instant = false;

async function AccountLayout({ children }) {
  const user = await getLoggedInUser();

  return (
    <main className="bg-[#f7f7f7] flex-1 relative py-32 px-24">
      <div className="bg-white max-w-480 min-h-screen rounded-[3px] overflow-hidden shadow-[0_2.5rem_8rem_2rem_rgba(0,_0,_0,_0.07)] flex my-0 mx-auto">
        <AccountNav user={user} />

        {children}
      </div>
    </main>
  );
}

export default AccountLayout;
