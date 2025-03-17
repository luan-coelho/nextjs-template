CREATE TABLE "menu_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" varchar(100) NOT NULL,
	"icon" varchar(100) NOT NULL,
	"route" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);

CREATE TABLE "modules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(255) NOT NULL,
	"menu_items_order" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);

CREATE TABLE "modules_menu_items" (
	"module_id" uuid NOT NULL,
	"menu_item_id" uuid NOT NULL,
	"order" integer NOT NULL,
	CONSTRAINT "pk_modules_menu_items" PRIMARY KEY("module_id", "menu_item_id")
);

ALTER TABLE
	"modules_menu_items"
ADD
	CONSTRAINT "fk_modules_menu_items_module_id" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE
	"modules_menu_items"
ADD
	CONSTRAINT "fk_modules_menu_items_menu_item_id" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;