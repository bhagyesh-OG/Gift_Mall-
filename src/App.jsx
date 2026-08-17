import { Link, Route, Routes } from "react-router-dom";
import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Personalized LED Name Lamp",
    price: 899,
    category: "Personalized",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    price: 1499,
    category: "Technology",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    name: "Minimalist Self-Care Gift Box",
    price: 799,
    category: "Self Care",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    name: "Premium Leather Wallet",
    price: 1199,
    category: "Fashion",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85"
  }
];

function Navbar() {
  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark"><Gift size={18} /></span>
        Gift<span>Mall</span>
      </Link>
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/gift-finder">Gift Finder</Link>
        <Link to="/offers">Offers</Link>
        <Link to="/about">About</Link>
      </nav>
      <Link className="nav-cta" to="/gift-finder">Find a Gift <ArrowRight size={16} /></Link>
    </header>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow"><Sparkles size={15} /> CURATED FOR THE MOMENT</div>
          <h1>Find a gift they'll <em>never forget.</em></h1>
          <p>Thoughtful gifts, intelligently matched to their personality, your occasion, and your budget.</p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/gift-finder">Find My Perfect Gift <ArrowRight size={18} /></Link>
            <Link className="secondary-btn" to="/shop">Explore Collection</Link>
          </div>
        </motion.div>
        <motion.div className="floating-card card-one" animate={{ y: [0, -14, 0], rotate: [2, 4, 2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <img src={products[0].image} alt="Personalized LED lamp" />
          <div><strong>Made for them.</strong><span>Personalized gifts</span></div>
        </motion.div>
        <motion.div className="floating-card card-two" animate={{ y: [0, 12, 0], rotate: [-3, -1, -3] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
          <span className="mini-label">TRENDING</span><strong>4.9 ★</strong><span>Loved by gift-givers</span>
        </motion.div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div><span className="section-kicker">START HERE</span><h2>Shop by <em>moment.</em></h2></div>
          <Link to="/shop">View all <ArrowRight size={16} /></Link>
        </div>
        <div className="category-grid">
          {[
            ["Birthday", "🎂", "Make their day brighter."],
            ["Anniversary", "💝", "Celebrate the two of you."],
            ["Personalized", "✨", "Made uniquely for them."],
            ["Graduation", "🎓", "For the next big chapter."]
          ].map(([name, icon, description], index) => (
            <motion.div className="category-card" key={name} whileHover={{ y: -8 }} transition={{ duration: 0.2 }}>
              <span className="category-number">0{index + 1}</span><span className="category-icon">{icon}</span>
              <h3>{name}</h3><p>{description}</p><ArrowRight size={18} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section products-section">
        <div className="section-heading"><div><span className="section-kicker">COMMUNITY FAVOURITES</span><h2>Loved <em>right now.</em></h2></div><Link to="/shop">Shop all <ArrowRight size={16} /></Link></div>
        <div className="product-grid">
          {products.map((product) => (
            <motion.article className="product-card" key={product.id} whileHover={{ y: -6 }}>
              <div className="product-image"><img src={product.image} alt={product.name} /><span>{product.category}</span></div>
              <div className="product-info"><div className="rating">★ {product.rating}</div><h3>{product.name}</h3><strong>₹{product.price.toLocaleString("en-IN")}</strong></div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}

function Placeholder({ title }) {
  return <main className="placeholder"><span className="section-kicker">GIFTMALL</span><h1>{title}</h1><p>This page is part of the next build milestone.</p><Link className="primary-btn" to="/">Back home <ArrowRight size={18} /></Link></main>;
}

export default function App() {
  return <><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/shop" element={<Placeholder title="The collection is coming together." />} /><Route path="/gift-finder" element={<Placeholder title="Let's find their perfect gift." />} /><Route path="/offers" element={<Placeholder title="Good gifts. Better prices." />} /><Route path="/about" element={<Placeholder title="Gifts with a little more thought." />} /><Route path="*" element={<Placeholder title="We couldn't find that page." />} /></Routes></>;
}
