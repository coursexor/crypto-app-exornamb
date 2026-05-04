// Displays the listing process steps on the Asset Detail page
export default function AssetProcessSection({ steps }) {
    return (
        <section className="bg-[#F8F8F8] px-4 py-16">
        <div className="mx-auto max-w-5xl">
            <div className="mb-10 grid gap-6 lg:grid-cols-2">
            <h2 className="text-4xl font-medium leading-tight text-black sm:text-5xl">
                Coinbase
                <br />
                listing process
            </h2>
            <p className="max-w-md text-sm leading-6 text-gray-600 lg:justify-self-end">
                Coinbase adheres to thorough processes and standards for all asset listings.
            </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {steps.map((step) => (
                <div key={step.number} className="rounded-[28px] bg-[#ECEDEF] p-6">
                <div className="text-5xl font-semibold leading-none text-black">
                    {step.number}
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{step.text}</p>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}