import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  const uri = "mongodb+srv://jaishikhasharma05:WACQoTN08fuZw6LS@cluster0.ztw46yb.mongodb.net/Jaishikha?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);

  try {
    await client.connect(); // ensure connection
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const products = await inventory.aggregate([
      {
        $match: {
          $or: [
            { slug: { $regex: query, $options: "i" } },
          ],
        },
      },
    ]).toArray();

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
