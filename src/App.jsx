import React, { useEffect, useState } from "react";
import { ArrowRight, Gift, Heart, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Shop from "./pages/Shop";
import { products } from "./data/products";

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setOpen(false);
  return (
    <header className={`navbar ${location.pathname === "/" ? "navbar-home" : ""}`}>
      <Link className="brand" to="/" onClick={closeMenu}><span className="brand-mark"><Gift size={18} /></span>Gift<span>Mall</span></Link>
      <nav className="desktop-nav"><Link className={location.pathname === "/shop" ? "active" : ""} to="/shop">Shop</Link><Link className={location.pathname === "/gift-finder" ? "active" : ""} to="/gift-finder">Gift Finder</Link><Link to="/offers">Offers</Link><Link to="/about">About</Link></nav>
      <div className="nav-actions"><Link className="icon-nav" to="/shop" aria-label="Search"><Search size={18} /></Link><Link className="icon-nav" to="/wishlist" aria-label="Wishlist"><Heart size={18} /></Link><Link className="icon-nav" to="/cart" aria-label="Cart"><ShoppingBag size={18} /></Link><Link className="nav-cta" to="/gift-finder">Find a Gift <ArrowRight size={16} /></Link><button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">{open ? <X size={22} /> : <Menu size={22} />}</button></div>
      <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><Link to="/shop" onClick={closeMenu}>Shop</Link><Link to="/gift-finder" onClick={closeMenu}>Gift Finder</Link><Link to="/offers" onClick={closeMenu}>Offers</Link><Link to="/about" onClick={closeMenu}>About</Link></motion.div>}</AnimatePresence>
    </header>
  );
}

function CinematicHome() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const rotateX = useTransform(sy, [-500, 500], [8, -8]);
  const rotateY = useTransform(sx, [-500, 500], [-8, 8]);

  const handlePointer = (event) => {
    mx.set(event.clientX - window.innerWidth / 2);
    my.set(event.clientY - window.innerHeight / 2);
  };

  return (
    <main className="cinematic-home" onPointerMove={handlePointer}>
      <div className="cinematic-noise" />
      <div className="cinematic-vignette" />
      <motion.div className="cursor-orb" style={{ x: sx, y: sy }} />
      <motion.div className="hero-radial radial-a" animate={{ scale: [1, 1.16, 1], opacity: [.25, .42, .25] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="hero-radial radial-b" animate={{ scale: [1.1, .92, 1.1], opacity: [.16, .28, .16] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div className="hero-orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} />
      <motion.div className="hero-orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 42, repeat: Infinity, ease: "linear" }} />
      <motion.div className="hero-orbit orbit-three" animate={{ rotate: 360 }} transition={{ duration: 58, repeat: Infinity, ease: "linear" }} />

      <motion.div className="hero-core" style={{ rotateX, rotateY }}>
        <motion.div className="core-halo" animate={{ rotate: -360, scale: [1, 1.03, 1] }} transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }} />
        <div className="hero-kicker"><Sparkles size={14} /> THE ART OF GIVING</div>
        <motion.h1 initial={{ opacity: 0, y: 50, filter: "blur(18px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.35, delay: .15, ease: [0.16, 1, 0.3, 1] }}>Gifts that feel<br /><em>impossible to forget.</em></motion.h1>
        <motion.div className="hero-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: .65, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .75 }}>Curated. Personal. Unexpected.</motion.p>
        <motion.div className="hero-cta-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: 1 }}>
          <Link className="cinematic-cta" to="/shop"><span>Enter the collection</span><ArrowRight size={18} /></Link>
          <Link className="ghost-cta" to="/gift-finder">Find their gift</Link>
        </motion.div>
      </motion.div>

      <motion.div className="hero-product product-a" animate={{ y: [0, -24, 0], rotate: [4, 7, 4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><img src={products[0].image} alt="Gift" /></motion.div>
      <motion.div className="hero-product product-b" animate={{ y: [0, 18, 0], rotate: [-6, -2, -6] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}><img src={products[4].image} alt="Gift" /></motion.div>
      <motion.div className="hero-product product-c" animate={{ y: [0, -12, 0], rotate: [8, 3, 8] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}><img src={products[1].image} alt="Gift" /></motion.div>

      <div className="hero-bottom"><span>SCROLL / DISCOVER</span><i /></div>
      <div className="hero-counter"><strong>01</strong><span>/</span><span>01</span></div>
    </main>
  );
}

function Placeholder({ title, body = "This section is scheduled for the next implementation milestone." }) {
  return <main className="placeholder"><span className="section-kicker">GIFTMALL</span><h1>{title}</h1><p>{body}</p><Link className="primary-btn" to="/">Back home <ArrowRight size={18} /></Link></main>;
}

export default function App() {
  const location = useLocation();
  return <><ScrollManager /><Navbar /><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .45, ease: [0.16, 1, 0.3, 1] }}><Routes><Route path="/" element={<CinematicHome />} /><Route path="/shop" element={<Shop />} /><Route path="/gift-finder" element={<Placeholder title="Let's find their perfect gift." body="The recommendation flow comes next: recipient, occasion, budget, interests, then a ranked match." />} /><Route path="/offers" element={<Placeholder title="Good gifts. Better prices." />} /><Route path="/about" element={<Placeholder title="Gifts with a little more thought." />} /><Route path="/wishlist" element={<Placeholder title="Your saved gifts." />} /><Route path="/cart" element={<Placeholder title="Your gift bag." />} /><Route path="*" element={<Placeholder title="We couldn't find that page." />} /></Routes></motion.div></AnimatePresence></>;
}
