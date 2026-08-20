import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";

const steps = [
  { key: "recipient", title: "Who are you gifting?", subtitle: "Start with the person, not the product.", options: [["partner", "Partner"], ["friend", "Friend"], ["parent", "Parent"], ["sibling", "Sibling"]] },
  { key: "occasion", title: "What's the moment?", subtitle: "A gift feels better when it fits the occasion.", options: [["birthday", "Birthday"], ["anniversary", "Anniversary"], ["graduation", "Graduation"]] },
  { key: "interest", title: "What do they love?", subtitle: "Pick the interest that sounds most like them.", options: [["technology", "Technology"], ["music", "Music"], ["books", "Books"], ["home", "Home & decor"], ["fashion", "Fashion"], ["self-care", "Self-care"], ["art", "Art & creativity"], ["travel", "Travel"]] },
  { key: "budget", title: "What feels right to spend?", subtitle: "There is no wrong budget — only the right feeling.", options: [["under-500", "Under ₹500"], ["500-1000", "₹500–₹1,000"], ["1000-1500", "₹1,000–₹1,500"], ["1500-plus", "₹1,500+"]] },
];

function scoreProduct(product, answers) {
  let score = product.rating + product.popularity / 20;
  if (answers.recipient && product.suitableFor.includes(answers.recipient)) score += 6;
  if (answers.occasion && product.occasions.includes(answers.occasion)) score += 5;
  if (answers.interest && product.interests.includes(answers.interest)) score += 6;
  if (answers.budget === "under-500" && product.price < 500) score += 5;
  if (answers.budget === "500-1000" && product.price >= 500 && product.price <= 1000) score += 5;
  if (answers.budget === "1000-1500" && product.price > 1000 && product.price <= 1500) score += 5;
  if (answers.budget === "1500-plus" && product.price > 1500) score += 5;
  return score;
}

export default function GiftFinderFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const { addToCart } = useCart();
  const current = steps[step];
  const results = useMemo(() => products.map(product => ({ product, score: scoreProduct(product, answers) })).sort((a, b) => b.score - a.score).slice(0, 6).map(item => item.product), [answers]);
  const finished = step === steps.length;

  const choose = (value) => {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    setStep(step + 1);
  };

  const reset = () => { setAnswers({}); setStep(0); };

  if (finished) return (
    <main className="finder-flow-page">
      <section className="finder-results-hero">
        <span className="section-kicker"><Sparkles size={14} /> YOUR GIFTMALL MATCH</span>
        <h1>We found gifts that<br /><em>feel like them.</em></h1>
        <p>Your shortlist is ranked from the choices you made. Nothing here is random.</p>
        <div className="finder-answer-strip">{steps.map(item => <span key={item.key}><b>{item.title}</b>{item.options.find(([value]) => value === answers[item.key])?.[1]}</span>)}</div>
      </section>
      <section className="finder-results-grid">
        {results.map((product, index) => <motion.article className="finder-result-card" key={product.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .07 }}>
          <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link>
          <div><span>#{String(index + 1).padStart(2, "0")} MATCH · {product.category}</span><h2>{product.name}</h2><p>{product.rating} ★ · {product.reviews} reviews</p><strong>₹{product.price.toLocaleString("en-IN")}</strong><button onClick={() => addToCart(product.id)}>Add to bag <ArrowRight size={14} /></button></div>
        </motion.article>)}
      </section>
      <div className="finder-result-actions"><button className="secondary-btn" onClick={reset}><ArrowLeft size={16} /> Start over</button><Link className="primary-btn" to="/shop">Explore all gifts <ArrowRight size={16} /></Link></div>
    </main>
  );

  return (
    <main className="finder-flow-page">
      <section className="finder-flow-hero">
        <div className="finder-flow-grid" />
        <div className="finder-flow-copy">
          <span className="section-kicker"><Sparkles size={14} /> GIFTMALL GIFT FINDER</span>
          <div className="finder-step-count">0{step + 1} / 04</div>
          <h1>{current.title}<br /><em>We'll narrow it down.</em></h1>
          <p>{current.subtitle}</p>
        </div>
      </section>
      <section className="finder-question-panel">
        <div className="finder-progress"><div><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div><small>{Math.round(((step + 1) / steps.length) * 100)}% complete</small></div>
        <div className="finder-option-grid">{current.options.map(([value, label]) => <motion.button key={value} whileHover={{ y: -5 }} whileTap={{ scale: .98 }} onClick={() => choose(value)}><span>{label}</span><ArrowRight size={17} /></motion.button>)}</div>
        {step > 0 && <button className="finder-previous" onClick={() => setStep(step - 1)}><ArrowLeft size={15} /> Previous question</button>}
      </section>
    </main>
  );
}
