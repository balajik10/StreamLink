
// import { db } from "@/lib/db";
// import { getSelf } from "@/lib/auth-service";




// import { createUploadthing, type FileRouter } from "uploadthing/next";

// const f = createUploadthing();


// export const ourFileRouter = {
//   thumbnailUploader: f({
//     image: {
//       maxFileSize: "4MB",
//       maxFileCount: 1,
//     },
//   })
//     .middleware(async () => {
//       const self = await getSelf();
//       return { user: self };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       await db.stream.update({
//         where: {
//           userId: metadata.user.id,
//         },
//         data: {
//           thumbnailUrl: file.url,
//         },
//       });

//       return { fileUrl: file.url };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;


import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Create an instance of the uploadthing API
const f = createUploadthing();

// Define the file router for image and thumbnail uploads
export const ourFileRouter = {
  // Thumbnail uploader route
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const self = await getSelf();
      if (!self) throw new UploadThingError("Unauthorized");
      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.stream.update({
        where: {
          userId: metadata.user.id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    }),

  // Image uploader route
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

// Define the type for your file router
export type OurFileRouter = typeof ourFileRouter;

// Mock authentication function (for imageUploader route)
const auth = (req: Request) => ({ id: "fakeId" });

