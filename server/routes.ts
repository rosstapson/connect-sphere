import type { Express } from "express";
import express from "express";
import fetch from "node-fetch";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Subscription Plans routes
  app.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await storage.getActiveSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({ error: "Failed to fetch subscription plans" });
    }
  });

  app.get("/api/subscription-plans/:id", async (req, res) => {
    try {
      const plan = await storage.getSubscriptionPlan(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: "Subscription plan not found" });
      }
      res.json(plan);
    } catch (error) {
      console.error("Error fetching subscription plan:", error);
      res.status(500).json({ error: "Failed to fetch subscription plan" });
    }
  });

  // User Subscriptions routes
  app.get("/api/users/:userId/subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getUserSubscriptions(req.params.userId);
      res.json(subscriptions);
    } catch (error) {
      console.error("Error fetching user subscriptions:", error);
      res.status(500).json({ error: "Failed to fetch user subscriptions" });
    }
  });

  app.get("/api/users/:userId/subscriptions/active", async (req, res) => {
    try {
      const subscriptions = await storage.getUserActiveSubscriptions(req.params.userId);
      res.json(subscriptions);
    } catch (error) {
      console.error("Error fetching active subscriptions:", error);
      res.status(500).json({ error: "Failed to fetch active subscriptions" });
    }
  });

  app.post("/api/users/:userId/subscriptions", async (req, res) => {
    try {
      const { planId, startDate, endDate, renewalDate, autoRenew = true } = req.body;

      if (!planId) {
        return res.status(400).json({ error: "planId is required" });
      }

      const plan = await storage.getSubscriptionPlan(planId);
      if (!plan) {
        return res.status(404).json({ error: "Subscription plan not found" });
      }

      const subscription = await storage.createUserSubscription({
        userId: req.params.userId,
        planId,
        status: "active",
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : undefined,
        renewalDate: renewalDate ? new Date(renewalDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
        autoRenew,
      });

      res.status(201).json(subscription);
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ error: "Failed to create subscription" });
    }
  });


  return httpServer;
}
