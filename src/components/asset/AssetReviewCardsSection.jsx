// Renders a grid of review prioritization cards for an asset
export default function AssetReviewCardsSection({ cards }) {
    return (
        <section className="bg-[#F8F8F8] px-4 py-16">
        <div className="mx-auto max-w-5xl">
            <div className="mb-10 grid gap-6 lg:grid-cols-2">
            <h2 className="text-4xl font-medium leading-tight text-black sm:text-5xl">
                Coinbase asset
                <br />
                review prioritization
            </h2>
            <p className="max-w-md text-sm leading-6 text-gray-600 lg:justify-self-end">
                With thousands of live assets today, we prioritize reviews of assets by aiming to
                meet consumer demand while supporting a growing industry.
            </p>
            </div>

            <div className="space-y-4">
            {cards.map((card) => (
                <div
                key={card.title}
                className="grid gap-6 rounded-[28px] bg-[#ECEDEF] p-8 md:grid-cols-[180px_1fr]"
                >
                <img
                    src={card.art}
                    alt={card.title}
                    className="h-70 w-70 rounded-full p-4"
                />
                <div className="self-center">
                    <h3 className="text-lg font-semibold text-black">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{card.text}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}