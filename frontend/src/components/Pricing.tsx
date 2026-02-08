import React, { useState } from "react";
import { Check } from "lucide-react";
import Navbar from "./Navbar";
// import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from "react-toastify";
type Plan = {
    name: string;
    monthly: number;
    yearly: number;
    description: string;
    features: string[];
    popular: boolean;
}
const plans: Plan[] = [
    {
        name: "Starter",
        monthly: 19,
        yearly: 190,
        description: "For individuals getting started",
        features: ["Basic analytics", "Email support", "1 workspace"],
        popular: false
    },
    {
        name: "Pro",
        monthly: 49,
        yearly: 490,
        description: "Best for growing teams",
        features: [
            "Advanced analytics",
            "Priority support",
            "Unlimited workspaces",
            "Team collaboration",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        monthly: 99,
        yearly: 990,
        description: "For large scale operations",
        features: [
            "Custom analytics",
            "Dedicated manager",
            "Unlimited users",
            "SSO & security",
        ],
        popular: false
    },
];

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`
const Pricing: React.FC = () => {
    const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
    const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0])
    const handleCheckOut = async () => {
        const token = localStorage.getItem('token') as string
        console.log(selectedPlan)
        try {
            const response = await fetch(`${BACKEND_URL}/user/upgradeSubscription`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    plan_name: selectedPlan.name,
                    duration: billing == "monthly" ? '1 Month' : '1 year',
                    price: billing == "monthly" ? selectedPlan.monthly : selectedPlan.yearly,
                    valid_till: billing == "monthly" ? '1 Month' : '1 year',
                    description: selectedPlan.description,
                })
            })
            const data = await response.json()
            if (!data || !data.valid) {
                toast.error(data.message)
            } else {
                window.location.href = data.stripe_checkout_url
            }
        } catch (error) {
            console.log(error)
            toast.error('Somethig went wrong')
        }
    }

    return (
        <>
            <div className="mb-20">
                <Navbar display={true} />
            </div>
            <section className="min-h-screen py-20 px-6">
                <ToastContainer />
                {/* Header */}
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Simple, transparent pricing
                    </h1>
                    <p className="mt-4 text-blue-600">
                        Choose a plan that fits your needs. Cancel anytime.
                    </p>

                    {/* Toggle */}
                    <div className="flex justify-center mt-10">
                        <div className="flex items-center gap-4 bg-blue-500 rounded-full px-3 py-2">
                            <span
                                className={`text-sm ${billing === "monthly" ? "text-white" : "text-blue-200"
                                    }`}
                            >
                                Monthly
                            </span>

                            <button
                                onClick={() =>
                                    setBilling(billing === "monthly" ? "yearly" : "monthly")
                                }
                                className="relative w-12 h-6 bg-white rounded-full transition"
                            >
                                <span
                                    className={`absolute top-1 left-1 w-4 h-4 bg-blue-600 rounded-full transition-transform ${billing === "yearly" ? "translate-x-6" : ""
                                        }`}
                                />
                            </button>

                            <span
                                className={`text-sm ${billing === "yearly" ? "text-white" : "text-blue-200"
                                    }`}
                            >
                                Yearly
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-16">
                    {plans.map((plan, idx) => {
                        const price =
                            billing === "monthly" ? plan.monthly : plan.yearly;

                        return (
                            <div
                                key={plan.name}
                                className={`relative bg-white text-gray-900 rounded-2xl p-8 shadow-xl transition hover:scale-[1.02]
                ${plan.popular
                                        ? "ring-4 ring-blue-500"
                                        : "ring-1 ring-gray-200"
                                    }`}
                            >
                                {plan.popular && (
                                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                )}

                                <h3 className="text-xl font-semibold">{plan.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {plan.description}
                                </p>

                                <div className="mt-6">
                                    <span className="text-4xl font-bold">₹{price}</span>
                                    <span className="text-gray-500">
                                        /{billing === "monthly" ? "mo" : "yr"}
                                    </span>
                                </div>

                                <ul className="mt-6 space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => {
                                        setSelectedPlan(plans[idx])
                                        handleCheckOut()
                                    }}
                                    className={`mt-8 w-full py-3 rounded-xl font-medium transition cursor-pointer
                  ${plan.popular
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                        }`}
                                >
                                    Get Started
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>

    );
}

export default Pricing;
