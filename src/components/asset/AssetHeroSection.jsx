// Displays the hero section on the Asset Detail page with the main headline and button
export default function AssetHeroSection() {
    return (
        <section className="bg-[#F8F8F8] px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-medium tracking-tight text-black sm:text-5xl">
            Coinbase Listings
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600">
            At Coinbase, we believe in the power of innovation and are constantly monitoring the
            crypto landscape for promising projects to support on our platform.
            </p>
            <button className="mt-8 rounded-full bg-[#0052FF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0046db]">
            Request a review
            </button>
        </div>
        </section>
    );
}