import { relations, sql } from 'drizzle-orm'
import { boolean, integer, jsonb, pgTable, primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { MenuItemsOrder } from '@/types/model-types'

export const modules = pgTable('modules', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 100 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
    menuItemsOrder: jsonb('menu_items_order').$type<MenuItemsOrder[]>(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    active: boolean('active').notNull().default(true),
})

export const menuItems = pgTable('menu_items', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    label: varchar('label', { length: 100 }).notNull(),
    icon: varchar('icon', { length: 100 }).notNull(),
    route: varchar('route', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    active: boolean('active').notNull().default(true),
})

export const modulesToMenuItems = pgTable(
    'modules_menu_items',
    {
        moduleId: uuid('module_id')
            .notNull()
            .references(() => modules.id),
        menuItemId: uuid('menu_item_id')
            .notNull()
            .references(() => menuItems.id),
        order: integer('order').notNull(),
    },
    t => [primaryKey({ columns: [t.moduleId, t.menuItemId] })],
)

export const modulesRelations = relations(modules, ({ many }) => ({
    menuItems: many(modulesToMenuItems),
}))

export const menuItemsRelations = relations(menuItems, ({ many }) => ({
    modules: many(modulesToMenuItems),
}))

export const modulesToMenuItemsRelations = relations(modulesToMenuItems, ({ one }) => ({
    module: one(modules, {
        fields: [modulesToMenuItems.moduleId],
        references: [modules.id],
    }),
    menuItem: one(menuItems, {
        fields: [modulesToMenuItems.menuItemId],
        references: [menuItems.id],
    }),
}))
