# Database Setup

## Schema Overview

The database includes the following tables:

### Core Tables
- **users** - Stores Keycloak user references and email
- **userProfiles** - Extended user profile information
- **userAddresses** - Multiple addresses per user (billing, shipping, etc.)
- **userBankAccounts** - Secure bank account storage
- **subscriptionPlans** - Available subscription plans
- **userSubscriptions** - User subscription records

## Running Migrations

Generate migrations after schema changes:
```bash
npx drizzle-kit generate
```

Push schema changes to the database:
```bash
npm run db:push
```

## Seeding the Database

The seed script populates the database with sample data including:
- 6 subscription plans (various pricing tiers)
- 2 demo users
- User profiles, addresses, and bank accounts
- 3 active subscriptions

To seed the database:
```bash
npm run db:seed
```

## API Endpoints

### Subscription Plans
- `GET /api/subscription-plans` - Get all active subscription plans
- `GET /api/subscription-plans/:id` - Get specific plan details

### User Subscriptions
- `GET /api/users/:userId/subscriptions` - Get all user subscriptions
- `GET /api/users/:userId/subscriptions/active` - Get active subscriptions
- `POST /api/users/:userId/subscriptions` - Create new subscription

Example POST body:
```json
{
  "planId": "plan-uuid",
  "autoRenew": true
}
```

## Notes

- Bank account numbers are stored as last 4 digits only for security
- Subscription features are stored as JSON strings
- All tables include `createdAt` and `updatedAt` timestamps
- Foreign keys include cascade delete for data integrity
