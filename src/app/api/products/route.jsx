import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const products = await db.collection("products").find({}).toArray();

        return NextResponse.json(products);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json(
            { error: "পণ্য লোড করতে ব্যর্থ হয়েছে" },
            { status: 500 }
        );
    }
}