import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const imageRouter = createTRPCRouter({
  createImage: protectedProcedure
    .input(
      z.object({
        color: z.string().min(2),
        productId: z?.string()?.min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.image.create({
        data: {
          color: input.color,
          productId: input.productId,
        },
      });
    }),
});
