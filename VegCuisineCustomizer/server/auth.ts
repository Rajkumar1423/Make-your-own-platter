
import { type Request, Response } from "express";
import { z } from "zod";
import { storage } from "./storage";

// Define the schema for user data from Replit Auth
const authUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  roles: z.string().optional(),
});

// Get user data from Replit Auth headers
export function getUserFromRequest(req: Request) {
  try {
    const userId = req.headers["x-replit-user-id"];
    const userName = req.headers["x-replit-user-name"];
    const userRoles = req.headers["x-replit-user-roles"] || "";

    if (!userId || !userName) {
      return null;
    }

    return authUserSchema.parse({
      id: userId,
      name: userName,
      roles: userRoles,
    });
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

// Authentication routes
export async function registerAuthRoutes(app: any) {
  // Get current user
  app.get("/api/auth/user", async (req: Request, res: Response) => {
    const user = getUserFromRequest(req);
    
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Check if user exists in database, if not create them
    const dbUser = await storage.getUserByReplitId(user.id);
    
    if (!dbUser) {
      // Create new user
      const newUser = await storage.createUser({
        replitId: user.id,
        username: user.name,
        displayName: user.name,
        preferences: {},
      });
      return res.json(newUser);
    }
    
    return res.json(dbUser);
  });

  // Update user preferences
  app.put("/api/auth/preferences", async (req: Request, res: Response) => {
    const user = getUserFromRequest(req);
    
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { preferences } = req.body;
    
    const updatedUser = await storage.updateUserPreferences(user.id, preferences);
    return res.json(updatedUser);
  });
}
import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { InsertUser, User } from "@shared/schema";
import { storage } from "./storage";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Use environment variable in production

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export function generateToken(user: User): string {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export async function registerUser(userData: InsertUser): Promise<User> {
  const hashedPassword = await hashPassword(userData.password);
  return storage.createUser({
    ...userData,
    password: hashedPassword
  });
}

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  const user = await storage.getUserByUsername(username);
  
  if (!user) {
    return null;
  }
  
  const isPasswordValid = await comparePasswords(password, user.password);
  
  if (!isPasswordValid) {
    return null;
  }
  
  return user;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string; role: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
  
  next();
}
