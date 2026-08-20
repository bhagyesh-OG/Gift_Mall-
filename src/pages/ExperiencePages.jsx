import { ArrowRight, Check, Heart, ShoppingBag, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .65 } } };

function ProductRail({ title, products: items }) {
  const { addToCart } = useCart();
  return <section className="experience-section product-rail-section"><div className="section-heading"><div><span>CURATED FOR YOU</span><h2>{title}</h2></div><Link to="/shop">View collection <ArrowRight size={16}/></Link></div><div className="mini-product-grid">{items.map((p, i) => <motion.article className="mini-product-card" key={p.id} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} transition={{ delay: i * .06 }}><Link to={`/product/${p.id}`}><div className="mini-product-image"><img src={p.image} alt={p.name}/><span>{p.category}</span></div><div className="mini-product-copy"><div><Star size={12} fill="currentColor"/> {p.rating}</div><h3>{p.name}</h3><strong>₹{p.price.toLocaleString("en-IN")}</strong><button onClick={(e) => { e.preventDefault(); addToCart(p.id); }}>Add to bag <ShoppingBag size={14}/></button></div></Link></motion.article>)}</div></section>;
}

export function GiftFinderPage() {
  const steps = ["Who are they?", "What is the moment?", "What do they love?", "What is your budget?"];
  return <main className="experience-page"><PageHero number="02" eyebrow="PERSONAL GIFT FINDER" title="Don't know what" emphasis="they'll love?" description="Answer four simple questions and turn a blank page into a shortlist that actually feels personal." ctaLabel="Start finding" ctaTo="#finder" image={products[4].image}/><section id="finder" className="finder-section"><div className="finder-intro"><span>THE FOUR SIGNALS</span><h2>Less guessing.<br/><em>More meaning.</em></h2></div><div className="finder-steps">{steps.map((step, i)=><motion.div className="finder-step" key={step} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}}><span>0{i+1}</span><Sparkles size={18}/><h3>{step}</h3><p>Choose what feels closest. Your choices shape the recommendations.</p></motion.div>)}</div><Link className="primary-btn" to="/shop">Explore the collection <ArrowRight size={17}/></Link></section><ProductRail title="Start with these thoughtful picks" products={products.slice(0, 6)}/></main>;
}

export function OffersPage() {
  const deals = products.filter(p => p.originalPrice && p.originalPrice > p.price).sort((a,b) => (b.originalPrice-b.price)-(a.originalPrice-a.price)).slice(0, 6);
  return <main className="experience-page"><PageHero number="03" eyebrow="GIFTS WITHOUT THE GUILT" title="More thought." emphasis="Less spend." description="Smart finds under ₹2,000, with real value across every budget band." ctaLabel="Shop every offer" ctaTo="/shop" image={deals[0].image}/><section className="offer-band"><div><span>VALUE EDIT</span><h2>Small budget.<br/><em>Big feeling.</em></h2></div><div className="offer-stats"><div><strong>₹100</strong><span>minimum budget</span></div><div><strong>₹2,000</strong><span>maximum budget</span></div><div><strong>3+</strong><span>rating floor</span></div></div></section><ProductRail title="The offer edit" products={deals}/></main>;
}

export function AboutPage() {
  return <main className="experience-page"><PageHero number="04" eyebrow="THE GIFTMALL IDEA" title="A gift should feel" emphasis="like you know them." description="GiftMall is a playful, human-first way to discover thoughtful gifts without endless scrolling or decision fatigue." ctaLabel="Discover the collection" ctaTo="/shop" image={products[15].image}/><section className="about-story"><div className="about-big-type">CURATED.<br/><em>PERSONAL.</em><br/>UNEXPECTED.</div><div className="about-copy"><span>WHY WE BUILT IT</span><h2>Because the best gift isn't always the most expensive one.</h2><p>Our experience is designed around the real questions people ask before gifting: who is it for, what do they care about, how much feels right, and what would make them smile?</p><p>That becomes the foundation for search, filters, recommendations and a calmer shopping experience.</p><Link className="primary-btn" to="/gift-finder">Find their gift <ArrowRight size={17}/></Link></div></section><section className="principles">{["Thought over price","Choice without overwhelm","Design that gets out of the way"].map((x,i)=><motion.div key={x} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><span>0{i+1}</span><Check size={18}/><h3>{x}</h3></motion.div>)}</section></main>;
}

