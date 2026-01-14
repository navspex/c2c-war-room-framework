export interface PromptWindow {
  id: number;
  name: string;
  platform: string;
  purpose: string;
  promptTemplate: string;
}

export const councilOf7Prompts: PromptWindow[] = [
  {
    id: 1,
    name: "Market Gap Researcher",
    platform: "Perplexity",
    purpose: "Identify market gaps and underserved niches",
    promptTemplate: "Research the following niche: {NICHE_IDEA}. Analyze: 1) Current market gaps and underserved segments, 2) Pain points not addressed by existing solutions, 3) Emerging trends in this space, 4) Potential opportunities for innovation. Provide specific data and examples."
  },
  {
    id: 2,
    name: "Competition Analyst",
    platform: "ChatGPT",
    purpose: "Analyze competitive landscape",
    promptTemplate: "Analyze the competitive landscape for: {NICHE_IDEA}. Evaluate: 1) Top 5 competitors and their market share, 2) Competitive advantages and weaknesses, 3) Market saturation level (1-10 scale), 4) Barriers to entry, 5) White space opportunities."
  },
  {
    id: 3,
    name: "Profitability Evaluator",
    platform: "Claude",
    purpose: "Assess revenue potential and monetization",
    promptTemplate: "Evaluate the profitability potential of: {NICHE_IDEA}. Assess: 1) Revenue models that work in this niche, 2) Average customer lifetime value, 3) Pricing expectations, 4) Scalability potential (1-10), 5) Estimated time to profitability."
  },
  {
    id: 4,
    name: "Urgency Detector",
    platform: "Gemini",
    purpose: "Identify problem urgency and demand signals",
    promptTemplate: "Analyze the urgency and demand for: {NICHE_IDEA}. Determine: 1) How urgent is the problem this solves (1-10), 2) Search volume trends, 3) Social proof and community discussions, 4) Seasonal vs evergreen demand, 5) Growth trajectory."
  },
  {
    id: 5,
    name: "Trend Scout",
    platform: "Grok",
    purpose: "Track X/Twitter trends and conversations",
    promptTemplate: "Search X/Twitter for trends related to: {NICHE_IDEA}. Report: 1) Top trending conversations and hashtags, 2) Influencer opinions and sentiment, 3) Viral content patterns, 4) Emerging sub-niches, 5) Community pain points being discussed."
  },
  {
    id: 6,
    name: "Target Audience Profiler",
    platform: "ChatGPT",
    purpose: "Define ideal customer profile",
    promptTemplate: "Create a detailed target audience profile for: {NICHE_IDEA}. Define: 1) Demographics (age, income, location, education), 2) Psychographics (values, interests, behaviors), 3) Online habits and platforms they use, 4) Buying triggers and objections, 5) Preferred content formats."
  },
  {
    id: 7,
    name: "Risk Assessor",
    platform: "Claude",
    purpose: "Identify risks and mitigation strategies",
    promptTemplate: "Conduct a risk assessment for: {NICHE_IDEA}. Identify: 1) Top 5 risks (market, technical, financial, operational), 2) Likelihood and impact of each risk (1-10), 3) Regulatory or legal concerns, 4) Mitigation strategies, 5) Exit strategy considerations."
  }
];

export function generatePrompt(template: string, nicheIdea: string): string {
  return template.replace(/{NICHE_IDEA}/g, nicheIdea);
}
