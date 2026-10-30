import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireAuth(callbackPath = "") {
  const headerList = await headers();
  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) {
    const params = new URLSearchParams();
    if (callbackPath) {
      params.set("callbackURL", callbackPath);
    }
    params.set("error", "auth_required");

    redirect(`/sign-in?${params.toString()}`);
  }

  return session;
}