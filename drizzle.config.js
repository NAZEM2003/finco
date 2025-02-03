import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url:"postgresql://neondb_owner:npg_dUK9fC2YrFPX@ep-hidden-glitter-a8vlca7g-pooler.eastus2.azure.neon.tech/fincodb?sslmode=require"
  }
});