
const Features_List = [
    {
        id: "1",
        badge: "Quick to setup",
        heading: "A dedicated landing page",
        desc: "Create a dedicated landing page for your business. Share the page link easily via email, social media, or even SMS. Setup can be done in two minutes.",
        image: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffeatures%2Flanding-page.png?alt=media&token=269a1a1c-4539-4d94-aa9e-ed0425eb1fce"
    },
    {
        id: "2",
        badge: "Easy to manage",
        heading: "A dashboard to manage all testimonials",
        desc: "You will have a simple & clean dashboard to manage all testimonials in one place. It's like your email inbox, but it's designed for your social proof!",
        image: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffeatures%2FEasy%20to%20manage%20(1).png?alt=media&token=5d3ae5f2-e35b-4e35-8070-acde541c18ec"
    },
    {
        id: "3",
        badge: "Track the metrics",
        heading: "Understand how video testimonials are performing",
        desc: "Track the metrics from all embedded videos, help your marketing team understand the performance at a glance, even promote the best-performing videos to different marketing channels.",
        image: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffeatures%2Fmetrics.png?alt=media&token=c5aa1272-4d36-4f9f-8ee6-df660985e7e1"
    },
    {
        id: "4",
        badge: "More social proof",
        heading: "Not only text and video testimonials",
        desc: "If you have testimonials on social media (e.g. Twitter, LinkedIn, TikTok etc), video hosting platforms (e.g. YouTube, Vimeo), and other review sites (e.g. G2, Google, Capterra, Yelp etc), bring them all to your account. Testimonial helps you manage all your social proof in a single place!",
        image: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffeatures%2Fmore-social-proof.png?alt=media&token=83a1a3e9-449d-457d-80fb-0cfa55484700"
    },
    {
        id: "5",
        badge: "Embed the Wall of Love",
        heading: "The best testimonials all in one place",
        desc: "Treat the Wall of Love as the place to showcase all your favorite testimonials. You can embed it to your website in under a minute. No coding knowledge required!",
        image: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffeatures%2Fwall-of-love.png?alt=media&token=74e955e5-a21b-4cc6-ab05-d497b7fb313a"
    },
    {
        id: "6",
        badge: "Embed a single video testimonial",
        heading: "Ad-free hosting for each video",
        desc: "For the video testimonial, you can embed it directly on your own website like this 👈. You don't need to use any 3rd-party Ad-free hosting service, e.g. Wistia, Vimeo.",
        image: "https://image.mux.com/oh9dwmQsIRcaaZ02MdZAdoDonsfkZtIU6Uf5ppNUxLfA/thumbnail.jpg?width=640"
    },
]
const Features = () => {
    return (
        <div className="w-full p-4 flex items-center justify-center">
            <div className="max-w-6xl m-auto space-y-8 py-5">
                <h2 className="text-2xl lg:text-5xl font-semibold text-center mb-12">Collect and display testimonials all in <br />one solution</h2>
                <div className="space-y-20">
                    {
                        Features_List.map((item, index) => {
                            return (
                                <div className={`flex gap-10 ${index % 2 === 0
                                    ? "flex-col lg:flex-row"
                                    : "flex-col-reverse lg:flex-row-reverse"
                                    } items-center`}>
                                    <div className="space-y-4">
                                        <p className="text-md font-bold text-blue-600">{item.badge}</p>
                                        <h3 className="text-3xl font-bold max-w-lg">{item.heading}</h3>
                                        <p className="max-w-lg text-center lg:text-left text-gray-400 font-light">{item.desc}</p>
                                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">Try free now</button>
                                    </div>
                                    <div>
                                        <img
                                            className="w-full max-w-sm lg:max-w-md object-contain"
                                            src={item.image}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Features