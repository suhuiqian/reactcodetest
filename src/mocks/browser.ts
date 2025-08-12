import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

console.log("📦 MSW Browser: Loading handlers...");
console.log("📊 MSW Browser: Handlers count:", handlers.length);
console.log(
  "📋 MSW Browser: Handler types:",
  handlers.map((h) => `${h.info.method} ${h.info.path}`)
);

export const worker = setupWorker(...handlers);

console.log("✅ MSW Worker created with", handlers.length, "handlers");
