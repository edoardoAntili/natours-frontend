import { Suspense } from "react";
import UserView from "../_components/UserView";
import Loading from "../_components/Loading";

function Account() {
  return (
    <Suspense fallback={<Loading />}>
      <UserView />
    </Suspense>
  );
}

export default Account;
