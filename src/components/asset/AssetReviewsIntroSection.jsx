// Displays the introductory section explaining the asset review process
export default function AssetReviewsIntroSection() {
    return (
        <section className="bg-[#F8F8F8] px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-medium tracking-tight text-black sm:text-5xl">
            Coinbase asset reviews
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-600">
            Once an asset meets our business criteria, we may choose to move forward with a due
            diligence review. If we need additional information in order to complete an initial
            review or have updates to share, we will reach out to the project team directly.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-gray-600">
            If your project has a live token (or is considering launching a token) and feels it’s
            a strong fit for our platform and customer base, we invite you to share more details
            with us.
            </p>
            <button className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800">
            Request a review
            </button>
            <p className="mt-8 text-[11px] leading-5 text-gray-400">
            While we are not able to respond to all submissions, we will get in touch with you if
            we choose to move forward with a review or need more information from your team.
            </p>
        </div>
        </section>
    );
}