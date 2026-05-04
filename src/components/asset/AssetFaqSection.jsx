import FAQItem from "../common/FAQItem";

// Displays the Frequently Asked Questions (FAQ) section for an asset
export default function AssetFaqSection({ faqItems, openIndex, setOpenIndex }) {
    return (
        <section className="bg-[#F8F8F8] px-4 py-16">
        <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-medium text-black sm:text-5xl">FAQs</h2>

            <div className="mt-8 space-y-3">
            {faqItems.map((item, index) => (
                <FAQItem
                key={item.q}
                item={item}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
            ))}
            </div>
        </div>
        </section>
    );
    }