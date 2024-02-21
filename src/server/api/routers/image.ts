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

  createImageUrl: protectedProcedure
    .input(
      z.array(
        z.object({
          key: z.string().min(2),
          url: z?.string()?.min(1),
          imageId: z?.string()?.min(1).optional(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.imageUrl.createMany({
        data: input.map((inp) => ({
          key: inp.key,
          url: inp.url,
          imageId: inp.imageId,
        })),
      });
    }),

    updateImage: protectedProcedure
    .input(
      z.object({
        color: z.string().min(2),
        id: z?.string()?.min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.image.update({
        where:{
          id:input.id
        },
        data: {
          color: input.color,
        },
      });
    }),

    deleteImage: protectedProcedure
    .input(
      z.object({
        id: z?.string()?.min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.image.delete({
        where:{
          id:input.id
        },
      });
      })
});
