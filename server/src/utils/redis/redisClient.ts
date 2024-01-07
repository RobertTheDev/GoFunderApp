import { createClient } from "redis";

/* Pulls the Redis URL from .env */
const redisUrl = process.env.REDIS_URL;

/* Create and open the Redis Client */
const redisClient = createClient({ url: redisUrl });

redisClient.on("error", (err) => {
  console.error(`Redis client error: ${err}`);
});

redisClient.on("end", () => {
  console.log("Redis client connection closed");
});

await redisClient.connect();

export default redisClient;
