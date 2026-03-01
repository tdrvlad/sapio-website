"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ICONS = [
    <svg key="agents" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>,
    <svg key="vision" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>,
    <svg key="automation" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>,
    <svg key="integration" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>,
    <svg key="semantic" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>,
];

export default function AIProductsSection() {
    const { t } = useLanguage();
    const products = t("aiProducts.products") as unknown as { title: string; description: string }[];

    return (
        <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12 sm:py-20">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-12 text-center"
            >
                {t("aiProducts.title")}
            </motion.h2>

            <div className="space-y-6">
                {/* First Row - 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.slice(0, 3).map((product, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="rounded-xl border border-black/10 dark:border-white/10 p-6 bg-white/50 dark:bg-white/5 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="h-12 w-12 rounded-lg bg-foreground/10 flex items-center justify-center flex-shrink-0 text-foreground">
                                    {ICONS[i]}
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold leading-tight">{product.title}</h3>
                            </div>
                            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                                {product.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Second Row - 2 Cards Centered */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="hidden md:block" />
                    {products.slice(3, 5).map((product, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="md:col-span-2 rounded-xl border border-black/10 dark:border-white/10 p-6 bg-white/50 dark:bg-white/5 hover:shadow-xl transition duration-300"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="h-12 w-12 rounded-lg bg-foreground/10 flex items-center justify-center flex-shrink-0 text-foreground">
                                    {ICONS[3 + i]}
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold leading-tight">{product.title}</h3>
                            </div>
                            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                                {product.description}
                            </p>
                        </motion.div>
                    ))}
                    <div className="hidden md:block" />
                </div>
            </div>
        </section>
    );
}
