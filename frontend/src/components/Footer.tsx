import React from "react"

type FooterLink = {
    label: string
    href: string
}

const footerData: {
    title: string
    links: FooterLink[]
}[] = [
        {
            title: "Products",
            links: [
                { label: "Our Wall of Love", href: "#" },
                { label: "Embed widgets", href: "#" },
                { label: "Chrome extension", href: "#" },
                { label: "Slack app", href: "#" },
                { label: "Hopin app", href: "#" },
                { label: "Pricing", href: "#" },
                { label: "Features", href: "#" },
                { label: "AI features", href: "#" },
                { label: "Integrations", href: "#" },
                { label: "Product demo", href: "#" },
                { label: "Status page", href: "#" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Help center", href: "#" },
                { label: "Our blog", href: "#" },
                { label: "Tutorials", href: "#" },
                { label: "Customer stories", href: "#" },
                { label: "YouTube channel", href: "#" },
                { label: "Join affiliate program", href: "#" },
                { label: "Privacy policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie policy", href: "#" },
                { label: "Contact us", href: "#" },
            ],
        },
        {
            title: "Customers",
            links: [
                { label: "Agencies", href: "#" },
                { label: "B2B companies", href: "#" },
                { label: "Course creators", href: "#" },
                { label: "eCommerce", href: "#" },
                { label: "Consumer apps", href: "#" },
            ],
        },
        {
            title: "Free Tools",
            links: [
                { label: "Case study generator", href: "#" },
                { label: "Testimonial questions generator", href: "#" },
                { label: "Google Business reviews", href: "#" },
                { label: "Yelp reviews", href: "#" },
                { label: "EasyMonials.new", href: "#" },
                { label: "ReviewToImage.com", href: "#" },
                { label: "SeeyaFuture.me", href: "#" },
                { label: "Street Interview AI", href: "#" },
                { label: "Typo.domains", href: "#" },
                { label: "PDF Parser", href: "#" },
                { label: "Other free tools", href: "#" },
            ],
        },
    ]

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-5">

                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                                👍
                            </div>
                            <span className="text-xl font-semibold text-gray-900">
                                EasyMonials
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-gray-500 max-w-xs">
                            The easiest solution to getting text and video testimonials from
                            your customers
                        </p>
                    </div>

                    {/* Footer Links */}
                    {footerData.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                                {section.title}
                            </h4>
                            <ul className="mt-4 space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-gray-500 hover:text-gray-900 transition"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
            </div>
        </footer>
    )
}

export default Footer
