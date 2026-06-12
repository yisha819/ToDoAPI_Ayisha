// src/app.ts
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import router from "./routes";
import { isDev } from "./config";
import setup from "./setup";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import events from "./events";

// Prisma 7 Adapter Imports
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());

// Set up rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

if (!isDev) app.use(limiter);

// Set up security headers
app.use(helmet());
app.disable("x-powered-by");

// Use router for routing
app.use("/api", router);

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

events(io);

// 1. Establish the connection pool for PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// 2. Wrap the pool in the Prisma Adapter
const adapter = new PrismaPg(pool);

// 3. Initialize and EXPORT Prisma Client
export const prisma = new PrismaClient({ adapter });

// Connect to PostgreSQL via Prisma
prisma.$connect()
  .then(() => {
    console.log("Successfully connected to PostgreSQL via Prisma 7 Adapter.");
    // Run setup
    setup();
  })
  .catch((err: any) => { // Added ': any' to explicitly declare the type
    console.error("Failed to connect to the database:", err);
    process.exit(1); 
  });

export default server;