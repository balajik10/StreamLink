// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// // Define public routes that don't require authentication
// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/sign-in(.*)", 
//   "/sign-up(.*)", 
//   "/api/webhooks(.*)", 
//   "/api/uploadthing",  // Make sure uploadthing route is public
// ]);

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect();  // Protect the routes that are not public
//   }
// });

// export const config = {
//   matcher: [
//     // Match any route except those with specified extensions and Next.js internals
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
//     // Always run middleware for API routes
//     '/(api|trpc)(.*)',
//   ],
// };
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/:username",
  "/api/uploadthing",
  "/search"  // Ensure this is a public route
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
