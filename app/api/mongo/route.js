import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request){


    const uri = "mongodb+srv://jaishikhasharma05:WACQoTN08fuZw6LS@cluster0.ztw46yb.mongodb.net/Jaishikha?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);
  try {
    const database = client.db("Jaishikha");
    const movies = database.collection("inventory");
    const query = {};
    const movie = await movies.findOne(query);
    console.log(movies);
    return NextResponse.json({"a":34 , movie})
  } finally {
    await client.close();
  }
}

