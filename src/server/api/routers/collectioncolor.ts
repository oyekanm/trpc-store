import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const ccRouter = createTRPCRouter({
  // collection queries
  getCollections: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.collection.findMany();
  }),

  createCollection: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.collection.create({
        data: {
          name: input.name,
        },
      });
    }),

  getCollectionType: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.collectionType.findMany();
  }),

  createCollectionType: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), collectionId: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      const check = await ctx.db.collection.findFirst({
        where: {
          id: input.collectionId,
        },
      });

      if (!check)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "the collection is not found",
        });
        return await ctx.db.collectionType.create({
          data: {
            name: input.name,
            collectionId: input.collectionId,
          },
        });
    }),

  // Color queries

  getColors: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.color.findMany();
  }),

  createColor: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.color.create({
        data: {
          name: input.name,
        },
      });
    }),
});
