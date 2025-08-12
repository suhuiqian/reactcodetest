import { usersHandlers } from "./users";
import { applicationsHandlers } from "./applications";
import { claimsHandlers } from "./claims";
import { authHandlers } from "./auth";
import { mailHandlers } from "./mail";

/* console.log("📋 Loading MSW handlers...");
console.log("🔐 Auth handlers:", authHandlers.length);
console.log("👥 Users handlers:", usersHandlers.length);
console.log("📄 Applications handlers:", applicationsHandlers.length);
console.log("🏥 Claims handlers:", claimsHandlers.length); */

export const handlers = [
  ...usersHandlers,
  ...applicationsHandlers,
  ...claimsHandlers,
  ...authHandlers,
  ...mailHandlers,
];

/* console.log("✅ Total MSW handlers loaded:", handlers.length); */
