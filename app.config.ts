import { defineConfig } from "@solidjs/start/config";
import process from "node:process";

export default defineConfig({
  server: {
    baseURL: process.env.BASE_PATH,
    static: true,
    prerender: {
      routes: ["/", "/app/yunicode", "/app/undercover"],
      crawlLinks: true,
      failOnError: true,
    },
  },
});
