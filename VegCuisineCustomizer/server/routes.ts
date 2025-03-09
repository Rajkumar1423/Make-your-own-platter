import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBookingSchema, 
  insertContactSchema,
  Dish,
  insertUserSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { registerAuthRoutes, authMiddleware, adminMiddleware, registerUser, authenticateUser, generateToken } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix
  const apiRouter = "/api";

  // Auth routes
  app.post(`${apiRouter}/auth/register`, async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);

      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const user = await registerUser(userData);
      const token = generateToken(user);

      res.status(201).json({ user: { ...user, password: undefined }, token });
    } catch (error) {
      console.error("Error registering user:", error);

      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }

      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post(`${apiRouter}/auth/login`, async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await authenticateUser(username, password);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user);

      res.json({ user: { ...user, password: undefined }, token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Failed to log in" });
    }
  });

  // Admin routes
  app.get(`${apiRouter}/admin/users`, authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
      const users = await storage.getUsers();
      res.json(users.map(user => ({ ...user, password: undefined })));
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get(`${apiRouter}/admin/bookings`, authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.get(`${apiRouter}/admin/contacts`, authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.put(`${apiRouter}/admin/bookings/:id/status`, authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (!status || !['pending', 'confirmed', 'canceled'].includes(status)) {
        return res.status(400).json({ message: "Valid status is required" });
      }

      const booking = await storage.updateBookingStatus(id, status);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });

  // Register authentication routes
  await registerAuthRoutes(app);
  // Cuisines routes
  app.get(`${apiRouter}/cuisines`, async (req: Request, res: Response) => {
    try {
      const cuisines = await storage.getCuisines();
      res.json(cuisines);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      res.status(500).json({ message: "Failed to fetch cuisines" });
    }
  });

  app.get(`${apiRouter}/cuisines/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const cuisine = await storage.getCuisineById(id);

      if (!cuisine) {
        return res.status(404).json({ message: "Cuisine not found" });
      }

      res.json(cuisine);
    } catch (error) {
      console.error("Error fetching cuisine:", error);
      res.status(500).json({ message: "Failed to fetch cuisine" });
    }
  });

  // Dishes routes
  app.get(`${apiRouter}/dishes`, async (req: Request, res: Response) => {
    try {
      const cuisineId = req.query.cuisineId 
        ? parseInt(req.query.cuisineId as string) 
        : undefined;

      let dishes: Dish[];
      if (cuisineId) {
        dishes = await storage.getDishesByCuisineId(cuisineId);
      } else {
        dishes = await storage.getDishes();
      }

      res.json(dishes);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      res.status(500).json({ message: "Failed to fetch dishes" });
    }
  });

  app.get(`${apiRouter}/dishes/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const dish = await storage.getDishById(id);

      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }

      res.json(dish);
    } catch (error) {
      console.error("Error fetching dish:", error);
      res.status(500).json({ message: "Failed to fetch dish" });
    }
  });

  // Booking routes
  app.post(`${apiRouter}/bookings`, async (req: Request, res: Response) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);

      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }

      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Contact routes
  app.post(`${apiRouter}/contacts`, async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);

      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }

      res.status(500).json({ message: "Failed to create contact message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}