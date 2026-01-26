import { Check } from "lucide-react";
import type React from "react";

const CTA: React.FC = () => {
    return (
        <div className="w-screen bg-pink-100/20 p-6 space-y-4 mt-15">
            <h2 className="text-2xl lg:text-5xl font-semibold text-center mt-10">Ready to collect testimonials?</h2>
            <p className="text-lg font-thin text-gray-500 text-center w-sm lg:w-xl lg:mx-auto">We are loved by Fortune 500 companies, early-stage startups, marketing agencies, real estate agents, freelancers, and many more. Your customers' testimonials are the best social proof you can get! Get started now 👇</p>

            <div className="max-w-2xl flex justify-center gap-8 items-center mx-auto mt-8">
                <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500">
                        <Check color="white" size={12} />
                    </div>
                    <p className="text-lg font-thin">No coding skill required.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500">
                        <Check color="white" size={12} />
                    </div>
                    <p className="text-lg font-thin">Start in under 2 minutes.</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <button
                    className="w-[90%] lg:w-auto text-white bg-blue-600
                            px-6 py-3 rounded-lg cursor-pointer
                            hover:scale-[1.03] transition-transform duration-200"
                >
                    Try Free now
                </button>

                <button
                    className="w-[90%] lg:w-auto text-center
                            px-10 py-3 border border-blue-600 rounded-lg cursor-pointer
                            hover:scale-[1.03] transition-transform duration-200"
                >
                    Talk to us
                </button>
            </div>

        </div>
    )
}
export default CTA;