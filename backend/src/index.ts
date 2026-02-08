import express from "express"
import cors from "cors"
import sub_router from "./routes/index.js"
const app = express()
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET!;
import prisma from "./prisma.js"
app.use(cors())

app.post('/webhook/verify', express.raw({ type: 'application/json' }), async (req: express.Request, res: express.Response) => {
    let event: Stripe.Event;
    try {
        const signature = req.headers['stripe-signature'] as string;
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            STRIPE_WEBHOOK_SECRET_KEY
        )
    } catch (error) {
        console.log(`Webhook signature verification failed.`, error);
        return res.sendStatus(400);
    }
    if (event.type == 'checkout.session.completed') {
        const response_object = event.data.object;
        const { user_id, plan_name, duration } = response_object.metadata as Stripe.Metadata;

        try {
            const response = await prisma.$transaction(async (tx) => {
                const user = await tx.user.findUnique({
                    where: {
                        id: user_id as string
                    }
                })
                if (!user) {
                    throw new Error('User not found')
                }
                const payment = await tx.payments.create({
                    data: {
                        description: plan_name as string,
                        amount: response_object.amount_total as number,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        user_id: user_id as string,
                        stripe_id: response_object.id
                    }
                })
                const updated_user = await tx.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        subscription_status: "paid"
                    }
                })
                return { updated_user, payment }
            }, { maxWait: 5000, timeout: 2000 })
            if (!response || !response.updated_user || !response.payment) {
                return res.status(400).json({ received: false });
            }
            return res.status(200).json({ received: true });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                received: false,
                error: error
            })
        }
    }
})
app.use(express.json())

app.use('/api/v1', sub_router)

app.listen(8000, () => {
    console.log('App started at port : 8000')
})