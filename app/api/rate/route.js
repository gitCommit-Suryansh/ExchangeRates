import { connectDB } from "@/app/lib/db";
import Rate from "@/app/models/ratesModel";

// GET - Fetch all rates
export async function GET() {
  try {
    await connectDB();
    const rates = await Rate.find().sort({ date: -1 });
    return Response.json(rates);
  } catch (error) {
    console.error("Error fetching rates:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch rates" }), { status: 500 });
  }
}

// POST - Add a new rate
export async function POST(req) {
  try {
    await connectDB();
    const { date, usdt, aed } = await req.json();
    console.log(date, usdt, aed);

    if (!date || usdt === undefined || aed === undefined) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const newRate = await Rate.create({ date, usdt, aed });
    return Response.json(newRate);
  } catch (error) {
    console.error("Error creating rate:", error);
    return new Response(JSON.stringify({ error: "Failed to create rate" }), { status: 500 });
  }
}
