import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

if (import.meta.env.MODE !== "production") {
  console.log(`🔧 Starting MSW in ${import.meta.env.MODE} mode...`);
  try {
    const { worker } = await import("./mocks/browser");
    console.log("📦 MSW worker imported successfully");

    await worker.start({
      onUnhandledRequest: "warn",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });

    console.log("🚀 MSW worker started successfully!");
    console.log("🎯 MSW is now intercepting requests");
  } catch (error) {
    console.error("❌ Failed to start MSW:", error);
  }
} else {
  console.log(`debug: .env.MODE: ${import.meta.env.MODE}`);
  console.log("🏭 Production mode - MSW disabled");
}

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        {/* // TODO:  WHERE TO PLACE THEME PROVIDER ?*/}
        <App />
      </Theme>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
