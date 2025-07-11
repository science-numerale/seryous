import { defineConfig } from "@solidjs/start/config";
import process from "node:process";

export default defineConfig({
  server: {
    baseURL: process.env.BASE_PATH,
    static: true,
    prerender: {
      routes: [
        "/",
        "/404",
        "/not_found",
        "/app/yunicode",
        "/app/undercover",
      ],
      crawlLinks: true,
      failOnError: true,
      // autoSubfolderIndex: false,
    },
  },
});
