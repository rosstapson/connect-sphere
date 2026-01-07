import { 
  type User, 
  type InsertUser, 
  type SubscriptionPlan, 
  type UserSubscription,
  type InsertUserSubscription 
} from "@shared/schema";
import { db } from "./db";
import { users, subscriptionPlans, userSubscriptions } from "@shared/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subscription plans
  getAllSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  getActiveSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  getSubscriptionPlan(id: string): Promise<SubscriptionPlan | undefined>;
  
  // User subscriptions
  getUserSubscriptions(userId: string): Promise<(UserSubscription & { plan: SubscriptionPlan })[]>;
  createUserSubscription(subscription: InsertUserSubscription): Promise<UserSubscription>;
  getUserActiveSubscriptions(userId: string): Promise<(UserSubscription & { plan: SubscriptionPlan })[]>;
}

export class MemStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Subscription plans
  async getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return await db.select().from(subscriptionPlans);
  }

  async getActiveSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.isActive, true));
  }

  async getSubscriptionPlan(id: string): Promise<SubscriptionPlan | undefined> {
    const result = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, id)).limit(1);
    return result[0];
  }

  // User subscriptions
  async getUserSubscriptions(userId: string): Promise<(UserSubscription & { plan: SubscriptionPlan })[]> {
    const result = await db
      .select({
        subscription: userSubscriptions,
        plan: subscriptionPlans
      })
      .from(userSubscriptions)
      .leftJoin(subscriptionPlans, eq(userSubscriptions.planId, subscriptionPlans.id))
      .where(eq(userSubscriptions.userId, userId));
    
    return result.map(r => ({ ...r.subscription, plan: r.plan! }));
  }

  async getUserActiveSubscriptions(userId: string): Promise<(UserSubscription & { plan: SubscriptionPlan })[]> {
    const result = await db
      .select({
        subscription: userSubscriptions,
        plan: subscriptionPlans
      })
      .from(userSubscriptions)
      .leftJoin(subscriptionPlans, eq(userSubscriptions.planId, subscriptionPlans.id))
      .where(eq(userSubscriptions.userId, userId));
    
    const activeSubscriptions = result.filter(r => r.subscription.status === 'active');
    return activeSubscriptions.map(r => ({ ...r.subscription, plan: r.plan! }));
  }

  async createUserSubscription(subscription: InsertUserSubscription): Promise<UserSubscription> {
    const result = await db.insert(userSubscriptions).values(subscription).returning();
    return result[0];
  }
}

export const storage = new MemStorage();
