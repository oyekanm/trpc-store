import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  authCallback: protectedProcedure.query(async (opt) => {
    const user = opt.ctx.user;

    // check if the user already exist
    const oldUser = await opt.ctx.db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    console.log("first", oldUser)

    if (!oldUser) {
      // create user in db
      console.log("creating...")
      await opt.ctx.db.user.create({
        data: {
          id: user.id,
          email: user.email,
          image:user.image,
          name:user.name,
          
        },
      });
    }

    return {sucess:true}
  }),
});
