import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  getProduct: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.product.findMany({
      include: { CollectionType: { select: { name: true } }, image: true },
    });
  }),

  getSingleProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.id) {
        return await ctx.db.product.findFirst({
          where: {
            id: input.id,
          },
          include: {
            CollectionType: { select: { name: true } },
            image: { include: { file: true } },
          },
        });
      }
    }),

  createProduct: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        price: z.number().min(1),
        collectionTypeId: z?.string()?.min(1).optional(),
        currency: z.string().min(3),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.create({
        data: {
          title: input.title,
          description: input.description,
          price: input.price,
          collectionTypeId: input.collectionTypeId,
          currency: input.currency,
          uploadStatus:"PROCESSING"
        },
      });
    }),

  updateProduct: protectedProcedure
    .input(
      z.object({
        id: z.string().min(3),
        title: z.string().min(3),
        description: z.string().min(10),
        price: z.number().min(1),
        collectionTypeId: z?.string()?.min(1).optional(),
        currency: z.string().min(3),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          price: input.price,
          collectionTypeId: input.collectionTypeId,
          currency: input.currency,
        },
      });
    }),
});
