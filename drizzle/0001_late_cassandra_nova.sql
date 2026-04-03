ALTER TABLE "options" RENAME COLUMN "order" TO "order_index";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_strip_subscription_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "strip_subscription_id";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id");