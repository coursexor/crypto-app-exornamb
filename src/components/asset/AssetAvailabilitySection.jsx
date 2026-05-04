import { FiCheckCircle } from "react-icons/fi";
import world from "../../assets/world.svg";

// Displays the worldwide availability section for assets
export default function AssetAvailabilitySection({ points }) {
    return (
        <section className="bg-black px-4 py-16 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <img
            src={world}
            alt="World"
            className="w-full rounded-2xl border object-cover"
            />

            <div>
            <h2 className="text-4xl font-medium leading-tight">
                Your asset, available
                <br />
                on Coinbase
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-400">
                List on the Exchange, Custody, and all our trading interfaces.
            </p>

            <div className="mt-6 space-y-4">
                {points.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-white" />
                    <span>{item}</span>
                </div>
                ))}
            </div>
            </div>
        </div>
        </section>
    );
}