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
      const unique = await ctx.db.collection.findFirst({
        where: {
          name: input.name,
        },
      });

      if (unique) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This collection already exist",
        });
      } else {
        return await ctx.db.collection.create({
          data: {
            name: input.name,
          },
        });
      }
    }),

  updateCollection: protectedProcedure
    .input(z.object({ name: z.string().min(1), id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.collection.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,

        },
      });
    }),

  deleteCollection: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.collection.delete({
        where: {
          id: input.id,
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

      const unique = await ctx.db.collectionType.findFirst({
        where: {
          name: input.name,
        },
      });

      if (!check) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "the collection is not found",
        });
      } else {
        if (unique) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "This collection type already exist",
          });
        } else {
          return await ctx.db.collectionType.create({
            data: {
              name: input.name,
              collectionId: input.collectionId,
            },
          });
        }
      }
    }),
  updateCollectionType: protectedProcedure
    .input(z.object({ name: z.string().min(1), id: z.string().min(1),collectionId: z.string().min(1).optional() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.collectionType.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          collectionId:input.collectionId
        },
      });
    }),
  deleteCollectionType: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.collectionType.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
