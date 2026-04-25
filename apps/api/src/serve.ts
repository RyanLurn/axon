import { API_APP_PORT } from "@repo/core/constants/ports";

import { app } from "@/index";

const server = Bun.serve({
  port: API_APP_PORT,
  fetch: app.fetch,
});

console.log(`Server running at ${server.url.href}`);
