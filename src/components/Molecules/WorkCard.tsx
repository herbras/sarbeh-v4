import { motion } from "framer-motion";

export function WorkCard({ title, description, tags, status, onInteraction }: {
    title: string;
    description: string;
    tags: string[];
    status: string;
    onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
}) {
    return (
        <motion.article
            className="bg-card rounded-lg p-6 shadow-lg border border-muted hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-orange-500"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => onInteraction('hover')}
            tabIndex={0}
            role="article"
            aria-labelledby={`work-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
            <div className="flex justify-between items-start mb-4">
                <h3 id={`work-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-xl font-bold text-foreground">{title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                    }`} aria-label={`Status: ${status}`}>
                    {status}
                </span>
            </div>
            <p className="text-muted-foreground mb-4">{description}</p>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                {tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-secondary text-foreground rounded-md text-sm" role="listitem">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.article>
    );
}
