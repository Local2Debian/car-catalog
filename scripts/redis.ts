import { createClient } from "redis";

let client: any = null;

export const getConnection = async () => {
  if (!client) {
    client = await createClient({
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
      socket: {
        family: 4, // Force IPv4
        connectTimeout: 10000,
      }
    })
      .on('error', (err) => console.error('Redis error:', err))
      .connect()
  }
  return client;
}