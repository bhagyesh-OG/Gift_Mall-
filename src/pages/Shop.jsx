import { useMemo, useState } from "react";
import { Heart, Search, SlidersHorizontal, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

const sortOptions = [
  ["featured", "Featured"],
  ["price-low", "Price: Low to High"],
  ["price-high", "Price: High to Low"],
  ["rating", "Top Rated"],
  ["popular", "Most Popular"]
];

function ProductCard({ product, onAdd }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wished = isWishlisted(product.id);

  return (
    <motion.article className="shop-product-card" layout whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <div className="shop-product-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <span className="product-pill">{product.category}</span>
        <button className={`wishlist-btn ${wished ? "active" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label="Toggle wishlist">
          <Heart size={17} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="shop-product-info">
        <div className="shop-product-meta"><span><Star size={13} fill="currentColor" /> {product.rating}</span><small>{product.reviews} reviews</small></div>
        <Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link>
        <div className="shop-price-row"><strong>₹{product.price.toLocaleString("en-IN")}</strong>{product.originalPrice && <del>₹{product.originalPrice.toLocaleString("en-IN")}</del>}</div>
        <button className="add-cart-btn" onClick={() => onAdd(product.id)}>Add to cart</button>
      </div>
    </motion.article>
  );
}

export default function Shop() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { addToCart, itemCount } = useCart();

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesSearch = !normalized || [product.name, product.category, ...product.tags, ...product.interests].some((value) => value.toLowerCase().includes(normalized));
      const matchesCategory = category === "all" || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      const matchesRating = product.rating >= minRating;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "popular") return b.popularity - a.popularity;
      return b.popularity - a.popularity;
    });
  }, [search, sort, category, maxPrice, minRating]);

  const clearFilters = () => {
    setSearch(""); setCategory("all"); setMaxPrice(2500); setMinRating(0); setSort("featured");
  };

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <span className="section-kicker">THE GIFTMALL COLLECTION</span>
        <h1>Find something that feels <em>just right.</em></h1>
        <p>Search by what they love, filter by what you can spend, and discover gifts people genuinely want.</p>
      </section>

      <section className="shop-toolbar-wrap">
        <div className="shop-toolbar">
          <div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search gifts, interests, categories..." /></div>
          <button className="filter-mobile-btn" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={17} /> Filters</button>
          <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
            {sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
        <div className="cart-pulse">{itemCount} item{itemCount === 1 ? "" : "s"} in cart</div>
      </section>

      <section className="shop-layout">
        <aside className="shop-sidebar">
          <div className="filter-heading"><strong>Filters</strong><button onClick={clearFilters}>Clear all</button></div>
          <label className="filter-label">Category</label>
          <div className="filter-list">
            <button className={category === "all" ? "selected" : ""} onClick={() => setCategory("all")}>All gifts <span>{products.length}</span></button>
            {categories.map((item) => <button key={item.id} className={category === item.id ? "selected" : ""} onClick={() => setCategory(item.id)}>{item.name}</button>)}
          </div>
          <label className="filter-label">Maximum budget <strong>₹{maxPrice.toLocaleString("en-IN")}</strong></label>
          <input className="price-range" type="range" min="300" max="2500" step="100" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
          <div className="range-labels"><span>₹300</span><span>₹2,500+</span></div>
          <label className="filter-label">Minimum rating</label>
          <div className="rating-filters">
            {[0, 4, 4.5, 4.7].map((rating) => <button key={rating} className={minRating === rating ? "selected" : ""} onClick={() => setMinRating(rating)}>{rating === 0 ? "Any rating" : `${rating}+ ★`}</button>)}
          </div>
        </aside>

        <div className="shop-results">
          <div className="results-header"><span><strong>{filteredProducts.length}</strong> gifts found</span>{(category !== "all" || minRating > 0 || maxPrice < 2500 || search) && <button className="inline-clear" onClick={clearFilters}>Clear filters <X size={14} /></button>}</div>
          <AnimatePresence mode="popLayout">
            {filteredProducts.length ? (
              <motion.div className="shop-grid" layout>
                {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
              </motion.div>
            ) : (
              <motion.div className="empty-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div>🔎</div><h2>Nothing matched those filters.</h2><p>Try a wider budget or a different search.</p><button onClick={clearFilters}>Reset everything</button></motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {filtersOpen && <motion.div className="filter-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)}>
          <motion.div className="mobile-filter-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} onClick={(event) => event.stopPropagation()}>
            <div className="mobile-filter-header"><strong>Filters</strong><button onClick={() => setFiltersOpen(false)}><X /></button></div>
            <div className="filter-copy">Use the same controls as the desktop filter panel. Your choices update the results instantly.</div>
            <button className="primary-btn" onClick={() => setFiltersOpen(false)}>Done</button>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}
