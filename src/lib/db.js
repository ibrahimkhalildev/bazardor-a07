import { MongoClient } from "mongodb";

const uri = process.env.BETTER_AUTH_DB_URL;
const options = {};

if (!uri) {
    throw new Error("Please add your BETTER_AUTH_DB_URL to .env");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
export { clientPromise };