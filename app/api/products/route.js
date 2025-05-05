import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri =
    "mongodb+srv://jaishikhasharma05:WACQoTN08fuZw6LS@cluster0.ztw46yb.mongodb.net/Jaishikha?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const query = {};
    const products = await inventory.find(query).toArray();
    console.log(inventory);
    return NextResponse.json({ success:true , products });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
    let  body = await request.json()
    console.log(body)
    const uri =
      "mongodb+srv://jaishikhasharma05:WACQoTN08fuZw6LS@cluster0.ztw46yb.mongodb.net/Jaishikha?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);
    try {
      const database = client.db("stock");
      const inventory = database.collection("inventory");
      const product = await inventory.insertOne(body);
      return NextResponse.json({ product , ok: true});
    } finally {
      await client.close();
    }
  }