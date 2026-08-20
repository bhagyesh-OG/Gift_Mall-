import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PageHero({ eyebrow, number, title, emphasis, description, ctaLabel, ctaTo = "/shop", image }) {
  return (
    <section className="inner-hero">
      <div className="inner-hero-grid" />
      <div className="inner-hero-glow" />
      <div className="inner-hero-copy">
        <motion.div className="inner-hero-meta" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <span>{number}</span><span>{eyebrow}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 35, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: .9, ease: [.16, 1, .3, 1] }}>
          {title}<br /><em>{emphasis}</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}>{description}</motion.p>
        <div className="inner-hero-actions">
          {ctaLabel && <a className="primary-btn" href={ctaTo}>{ctaLabel} <ArrowRight size={17} /></a>}
          <span className="hero-scroll"><ArrowDown size={15} /> Scroll to explore</span>
        </div>
      </div>
      {image && <motion.div className="inner-hero-image" initial={{ opacity: 0, scale: .9, x: 35 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: .2 }}><img src={image} alt="" /></motion.div>}
    </section>
  );
}
