import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";

const sql = neon("postgresql://neondb_owner:npg_dUK9fC2YrFPX@ep-hidden-glitter-a8vlca7g-pooler.eastus2.azure.neon.tech/fincodb?sslmode=require");
export const db = drizzle({ client: sql },{schema});