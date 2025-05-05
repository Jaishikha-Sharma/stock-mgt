import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = "mongodb+srv://jaishikhasharma05:WACQoTN08fuZw6LS@cluster0.ztw46yb.mongodb.net/Jaishikha?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);

  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const products = await inventory.find({}).toArray();

    const totalProducts = products.length;

    // Ensure price is parsed as a number to avoid string concatenation
    const totalPrice = products.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);

    return NextResponse.json({ success: true, totalProducts, totalPrice });
  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  } finally {
    await client.close();
  }
}
