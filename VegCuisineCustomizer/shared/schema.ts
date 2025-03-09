import { pgTable, text, serial, integer, boolean, decimal, timestamp, unique, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema with role
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  replitId: text("replit_id").notNull().unique(),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  name: text("name"),
  email: text("email"),
  role: text("role").default("user").notNull(),
  preferences: jsonb("preferences").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
});

// User Preferences schema
export const userPreferencesSchema = z.object({
  theme: z.enum(["light", "dark"]).optional().default("light"),
  dietaryRestrictions: z.array(z.string()).optional().default([]),
  favoriteDisheIds: z.array(z.number()).optional().default([]),
  emailNotifications: z.boolean().optional().default(true),
});

export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Cuisine types
export const cuisines = pgTable("cuisines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertCuisineSchema = createInsertSchema(cuisines).omit({
  id: true,
});

export type InsertCuisine = z.infer<typeof insertCuisineSchema>;
export type Cuisine = typeof cuisines.$inferSelect;

// Dishes
export const dishes = pgTable("dishes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  cuisineId: integer("cuisine_id").notNull(),
  isVegan: boolean("is_vegan").default(false),
  isGlutenFree: boolean("is_gluten_free").default(false),
  isPopular: boolean("is_popular").default(false),
});

export const insertDishSchema = createInsertSchema(dishes).omit({
  id: true,
});

export type InsertDish = z.infer<typeof insertDishSchema>;
export type Dish = typeof dishes.$inferSelect;

// Booking requests
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date").notNull(),
  guestCount: integer("guest_count").notNull(),
  message: text("message"),
  dishes: text("dishes").notNull(), // JSON string of selected dishes
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("pending"), // pending, confirmed, canceled
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Contact messages
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isRead: boolean("is_read").default(false),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  isRead: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;