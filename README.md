# GiftMall 🎁

GiftMall is a dynamic, frontend-first gift discovery and e-commerce prototype.

## Current stack

- React
- Vite
- React Router
- Framer Motion
- Lucide React
- Local JavaScript data
- Explainable rule-based recommendation engine

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Product direction

GiftMall is being built around a real-world problem: helping people find appropriate gifts based on recipient, occasion, interests and budget.

The first version intentionally uses local data and browser state rather than a backend. This keeps the demo fast while leaving clean extension points for a future Spring Boot + MySQL backend and a data-driven recommendation service.

## Planned modules

- Animated landing page
- Product catalogue
- Search, filters and sorting
- Product details
- Cart and wishlist
- Gift Finder
- Preference-based recommendations
- Local user interaction history
- Offers
- Admin dashboard prototype
- Responsive mobile experience

## Recommendation engine

The current recommendation engine is deliberately explainable. It scores products using budget, occasion, recipient, interest and popularity signals. Later, this can be replaced by collaborative filtering or an ML recommendation API without changing the product-discovery UI contract.
