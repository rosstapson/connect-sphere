import { db } from "./db";
import { subscriptionPlans, users, userProfiles, userAddresses, userBankAccounts, userSubscriptions } from "@shared/schema";
import { randomUUID } from "crypto";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Seed subscription plans
    console.log("📦 Creating subscription plans...");
    const plans = await db.insert(subscriptionPlans).values([
      {
        id: randomUUID(),
        name: "Strategic Planning",
        description: "Advanced goal setting and roadmapping tools for strategic business planning.",
        price: "29.00",
        billingCycle: "monthly",
        features: JSON.stringify([
          "Advanced goal setting",
          "Roadmapping tools",
          "Project timeline visualization",
          "Team collaboration",
          "Priority support"
        ]),
        isActive: true,
        maxConnections: 10,
        storageLimit: 10
      },
      {
        id: randomUUID(),
        name: "Real-time Tracking",
        description: "Monitor your projects with live updates and comprehensive analytics.",
        price: "19.00",
        billingCycle: "monthly",
        features: JSON.stringify([
          "Live project updates",
          "Real-time analytics",
          "Custom dashboards",
          "Performance metrics",
          "Email notifications"
        ]),
        isActive: true,
        maxConnections: 5,
        storageLimit: 5
      },
      {
        id: randomUUID(),
        name: "Smart Warehousing",
        description: "Enterprise inventory management and automation for modern businesses.",
        price: "99.00",
        billingCycle: "monthly",
        features: JSON.stringify([
          "Inventory management",
          "Automated workflows",
          "Multi-location support",
          "Advanced reporting",
          "API access",
          "Dedicated account manager"
        ]),
        isActive: true,
        maxConnections: 50,
        storageLimit: 100
      },
      {
        id: randomUUID(),
        name: "Financial Insights",
        description: "Automated bookkeeping and revenue forecasting with AI-powered insights.",
        price: "49.00",
        billingCycle: "monthly",
        features: JSON.stringify([
          "Automated bookkeeping",
          "Revenue forecasting",
          "Expense tracking",
          "Tax preparation tools",
          "Financial reports",
          "Integration with accounting software"
        ]),
        isActive: true,
        maxConnections: 20,
        storageLimit: 25
      },
      {
        id: randomUUID(),
        name: "Enterprise Suite",
        description: "Complete business management platform with all features included.",
        price: "299.00",
        billingCycle: "monthly",
        features: JSON.stringify([
          "All features from all plans",
          "Unlimited connections",
          "Unlimited storage",
          "White-label options",
          "Custom integrations",
          "24/7 priority support",
          "Dedicated success team"
        ]),
        isActive: true,
        maxConnections: null,
        storageLimit: null
      },
      {
        id: randomUUID(),
        name: "Annual Strategic Planning",
        description: "Get 2 months free with annual billing for Strategic Planning.",
        price: "290.00",
        billingCycle: "yearly",
        features: JSON.stringify([
          "All Strategic Planning features",
          "2 months free",
          "Priority onboarding",
          "Quarterly business reviews"
        ]),
        isActive: true,
        maxConnections: 10,
        storageLimit: 10
      }
    ]).returning();

    console.log(`✅ Created ${plans.length} subscription plans`);

    // Create a demo user (only if you want to seed with user data)
    console.log("👤 Creating demo users...");
    const demoUsers = await db.insert(users).values([
      {
        id: randomUUID(),
        keycloakId: "demo-keycloak-id-1",
        email: "demo@example.com"
      },
      {
        id: randomUUID(),
        keycloakId: "demo-keycloak-id-2",
        email: "john.doe@example.com"
      }
    ]).returning();

    console.log(`✅ Created ${demoUsers.length} demo users`);

    // Create user profiles for demo users
    console.log("📝 Creating user profiles...");
    const profiles = await db.insert(userProfiles).values([
      {
        id: randomUUID(),
        userId: demoUsers[0].id,
        firstName: "Demo",
        lastName: "User",
        displayName: "Demo User",
        phoneNumber: "+1234567890",
        bio: "This is a demo user account for testing purposes.",
        occupation: "Software Engineer",
        company: "ConnectSphere",
        isVerified: true
      },
      {
        id: randomUUID(),
        userId: demoUsers[1].id,
        firstName: "John",
        lastName: "Doe",
        displayName: "John Doe",
        phoneNumber: "+1987654321",
        bio: "Passionate about technology and innovation.",
        occupation: "Product Manager",
        company: "Tech Corp",
        isVerified: false
      }
    ]).returning();

    console.log(`✅ Created ${profiles.length} user profiles`);

    // Create addresses for demo users
    console.log("🏠 Creating user addresses...");
    const addresses = await db.insert(userAddresses).values([
      {
        id: randomUUID(),
        userId: demoUsers[0].id,
        type: "billing",
        isDefault: true,
        addressLine1: "123 Main Street",
        addressLine2: "Suite 100",
        city: "San Francisco",
        state: "CA",
        postalCode: "94102",
        country: "United States"
      },
      {
        id: randomUUID(),
        userId: demoUsers[1].id,
        type: "home",
        isDefault: true,
        addressLine1: "456 Oak Avenue",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "United States"
      }
    ]).returning();

    console.log(`✅ Created ${addresses.length} user addresses`);

    // Create bank accounts for demo users
    console.log("💳 Creating user bank accounts...");
    const bankAccounts = await db.insert(userBankAccounts).values([
      {
        id: randomUUID(),
        userId: demoUsers[0].id,
        accountHolderName: "Demo User",
        accountType: "checking",
        bankName: "Chase Bank",
        accountNumberLast4: "1234",
        routingNumber: "123456789",
        isDefault: true,
        isVerified: true
      },
      {
        id: randomUUID(),
        userId: demoUsers[1].id,
        accountHolderName: "John Doe",
        accountType: "savings",
        bankName: "Bank of America",
        accountNumberLast4: "5678",
        routingNumber: "987654321",
        isDefault: true,
        isVerified: false
      }
    ]).returning();

    console.log(`✅ Created ${bankAccounts.length} user bank accounts`);

    // Create some active subscriptions for demo users
    console.log("📋 Creating user subscriptions...");
    const subscriptions = await db.insert(userSubscriptions).values([
      {
        id: randomUUID(),
        userId: demoUsers[0].id,
        planId: plans[0].id, // Strategic Planning
        status: "active",
        startDate: new Date(),
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        autoRenew: true
      },
      {
        id: randomUUID(),
        userId: demoUsers[0].id,
        planId: plans[1].id, // Real-time Tracking
        status: "active",
        startDate: new Date(),
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        autoRenew: true
      },
      {
        id: randomUUID(),
        userId: demoUsers[1].id,
        planId: plans[3].id, // Financial Insights
        status: "active",
        startDate: new Date(),
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        autoRenew: false
      }
    ]).returning();

    console.log(`✅ Created ${subscriptions.length} user subscriptions`);

    console.log("\n🎉 Seeding completed successfully!");
    console.log(`\nSummary:
  - ${plans.length} subscription plans
  - ${demoUsers.length} demo users
  - ${profiles.length} user profiles
  - ${addresses.length} addresses
  - ${bankAccounts.length} bank accounts
  - ${subscriptions.length} active subscriptions`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    process.exit(0);
  }
}

seed();
