import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import AssetDetailTopBar from "../components/asset/AssetDetailTopBar";
import AssetHeroSection from "../components/asset/AssetHeroSection";
import AssetAvailabilitySection from "../components/asset/AssetAvailabilitySection";
import AssetReviewsIntroSection from "../components/asset/AssetReviewsIntroSection";
import AssetReviewCardsSection from "../components/asset/AssetReviewCardsSection";
import AssetProcessSection from "../components/asset/AssetProcessSection";
import AssetFaqSection from "../components/asset/AssetFaqSection";
import {
    reviewCards,
    processSteps,
    faqItems,
    availabilityPoints,
} from "../data/assetDetailData";
// Page to display the details, availability, and review process for listing an asset
export default function AssetDetail() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <PageLayout>
        <div className="bg-white">
            <AssetDetailTopBar />
            <AssetHeroSection />
            <AssetAvailabilitySection points={availabilityPoints} />
            <AssetReviewsIntroSection />
            <AssetReviewCardsSection cards={reviewCards} />
            <AssetProcessSection steps={processSteps} />
            <AssetFaqSection
            faqItems={faqItems}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            />
        </div>
        </PageLayout>
    );
}