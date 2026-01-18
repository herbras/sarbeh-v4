import { motion } from "framer-motion";
import { useState } from "react";
import { WorkCard } from "../Molecules/WorkCard";
import { PortfolioCard } from "../Molecules/PortfolioCard";
import { portfolios, type PortfolioCategory } from "@/lib/portfolioData";
import { Blocks, Brain, Code, Gamepad2, Landmark, Wrench } from "lucide-react";

type VisibilityFilter = "all" | "public" | "private";
type CategoryFilter = "all" | PortfolioCategory;

const categoryIcons: Record<PortfolioCategory, typeof Blocks> = {
    web3: Blocks,
    ai: Brain,
    islamic: Landmark,
    web: Code,
    tools: Wrench,
    game: Gamepad2,
};

const categoryLabels: Record<PortfolioCategory, string> = {
    web3: "Web3",
    ai: "AI & ML",
    islamic: "Islamic",
    web: "Web Dev",
    tools: "Tools",
    game: "Games",
};

// Work Section Component with sound integration
export function WorkSection({ onInteraction }: { onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void }) {
    const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>("all");
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

    const filteredPortfolios = portfolios.filter((p) => {
        // Visibility filter
        if (visibilityFilter === "public" && p.isPrivate) return false;
        if (visibilityFilter === "private" && !p.isPrivate) return false;
        // Category filter
        if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
        return true;
    });

    return (
        <motion.div
            className="relative mx-auto max-w-6xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="text-center py-16 md:py-24">
                <h1 className="text-[60px] md:text-[80px] font-serif font-medium leading-none mb-6 md:mb-8 tracking-tight gradient-text">
                    my work
                </h1>
                <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-16">
                    A collection of projects, products, and experiences that showcase my journey in engineering and design.
                </p>


                {/* Packages Section */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-serif font-medium mb-8 text-left">
                        Packages & Tools
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <WorkCard
                            title="grapesjs-tailwind-iconify"
                            description="Enhanced fork of grapesjs-tailwind with Custom Components Manager and Iconify integration for visual web building."
                            tags={["GrapesJS", "Tailwind", "Iconify", "NPM"]}
                            status="v1.0.2"
                            onInteraction={onInteraction}
                        />
                        <WorkCard
                            title="salat-cli"
                            description="Interactive CLI for Islamic prayer times with smart location input and geocoding capabilities."
                            tags={["CLI", "Islamic", "Geocoding", "Node.js"]}
                            status="v1.6.9"
                            onInteraction={onInteraction}
                        />
                        <WorkCard
                            title="waris"
                            description="Islamic inheritance calculator (faraidh) and Indonesian number-to-words converter with BigInt precision."
                            tags={["Islamic Law", "Calculator", "BigInt", "Indonesia"]}
                            status="v1.0.4"
                            onInteraction={onInteraction}
                        />
                    </div>
                </div>

                {/* Portfolio Section */}
                <div className="mb-8">
                    <div className="flex flex-col gap-6 mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h2 className="text-2xl md:text-3xl font-serif font-medium text-left">
                                Projects & Portfolio
                            </h2>

                            {/* Visibility Filter */}
                            <div className="flex gap-2 flex-wrap">
                                {(["all", "public", "private"] as VisibilityFilter[]).map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => {
                                            setVisibilityFilter(f);
                                            onInteraction('click');
                                        }}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            visibilityFilter === f
                                                ? "bg-orange-500 text-white"
                                                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                        }`}
                                    >
                                        {f === "all" ? "All" : f === "public" ? "Public" : "Private"}
                                        <span className="ml-1 opacity-70">
                                            ({f === "all"
                                                ? portfolios.length
                                                : f === "public"
                                                    ? portfolios.filter(p => !p.isPrivate).length
                                                    : portfolios.filter(p => p.isPrivate).length
                                            })
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => {
                                    setCategoryFilter("all");
                                    onInteraction('click');
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                                    categoryFilter === "all"
                                        ? "bg-orange-500 text-white"
                                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                }`}
                            >
                                All Categories
                            </button>
                            {(Object.keys(categoryLabels) as PortfolioCategory[]).map((cat) => {
                                const Icon = categoryIcons[cat];
                                const count = portfolios.filter(p => p.category === cat).length;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setCategoryFilter(cat);
                                            onInteraction('click');
                                        }}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                                            categoryFilter === cat
                                                ? "bg-orange-500 text-white"
                                                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {categoryLabels[cat]}
                                        <span className="opacity-70">({count})</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <p className="text-muted-foreground text-left mb-8">
                        We don't just talk the talk. Check out some of my previous projects below.
                        <span className="ml-2 text-foreground font-medium">
                            Showing {filteredPortfolios.length} of {portfolios.length} projects
                        </span>
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPortfolios.map((portfolio, index) => (
                            <PortfolioCard
                                key={portfolio.title}
                                {...portfolio}
                                onInteraction={onInteraction}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}