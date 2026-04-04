import { db } from "@/db";
import { polls } from "@/db/schema";
import { nanoid } from "nanoid";

export async function GET() {
    return Response.json({ message: "API working" });
}

export async function POST(req: Request) {
    const body = await req.json();

    const newPoll = await db.insert(polls).values({
        id: nanoid(),
        userId: "test-user",
        question: body.question,
    });

    return Response.json(newPoll);
}