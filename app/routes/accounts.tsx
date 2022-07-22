import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { getAuth } from "@clerk/remix/ssr.server";
import type { Account } from "akahu";
import { Link, useLoaderData } from "@remix-run/react";
import { AccountPanel } from "~/components/accounts/AccountPanel";
import { getAccounts } from "~/helpers/akahu";

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <div>
      <h2>There was a problemo 😭</h2>
      <div>{error.message}</div>
    </div>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  // Authenticated users only
  const { userId } = await getAuth(request);
  if (!userId) {
    return redirect("/sign-in?redirect_url=" + request.url);
  }

  // Get accounts via akahu
  const accounts = await getAccounts();
  return json(accounts);
};

export default function Accounts() {
  const accounts = useLoaderData();
  return (
    <>
      <h1>Accounts</h1>
      <div className="account-list">
        {accounts.map((account: Account) => {
          const { _id, name, balance } = account;
          return (
            <Link key={_id} to={_id}>
              <AccountPanel name={name} balance={balance?.current || 0} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
