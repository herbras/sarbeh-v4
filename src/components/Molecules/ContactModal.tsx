import { useState } from "react";
import { motion } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

export function ContactModal({ isOpen, onClose, onInteraction, modalRef }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    onInteraction('success');
    alert("Thanks for reaching out! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <motion.div
        ref={modalRef}
        className="bg-white rounded-lg p-8 shadow-2xl max-w-md w-full mx-4 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
          aria-label="Close contact form"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 id="contact-modal-title" className="text-2xl font-bold text-foreground mb-6">Get in touch</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">Name</label>
            <input
              id="contact-name"
              type="text"
              required
              className="w-full px-3 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              aria-describedby="name-error"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              id="contact-email"
              type="email"
              required
              className="w-full px-3 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              aria-describedby="email-error"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">Message</label>
            <textarea
              id="contact-message"
              required
              rows={4}
              className="w-full px-3 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              aria-describedby="message-error"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onInteraction('click')}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
} 