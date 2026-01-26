import type React from "react";

const Integrations: React.FC = () => {
    const logos = ["https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fwebflow.png?alt=media&token=c9e4e238-3200-49a4-9147-c97dd8db1108",
        "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fshopify-logo.png?alt=media&token=fee7c8d9-a41e-433e-b37b-8704417d1827",
        "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fcarrd-logo.png?alt=media&token=8bbafb5e-e33e-4dab-9fea-6e5f5eb37cf9",
        "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fwordpress-logo.png?alt=media&token=badfe040-7a96-40af-948b-a16c2586a8ec",
        "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fkajabi-logo.svg?alt=media&token=1bf05142-b84d-4513-9653-03c61b79fd24",
        "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fbubble-logo.svg?alt=media&token=2985b54a-d6cf-4d24-a219-95c48996fa34",
        "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fframer-logo.png?alt=media&token=30f72e56-ca63-40a3-8ce3-7c9ecd09fd15",
        "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fintegrations%2Fsquarespace-logo-horizontal-black.jpeg?alt=media&token=e4227cfe-c88b-4aa1-bbc5-444a10410789"

    ]
    const arr1 = logos.slice(0, 4)
    const arr2 = logos.slice(4, logos.length)
    return (
        <div className="w-screen bg-gray-100 p-6 space-y-4">
            <h2 className="text-2xl lg:text-5xl font-semibold text-center mt-10">Integrate with any platform</h2>
            <p className="text-lg font-thin text-gray-400 text-center">We built the ultimate tool for showcasing your satisfied customers. With 3-lines of HTML code, <br /> you can embed all your testimonials to any platform!</p>
            <div className="max-w-7xl flex items-center justify-center gap-4 m-auto mt-12">
                {
                    arr1.map(item => {
                        return (
                            <div className="p-2 w-48 h-20 flex items-center justify-center rounded-lg shadow-md bg-white">
                                <img className="object-cover rounded-lg" src={item} />
                            </div>
                        )
                    })
                }

            </div>
            <div className="max-w-7xl flex items-center justify-center gap-4 m-auto mt-8">
                {
                    arr2.map(item => {
                        return (
                            <div className="p-2 w-48 h-20 flex items-center justify-center rounded-lg shadow-md bg-white">
                                <img className="object-cover rounded-lg" src={item} />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Integrations