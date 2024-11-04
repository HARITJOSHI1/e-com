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
export const orderStatusEnum = pgEnum("status", [
  "fulfilled",
  "shipped",
  "awaiting_shipment",
]);


// Tables
export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  price: real("price"),
  description: text("description"),
  img_url: text("img_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const shippingAddress = pgTable("shipping_address", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  street: text("street"),
  city: text("city"),
  postalCode: text("postal_code"),
  country: text("country"),
  state: text("state"),
  phoneNumber: text("phone_number"),
});

export const billingAddress = pgTable("billing_address", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  street: text("street"),
  city: text("city"),
  postalCode: text("postal_code"),
  country: text("country"),
  state: text("state"),
  phoneNumber: text("phone_number"),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => users.id),
  amount: real("amount"),
  isPaid: boolean("is_paid").default(false),
  status: orderStatusEnum("status"),
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
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cart = pgTable("cart", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => users.id),
  productId: uuid("product_id").references(() => products.id),
  quantity: real("quantity"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});



// Relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  cart: many(cart),
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
export type TBilling = InferSelectModel<typeof billingAddress>;
export type TOrder = InferSelectModel<typeof orders>;
export type TShipping = InferSelectModel<typeof shippingAddress>;
export type TUser = InferSelectModel<typeof users>;
export type TProduct = InferSelectModel<typeof products>;
