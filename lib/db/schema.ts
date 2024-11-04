import {
  pgTable,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";



// chnage it according to your need
export const dummy = pgTable("dummy", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
});