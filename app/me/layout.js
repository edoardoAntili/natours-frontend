import AccountNav from "../_components/AccountNav";
import { getLoggedInUser } from "../_utils/api";

export const instant = false;

async function AccountLayout({ children }) {
  const user = await getLoggedInUser();

  return (
    <main className="main">
      <div className="user-view">
        <AccountNav user={user} />

        {children}
      </div>
    </main>
  );
}

export default AccountLayout;
