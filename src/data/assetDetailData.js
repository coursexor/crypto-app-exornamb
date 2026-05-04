import checklist from "../assets/checklist.svg";
import arrow from "../assets/arrow.svg";
import blocks from "../assets/blocks.svg";

export const reviewCards = [
  {
    title: "Business Criteria",
    text: "We prioritize reviews of assets based on set business criteria such as demand, trading volume, market cap, traction of token/application, token holders, and anticipated liquidity. We also perform additional business assessments regarding quantitative and qualitative signals such as social media sentiment and behavior, history of key project contributors, and information about how tokens are distributed.",
    art: checklist,
  },
  {
    title: "Pre-Launch Assets",
    text: "As project teams continue to issue new tokens, our team strives to stay current in this evolving landscape by supporting asset launches with trading support on day one. Evaluating assets ahead of launch is unique, and we have a separate set of business criteria to decide which projects we'll consider for a pre-launch review.",
    art: arrow,
  },
  {
    title: "Technical Considerations",
    text: "We are currently equipped to support several token types (ERC-20 on Base, Ethereum, Optimism, Arbitrum, and Polygon as well as SPLs and ARC-20s) without substantial integration efforts. Native blockchains and other asset types require additional resources to support, which impacts our ability to prioritize certain assets.",
    art: blocks,
  },
];

export const processSteps = [
  {
    number: "1",
    title: "Request a review",
    text: "Begin by filling out a request for review, and provide detailed information about your asset, including its purpose, technology, and team.",
  },
  {
    number: "2",
    title: "Initial Review",
    text: "Our team conducts a preliminary assessment to ensure the asset aligns with our listing criteria. If we choose to move forward or have additional questions, our team will reach out to you.",
  },
  {
    number: "3",
    title: "Due Diligence",
    text: "We perform an in-depth analysis, evaluating factors such as technology, use case, market demand, and regulatory compliance.",
  },
  {
    number: "4",
    title: "Notification",
    text: "After completing our due diligence, we will reach out to projects that have been chosen for listing.",
  },
  {
    number: "5",
    title: "Listing",
    text: "Coinbase conducts our standard listing process to enable transfers and move into trading mode when liquidity conditions are met.",
  },
  {
    number: "6",
    title: "Post-Listing Support",
    text: "Enjoy ongoing support from Coinbase as you engage with our community and navigate the market.",
  },
];

export const faqItems = [
  {
    q: "What's needed from project teams to review an asset?",
    a: "Project teams should submit a detailed request including the asset overview, tokenomics, technical documentation, launch status, team information, ecosystem traction, and any other details needed for business and technical review.",
  },
  {
    q: "How does Coinbase prioritize reviews?",
    a: "Reviews are prioritized using a mix of business criteria, technical readiness, consumer demand, market quality, and our ability to safely support the asset.",
  },
  {
    q: "How does Coinbase review assets?",
    a: "Coinbase evaluates assets through business, legal, compliance, and technical review processes before deciding whether to move forward.",
  },
  {
    q: "What other factors are considered through the due diligence review?",
    a: "Additional factors can include token distribution, security posture, team history, user demand, market integrity, and operational support requirements.",
  },
  {
    q: "What types of tokens does Coinbase currently support?",
    a: "Support depends on network and integration readiness. Commonly supported formats include select ERC-20 and other supported asset standards across approved networks.",
  },
  {
    q: "Is Rosetta implementation necessary to list my asset on Coinbase?",
    a: "Not always. Requirements depend on the asset type, network design, and the systems needed to support transfers and trading safely.",
  },
  {
    q: "Which assets are currently available on Coinbase Exchange?",
    a: "Available assets vary by product and region. Coinbase publishes supported assets and market availability through its official product pages and announcements.",
  },
  {
    q: "Why is an asset that's listed on Coinbase not available in my region?",
    a: "Regional availability can vary based on licensing, regulation, market conditions, and product support differences.",
  },
  {
    q: "Why did you decide not to list certain assets?",
    a: "Coinbase may decline to list an asset if it does not meet business, compliance, technical, security, or market integrity requirements.",
  },
  {
    q: "Are there any fees associated with a listing?",
    a: 'Coinbase does not promise listing in exchange for payment. Review and integration considerations depend on the asset and support requirements.',
  },
  {
    q: "How can project teams educate Coinbase users about their token?",
    a: "Teams can provide clear educational resources, documentation, use cases, risk disclosures, and ecosystem materials that help users understand the asset.",
  },
  {
    q: "If my asset is currently supported on Coinbase and we want to undergo an asset migration, what should we expect?",
    a: "Coinbase typically reviews migration details, timeline, technical requirements, token swap mechanics, and communications needed to support customers.",
  },
  {
    q: "What should I do to update my logo on Coinbase platforms?",
    a: "Submit updated brand assets and documentation through the relevant Coinbase team or support channel handling your project information.",
  },
  {
    q: "My asset is listed on Coinbase and I'd like to partner on an opportunity like asset staking, yield farming, NFT drops, or similar functionality – who at Coinbase can I contact?",
    a: "The right contact depends on the opportunity. Existing supported projects should coordinate through their Coinbase relationship or official support channel.",
  },
];

export const availabilityPoints = [
  "Global Reach: Tap into millions of active, trading users",
  "Robust Security: Industry-leading security protocols",
  "Access: Leverage our ecosystem of tools for developers",
];