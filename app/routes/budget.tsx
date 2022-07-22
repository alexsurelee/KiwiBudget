import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { getAuth } from "@clerk/remix/ssr.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { userId } = await getAuth(request);
  if (!userId) {
    return redirect("/sign-in?redirect_url=" + request.url);
  }
  return json({ ok: true });
};

export default function Budget() {
  return (
    <div>
      <h1>This is yo budget</h1>
    </div>
  );
}
