import {
  pgTable,
  text,
  uuid,
  pgEnum,
  timestamp,
  real,
  boolean,
} from "drizzle-orm/pg-core";
import { relations, type InferSelectModel } from "drizzle-orm";

// Enums
export const orderStatusEnum = pgEnum("status", ["fulfilled", "failed"]);

// Tables
export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description").notNull(),
  img_url: text("img_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const shippingAddress = pgTable("shipping_address", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: text("name").notNull(),
  street: text("street").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  state: text("state").notNull(),
  phoneNumber: text("phone_number").notNull(),
});

export const billingAddress = pgTable("billing_address", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: text("name").notNull(),
  street: text("street").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  state: text("state").notNull(),
  phoneNumber: text("phone_number").notNull(),
});

export const transaction = pgTable("transaction", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  amount: real("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  amount: real("amount").notNull(),
  isPaid: boolean("is_paid").default(false),
  status: orderStatusEnum("status").notNull(),
  shippingAddressId: uuid("shipping_address_id").references(
    () => shippingAddress.id,
    { onDelete: "cascade" }
  ),
  billingAddressId: uuid("billing_address_id").references(
    () => billingAddress.id,
    { onDelete: "cascade" }
  ),

  productId: uuid("product_id").references(() => products.id, {
    onDelete: "cascade",
  }),

  transactionId: uuid("transaction_id").references(() => transaction.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cart = pgTable("cart", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  userId: uuid("user_id").references(() => users.id), 
  productId: uuid("product_id").references(() => products.id),
  quantity: real("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  cart: many(cart),
  transaction: many(transaction),
}));

export const cartRelations = relations(cart, ({ one }) => ({
  user: one(users, {
    fields: [cart.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [cart.productId],
    references: [products.id],
  }),
}));

export const productsRelations = relations(products, ({ many, one }) => ({
  orders: many(orders),
  cart: one(cart),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
  orders: one(orders),
  users: one(users, {
    fields: [transaction.userId],
    references: [users.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  billingAddress: one(billingAddress, {
    fields: [orders.billingAddressId],
    references: [billingAddress.id],
  }),
  shippingAddress: one(shippingAddress, {
    fields: [orders.shippingAddressId],
    references: [shippingAddress.id],
  }),
}));

export const shippingAddressRelations = relations(
  shippingAddress,
  ({ many }) => ({
    orders: many(orders),
  })
);

export const BillingAddressRelations = relations(
  billingAddress,
  ({ many }) => ({
    orders: many(orders),
  })
);

// Types
export type TBilling = typeof billingAddress.$inferInsert;
export type TOrder = typeof orders.$inferInsert;
export type TShipping = typeof shippingAddress.$inferInsert;
export type TUser = typeof users.$inferInsert;
export type TProduct = InferSelectModel<typeof products>;
export type TCart = typeof cart.$inferInsert;
