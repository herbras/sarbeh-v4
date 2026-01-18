import { motion } from "framer-motion";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
}

export function ArticleCard({ title, excerpt, date, readTime, onInteraction }: ArticleCardProps) {
  return (
    <motion.article
      className="bg-card rounded-lg p-6 border border-border hover:border-orange-500/30 transition-all duration-300 cursor-pointer group"
      whileHover={{ y: -2, scale: 1.005 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => onInteraction('hover')}
      onClick={() => onInteraction('click')}
      tabIndex={0}
      role="article"
      aria-labelledby={`article-${title.replace(/\s+/g, '-').toLowerCase()}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInteraction('click');
        }
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 
            id={`article-${title.replace(/\s+/g, '-').toLowerCase()}`} 
            className="text-lg font-semibold text-foreground group-hover:text-orange-500 transition-colors mb-3 line-clamp-2"
          >
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {excerpt}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            {date}
          </span>
          <div className="flex items-center text-orange-500 text-xs font-medium group-hover:text-orange-600 transition-colors">
            <span>{readTime}</span>
            <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.article>
  );
} 