export function WishlistPage() {
  const { wishlist } = useWishlist();
  const saved = products.filter(p => wishlist.includes(p.id));
  return <main className="experience-page"><PageHero number="05" eyebrow="YOUR SAVED COLLECTION" title="Keep the good" emphasis="ones close." description="Save ideas as you browse. Your shortlist stays here on this device." ctaLabel="Keep shopping" ctaTo="/shop" image={products[6].image}/><section className="saved-section"><div className="saved-header"><span>{saved.length} SAVED</span><h2>{saved.length ? "Your little collection." : "Nothing saved yet."}</h2><p>{saved.length ? "You found something worth remembering. Keep exploring and build the shortlist." : "Tap the heart on any product to start building your shortlist."}</p></div>{saved.length ? <div className="mini-product-grid">{saved.map(p=><Link className="saved-card" key={p.id} to={`/product/${p.id}`}><img src={p.image} alt={p.name}/><div><span>{p.category}</span><h3>{p.name}</h3><strong>₹{p.price.toLocaleString("en-IN")}</strong></div></Link>)}</div> : <Link className="primary-btn" to="/shop">Browse gifts <Heart size={16}/></Link>}</section></main>;
}

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, itemCount } = useCart();
  const items = cart.map(item => ({ ...item, product: products.find(p => p.id === item.productId) })).filter(x => x.product);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return <main className="experience-page"><PageHero number="06" eyebrow="YOUR GIFT BAG" title="Good choices" emphasis="belong together." description="Review your picks, adjust quantities and keep your total visible before you decide." ctaLabel="Add another gift" ctaTo="/shop" image={products[0].image}/><section className="cart-section"><div className="cart-heading"><span>{itemCount} ITEMS</span><h2>{items.length ? "Ready when you are." : "Your bag is waiting."}</h2></div>{items.length ? <div className="cart-list">{items.map(({product,quantity})=><motion.article className="cart-item" layout key={product.id}><img src={product.image} alt={product.name}/><div className="cart-item-info"><span>{product.category}</span><h3>{product.name}</h3><strong>₹{product.price.toLocaleString("en-IN")}</strong></div><div className="quantity"><button onClick={()=>updateQuantity(product.id, quantity-1)}>−</button><span>{quantity}</span><button onClick={()=>updateQuantity(product.id, quantity+1)}>+</button></div><button className="remove-item" onClick={()=>removeFromCart(product.id)}>Remove</button></motion.article>)}</div> : <Link className="primary-btn" to="/shop">Explore gifts <ArrowRight size={16}/></Link>}<div className="cart-summary"><span>Estimated total</span><strong>₹{total.toLocaleString("en-IN")}</strong><small>Demo only — no payment backend is connected.</small></div></section></main>;
}

export function ProductPage({ productId }) {
  const product = products.find(p => String(p.id) === String(productId)) || products[0];
  const { addToCart } = useCart();
  return <main className="experience-page product-detail-page"><PageHero number="07" eyebrow={product.category.toUpperCase()} title="A gift worth" emphasis="a closer look." description={product.name} ctaLabel="Back to collection" ctaTo="/shop" image={product.image}/><section className="product-detail"><div className="detail-image"><img src={product.image} alt={product.name}/></div><div className="detail-copy"><span>{product.category}</span><h2>{product.name}</h2><div className="detail-rating"><Star size={15} fill="currentColor"/> {product.rating} · {product.reviews} reviews</div><strong className="detail-price">₹{product.price.toLocaleString("en-IN")}</strong>{product.originalPrice && <del>₹{product.originalPrice.toLocaleString("en-IN")}</del>}<p>A thoughtful local-data demo product chosen for the GiftMall collection. Explore, compare and decide at your own pace.</p><button className="primary-btn" onClick={()=>addToCart(product.id)}>Add to bag <ShoppingBag size={17}/></button></div></section><ProductRail title="You might also like" products={products.filter(p=>p.category===product.category && p.id!==product.id).slice(0,3)}/></main>;
}

export function NotFoundPage() { return <main className="experience-page"><PageHero number="404" eyebrow="WRONG TURN" title="That gift" emphasis="isn't here." description="Let's take you somewhere useful instead." ctaLabel="Go shopping" ctaTo="/shop" image={products[1].image}/></main>; }
