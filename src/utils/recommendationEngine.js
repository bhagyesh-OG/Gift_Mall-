export function calculateRecommendationScore(product, preferences = {}) {
  let score = 0;
  const { budget = Infinity, occasion, recipient, interest } = preferences;

  if (product.price <= budget) score += 30;
  if (occasion && product.occasions?.includes(occasion)) score += 25;
  if (recipient && product.suitableFor?.includes(recipient)) score += 20;
  if (interest && product.interests?.includes(interest)) score += 15;
  score += (product.popularity / 100) * 10;

  return Math.round(score);
}

export function getRecommendations(products, preferences) {
  return products
    .map((product) => ({
      ...product,
      matchScore: calculateRecommendationScore(product, preferences)
    }))
    .filter((product) => product.matchScore > 20)
    .sort((a, b) => b.matchScore - a.matchScore);
}
