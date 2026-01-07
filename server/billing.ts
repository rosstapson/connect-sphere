import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const PAYMENTS_BASE_URL = process.env.PAYMENTS_BASE_URL ?? "http://localhost:5055";


router.post("/start-checkout", async (req, res) => {
    try {
        const { planId } = req.body || "pro-monthly"

        // 🔹 Toy hardcoded context
        const tenantId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
        const initiatedByUserId = "9b2f4a51-7c4b-4f1b-8d9a-1c2b3d4e5f60";

        const userId = initiatedByUserId;

        // 🔹 Toy plan lookup (replace with DB later)
        const plan = {
            id: "pro-monthly",
            billingCycle: "monthly",
            amount: 199.0,
            currency: "ZAR",
        };

        // if (planId !== plan.id) {
        //   return res.status(400).json({ error: "Unknown plan" });
        // }

        console.log("Starting checkout with payload:", {
            tenantId,
            initiatedByUserId: userId,
            planId: plan.id,
            billingCycle: plan.billingCycle,
            amount: plan.amount,
            currency: plan.currency,
            returnUrl: `${process.env.PUBLIC_APP_URL}/payment/success`,
            cancelUrl: `${process.env.PUBLIC_APP_URL}/payment/cancel`,
            sourceApp: "toy-app",
        });


        // 🔹 Call Payments service
        const resp = await fetch(
            `${PAYMENTS_BASE_URL}/api/v1/subscription-checkouts`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tenantId,
                    initiatedByUserId: userId,
                    planId: plan.id,
                    billingCycle: plan.billingCycle,
                    amount: plan.amount,
                    currency: plan.currency,
                    returnUrl: `${process.env.PUBLIC_APP_URL}/payment/success`,
                    cancelUrl: `${process.env.PUBLIC_APP_URL}/payment/cancel`,
                    sourceApp: "toy-app",
                }),
            }
        );

        if (!resp.ok) {
            const text = await resp.text();
            throw new Error(`Payments error: ${text}`);
        }

        const { checkoutId, redirectUrl } = await resp.json();

        // 🔹 Return to frontend
        res.json({ checkoutId, redirectUrl });
    } catch (err: any) {
        console.error("Failed to start checkout", err);
        res.status(500).json({ error: "Failed to start checkout" });
    }
});

export default router;
