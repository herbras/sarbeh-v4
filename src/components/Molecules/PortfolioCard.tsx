import { motion } from "framer-motion";
import { ExternalLink, Lock, Blocks, Brain, Code, Gamepad2, Landmark, Wrench } from "lucide-react";
import type { Portfolio, PortfolioCategory } from "@/lib/portfolioData";

interface PortfolioCardProps extends Portfolio {
    onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
    index: number;
}

const categoryConfig: Record<PortfolioCategory, { icon: typeof Blocks; color: string; label: string; gradient: string }> = {
    web3: { icon: Blocks, color: "bg-purple-500/90", label: "Web3", gradient: "from-purple-950 via-purple-900 to-violet-950" },
    ai: { icon: Brain, color: "bg-blue-500/90", label: "AI", gradient: "from-blue-950 via-indigo-900 to-slate-950" },
    islamic: { icon: Landmark, color: "bg-emerald-500/90", label: "Islamic", gradient: "from-emerald-950 via-teal-900 to-slate-950" },
    web: { icon: Code, color: "bg-cyan-500/90", label: "Web", gradient: "from-cyan-950 via-sky-900 to-slate-950" },
    tools: { icon: Wrench, color: "bg-amber-500/90", label: "Tools", gradient: "from-amber-950 via-orange-900 to-stone-950" },
    game: { icon: Gamepad2, color: "bg-pink-500/90", label: "Game", gradient: "from-pink-950 via-rose-900 to-slate-950" },
};

// Check if image is from external placeholder sources (not real screenshots)
const isExternalPlaceholder = (src: string): boolean => {
    const placeholderDomains = ['unsplash.com', 'images.unsplash.com', 'placeholder.com', 'picsum.photos', 'via.placeholder'];
    return placeholderDomains.some(domain => src.includes(domain));
};

// Aesthetic placeholder component for private/placeholder projects
function AestheticPlaceholder({
    title,
    category,
    CategoryIcon
}: {
    title: string;
    category: PortfolioCategory;
    CategoryIcon: typeof Blocks;
}) {
    const { gradient } = categoryConfig[category];

    return (
        <div className={`relative w-full h-full bg-gradient-to-br ${gradient} overflow-hidden`}>
            {/* Subtle noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Subtle gradient orbs */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 mb-3">
                    <CategoryIcon className="w-8 h-8 text-white/60" />
                </div>
                <span className="text-white/40 text-xs font-medium tracking-widest uppercase">
                    Private Project
                </span>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
    );
}

export function PortfolioCard({
    title,
    description,
    productUrl,
    tags,
    imageSrc,
    imageAlt,
    isPrivate,
    category,
    onInteraction,
    index
}: PortfolioCardProps) {
    const { icon: CategoryIcon, color: categoryColor, label: categoryLabel } = categoryConfig[category];
    return (
        <motion.article
            className="group bg-card rounded-xl overflow-hidden shadow-lg border border-muted hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-orange-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            onMouseEnter={() => onInteraction('hover')}
            tabIndex={0}
            role="article"
            aria-labelledby={`portfolio-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
            {/* Image Container */}
            <div className="relative h-48 md:h-56 overflow-hidden bg-secondary">
                {/* Use aesthetic placeholder for private projects with external placeholder images */}
                {isPrivate && isExternalPlaceholder(imageSrc) ? (
                    <AestheticPlaceholder
                        title={title}
                        category={category}
                        CategoryIcon={CategoryIcon}
                    />
                ) : (
                    <img
                        src={typeof imageSrc === 'string' ? imageSrc : imageSrc}
                        alt={imageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    {/* Category Badge */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm text-white flex items-center gap-1 ${categoryColor}`}>
                        <CategoryIcon className="w-3 h-3" />
                        {categoryLabel}
                    </span>

                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        isPrivate
                            ? "bg-orange-500/90 text-white"
                            : "bg-green-500/90 text-white"
                    }`}>
                        {isPrivate ? (
                            <span className="flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                Private
                            </span>
                        ) : "Public"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3
                    id={`portfolio-${title.replace(/\s+/g, '-').toLowerCase()}`}
                    className="text-xl font-bold text-foreground mb-2 line-clamp-1"
                >
                    {title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4" role="list" aria-label="Technologies used">
                    {tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 bg-secondary text-foreground/80 rounded text-xs"
                            role="listitem"
                        >
                            {tag}
                        </span>
                    ))}
                    {tags.length > 4 && (
                        <span className="px-2 py-0.5 bg-secondary text-muted-foreground rounded text-xs">
                            +{tags.length - 4}
                        </span>
                    )}
                </div>

                {/* Action Button */}
                {!isPrivate && productUrl !== "#" ? (
                    <a
                        href={productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                        onClick={() => onInteraction('click')}
                    >
                        Visit Project
                        <ExternalLink className="w-4 h-4" />
                    </a>
                ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium cursor-not-allowed">
                        <Lock className="w-4 h-4" />
                        Private Project
                    </span>
                )}
            </div>
        </motion.article>
    );
}
