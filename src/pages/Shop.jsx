import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Search, SlidersHorizontal, Star, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

const sortOptions = [["featured", "Featured"], ["price-low", "Price: Low to High"], ["price-high", "Price: High to Low"], ["rating", "Top Rated"], ["popular", "Most Popular"]];
const cardAccents = ["#ff2f7d", "#7957ff", "#6df4ff", "#ff9f43", "#b86cff", "#48e0a4"];

function ProductCard({ product, onAdd, index, activeId, setActiveId }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wished = isWishlisted(product.id);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 16 });
  const sy = useSpring(y, { stiffness: 120, damping: 16 });
  const rotateX = useTransform(sy, [-180, 180], [5, -5]);
  const rotateY = useTransform(sx, [-180, 180], [-5, 5]);
  const cardRef = useRef(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.35) setActiveId(product.id);
    }, { rootMargin: "-28% 0px -28% 0px", threshold: [0.35, 0.6] });
    observer.observe(node);
    return () => observer.disconnect();
  }, [product.id, setActiveId]);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
    const px = ((event.clientX - rect.left) / rect.width) * 100;
    const py = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--mx", `${px}%`);
    event.currentTarget.style.setProperty("--my", `${py}%`);
    setActiveId(product.id);
  };
  const reset = (event) => {
    x.set(0); y.set(0);
    event.currentTarget.style.setProperty("--mx", "50%");
    event.currentTarget.style.setProperty("--my", "50%");
  };

  return (
    <motion.article ref={cardRef} className={`shop-product-card cinematic-card ${activeId === product.id ? "liquid-active" : ""}`} style={{ rotateX, rotateY, transformPerspective: 1100, "--accent-card": cardAccents[index % cardAccents.length] }} data-accent={cardAccents[index % cardAccents.length]} layout initial={{ opacity: 0, y: 35, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .55, delay: index * .055, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -12 }} onMouseEnter={() => setActiveId(product.id)} onMouseMove={handleMove} onMouseLeave={reset}>
      <div className="liquid-fill" />
      <div className="card-sheen" />
      <div className="shop-product-image">
        <Link to={`/product/${product.id}`} className="product-image-link">
          <img src={product.image} alt={product.name} />
          <span className="image-glow" />
          <span className="view-product"><ArrowUpRight size={17} /></span>
        </Link>
        <span className="product-pill">{product.category}</span>
        <button className={`wishlist-btn ${wished ? "active" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label="Toggle wishlist"><Heart size={17} fill={wished ? "currentColor" : "none"} /></button>
      </div>
      <div className="shop-product-info">
        <div className="shop-product-meta"><span><Star size={13} fill="currentColor" /> {product.rating}</span><small>{product.reviews} reviews</small></div>
        <Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link>
        <div className="shop-price-row"><strong>₹{product.price.toLocaleString("en-IN")}</strong>{product.originalPrice && <del>₹{product.originalPrice.toLocaleString("en-IN")}</del>}</div>
        <button className="add-cart-btn" onClick={() => onAdd(product.id)}>Add to cart <ArrowUpRight size={15} /></button>
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
  const [activeId, setActiveId] = useState(products[0]?.id ?? null);
  const { addToCart, itemCount } = useCart();

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesSearch = !normalized || [product.name, product.category, ...product.tags, ...product.interests].some((value) => value.toLowerCase().includes(normalized));
      return matchesSearch && (category === "all" || product.category === category) && product.price <= maxPrice && product.rating >= minRating;
    });
    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.popularity - a.popularity;
    });
  }, [search, sort, category, maxPrice, minRating]);

  useEffect(() => {
    if (filteredProducts.length && !filteredProducts.some((product) => product.id === activeId)) setActiveId(filteredProducts[0].id);
  }, [filteredProducts, activeId]);

  const clearFilters = () => { setSearch(""); setCategory("all"); setMaxPrice(2500); setMinRating(0); setSort("featured"); };

  return (
    <main className="shop-page cinematic-shop">
      <section className="shop-hero cinematic-shop-hero">
        <div className="shop-hero-grid" />
        <motion.span className="section-kicker" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>THE COLLECTION / 2026</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 45, filter: "blur(14px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>Don't just buy a gift.<br /><em>Find the one.</em></motion.h1>
        <motion.div className="shop-hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}><p>Every piece is selected to make the moment feel personal.</p><span>SCROLL TO SHOP ↓</span></motion.div>
      </section>
      <section className="shop-toolbar-wrap cinematic-toolbar"><div className="shop-toolbar"><div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection..." /></div><button className="filter-mobile-btn" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={17} /> Filters</button><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">{sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><motion.div className="cart-pulse" animate={{ opacity: [.45, 1, .45] }} transition={{ duration: 2.4, repeat: Infinity }}>{itemCount} in bag</motion.div></section>
      <section className="shop-layout cinematic-layout">
        <aside className="shop-sidebar cinematic-sidebar"><div className="filter-heading"><div><span className="sidebar-kicker">CURATE</span><strong>Filters</strong></div><button onClick={clearFilters}>Reset</button></div><label className="filter-label">Category</label><div className="filter-list"><button className={category === "all" ? "selected" : ""} onClick={() => setCategory("all")}>All gifts <span>{products.length}</span></button>{categories.map((item) => <button key={item.id} className={category === item.id ? "selected" : ""} onClick={() => setCategory(item.id)}>{item.name}</button>)}</div><label className="filter-label">Maximum budget <strong>₹{maxPrice.toLocaleString("en-IN")}</strong></label><input className="price-range" type="range" min="300" max="2500" step="100" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /><div className="range-labels"><span>₹300</span><span>₹2,500+</span></div><label className="filter-label">Minimum rating</label><div className="rating-filters">{[0, 4, 4.5, 4.7].map((rating) => <button key={rating} className={minRating === rating ? "selected" : ""} onClick={() => setMinRating(rating)}>{rating === 0 ? "Any rating" : `${rating}+ ★`}</button>)}</div></aside>
        <div className="shop-results"><div className="results-header"><span><strong>{filteredProducts.length}</strong> gifts found</span>{(category !== "all" || minRating > 0 || maxPrice < 2500 || search) && <button className="inline-clear" onClick={clearFilters}>Clear filters <X size={14} /></button>}</div><AnimatePresence mode="popLayout">{filteredProducts.length ? <motion.div className="shop-grid" layout>{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} onAdd={addToCart} index={index} activeId={activeId} setActiveId={setActiveId} />)}</motion.div> : <motion.div className="empty-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div>◌</div><h2>Nothing matched those filters.</h2><p>Open the aperture. Try a wider budget or another search.</p><button onClick={clearFilters}>Reset everything</button></motion.div>}</AnimatePresence></div>
      </section>
      <AnimatePresence>{filtersOpen && <motion.div className="filter-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)}><motion.div className="mobile-filter-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} onClick={(event) => event.stopPropagation()}><div className="mobile-filter-header"><strong>Filters</strong><button onClick={() => setFiltersOpen(false)}><X /></button></div><div className="filter-copy">Use the collection controls to narrow the field. Results update instantly.</div><button className="primary-btn" onClick={() => setFiltersOpen(false)}>Done</button></motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}
