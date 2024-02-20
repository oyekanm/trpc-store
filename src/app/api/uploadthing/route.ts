import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

import { UTApi } from "uploadthing/server";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

const utapi = new UTApi();

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id: string = url.searchParams.get("id") as string;
  const key: string = url.searchParams.get("key") as string;

  console.log(url);

  await utapi.deleteFiles([key]).then(() => console.log("done"));

  const deleteUser = await db.imageUrl.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/admin-dashboard/products/edit-product")

  return Response.json({ message: "ok", deleteUser });
}
