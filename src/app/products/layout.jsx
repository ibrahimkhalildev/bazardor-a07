import { requireAuth } from "@/auth-proxy";

export default async function ProductsLayout({ children }) {
    await requireAuth();

    return <>{children}</>;
}