import { motion } from "framer-motion";

interface CompanyBadgeProps {
  name: string;
  logo: string;
  bgColor: string;
  borderColor: string;
  href?: string;
  small?: boolean;
  onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
}

export function CompanyBadge({
  name,
  logo,
  bgColor,
  borderColor,
  href,
  small = false,
  onInteraction,
}: CompanyBadgeProps) {
  const content = (
    <motion.div
      className={`inline-flex items-center ${small ? "gap-1.5" : "sm:gap-2 gap-1"} rounded-full ${
        small ? "px-2.5 py-0.5" : "sm:px-3 px-2 sm:py-1 py-0.5"
      } border ${small ? "mx-1" : "sm:mx-1 mx-0.5"} min-w-0 focus:outline-none focus:ring-2 focus:ring-orange-500`}
      style={{ backgroundColor: bgColor, borderColor }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onMouseEnter={() => onInteraction('hover')}
      tabIndex={href ? 0 : -1}
      role={href ? "link" : "presentation"}
    >
      <img
        alt={`${name} logo`}
        className={`${small ? "h-3.5 w-3.5" : "h-4 w-4"} object-contain`}
        src={logo}
        width={small ? "14" : "16"}
        height={small ? "14" : "16"}
        style={{ width: small ? "14px" : "16px", height: small ? "14px" : "16px" }}
      />
      <span className={`font-medium text-gray-900 ${small ? "text-xs" : "text-sm"} truncate max-w-[80px] sm:max-w-none`}>
        {name}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onInteraction('click')}
        aria-label={`Visit ${name} website`}
      >
        {content}
      </a>
    );
  }

  return content;
} 