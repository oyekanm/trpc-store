import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "@/server/api/routers/auth";
import { productRouter } from "@/server/api/routers/product";
import { ccRouter } from "@/server/api/routers/collectioncolor";
import { imageRouter } from "./routers/image";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cc: ccRouter,
  auth: authRouter,
  product: productRouter,
  image: imageRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
