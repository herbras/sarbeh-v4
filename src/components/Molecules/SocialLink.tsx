import { motion } from "framer-motion";

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  onInteraction?: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
  [key: string]: unknown;
}

export function SocialLink({ href, children, onInteraction, ...props }: SocialLinkProps) {
  return (
    <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-1"
        href={href}
        onMouseEnter={() => onInteraction?.('hover')}
        onClick={() => onInteraction?.('click')}
        {...props}
      >
        {children}
      </a>
    </motion.div>
  );
} 