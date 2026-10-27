import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireAuth(callbackPath = "") {
    const headerList = await headers();
    const session = await auth.api.getSession({
        headers: headerList,
    });

    if (!session) {
        const redirectUrl = callbackPath
            ? `/sign-in?callbackUrl=${encodeURIComponent(callbackPath)}`
            : "/sign-in";
        redirect(redirectUrl);
    }

    return session;
}