import {
    pgTable,
    text,
    timestamp,
    boolean,
    integer,
    pgEnum,
} from "drizzle-orm/pg-core";

// ---Enums ----------------
export const planEnum = pgEnum("plan", ["free", "pro"]);

// ---User ----------------
export const users = pgTable("users", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    plan: planEnum("plan").default("free").notNull(),
    stripeCustomerId: text("stripe_customer_id").unique(),
    stripeSubscriptionId: text("stripe_subscription_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---- Polls --------------------------
export const polls = pgTable("polls", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    question: text("question").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---Options --------------------
export const options = pgTable("options", {
    id: text("id").primaryKey(),
    pollId: text("poll_id")
        .notNull()
        .references(() => polls.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    order: integer("order_index").default(0).notNull(),
});

// -----Votes ----------------------------
export const votes = pgTable("votes", {
    id: text("id").primaryKey(),
    pollId: text("poll_id")
        .notNull()
        .references(() => polls.id, { onDelete: "cascade" }),
    optionId: text("option_id")
        .notNull()
        .references(() => options.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ----Types ---------------------------
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Poll = typeof polls.$inferSelect;
export type NewPoll = typeof polls.$inferInsert;
export type Option = typeof options.$inferSelect;
export type NewOption = typeof options.$inferInsert;
export type Vote = typeof votes.$inferSelect;
export type NewVote = typeof votes.$inferInsert;