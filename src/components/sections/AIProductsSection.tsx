"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ICONS = [
  <svg key="agents" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>,
  <svg key="vision" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>,
  <svg key="automation" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>,
  <svg key="integration" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>,
  <svg key="semantic" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>,
];

function ProductCard({
  product,
  icon,
  index,
}: {
  product: { title: string; description: string };
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-border bg-card p-6 hover:border-violet-500/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary/15 transition-colors duration-200">
          {icon}
        </div>
        <h3 className="text-base sm:text-lg font-semibold leading-tight pt-1">{product.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {product.description}
      </p>
    </motion.div>
  );
}

export default function AIProductsSection() {
  const { t } = useLanguage();
  const products = t("aiProducts.products") as unknown as { title: string; description: string }[];

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-14 text-center"
      >
        {t("aiProducts.title")}
      </motion.h2>

      <div className="space-y-4">
        {/* First row — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.slice(0, 3).map((product, i) => (
            <ProductCard key={i} product={product} icon={ICONS[i]} index={i} />
          ))}
        </div>

        {/* Second row — 2 centered cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mx-[calc(100%/6)]">
          {products.slice(3, 5).map((product, i) => (
            <ProductCard key={i + 3} product={product} icon={ICONS[3 + i]} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
