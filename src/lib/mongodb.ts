import { MongoClient, MongoClientOptions } from "mongodb";
import { env } from "@/config/env-config";

const uri = env.MONGODB_DATABASE_URL;

if (!uri) {
  throw new Error("MONGODB_DATABASE_URL is not defined in environment variables");
}

const DB_NAME = "equipment-rental-platform-db";

const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 0,
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxIdleTimeMS: 60000,
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoClient(): { client: MongoClient; clientPromise: Promise<MongoClient> } {
  if (globalThis._mongoClient && globalThis._mongoClientPromise) {
    return {
      client: globalThis._mongoClient,
      clientPromise: globalThis._mongoClientPromise,
    };
  }

  const clientInstance = new MongoClient(uri as string, options);
  const promise = clientInstance.connect().catch((error) => {
    // If the initial connection fails, clear cached instances
    // so subsequent calls can attempt a fresh connection
    globalThis._mongoClient = undefined;
    globalThis._mongoClientPromise = undefined;
    throw error;
  });

  globalThis._mongoClient = clientInstance;
  globalThis._mongoClientPromise = promise;

  return { client: clientInstance, clientPromise: promise };
}

const { client, clientPromise } = getMongoClient();
export const db = client.db(DB_NAME);

export { client, clientPromise };
export default clientPromise;
