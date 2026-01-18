import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FAQItem {
    question: string;
    answer: string;
    isOpen?: boolean;
}

interface FAQSectionProps {
    onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
}

const faqData: FAQItem[] = [
    {
        question: "What does Ibrahim Nurul Huda (sarbeh) specialize in?",
        answer: "Ibrahim specializes in full-stack web development, AI/ML integration, SEO optimization, and building SaaS platforms. He particularly focuses on creating technology solutions that align with Islamic principles, including Islamic finance technology and educational platforms."
    },
    {
        question: "What is Bantu AI?",
        answer: "Bantu AI is an AI SaaS platform with 50+ models that bridges technology with Islamic principles. It includes features like Islamic inheritance calculator (Kalkulator Waris Syafi'i), RAG Library for fiqh knowledge, and specialized search for Islamic references."
    },
    {
        question: "What technologies does sarbeh work with?",
        answer: "Ibrahim works with modern web technologies including React, Node.js, Python, JavaScript/TypeScript, Astro.js, Svelte, Vue.js, and various AI/ML frameworks. He also specializes in performance optimization, SEO, and serverless architectures."
    },
    {
        question: "How can I contact Ibrahim Nurul Huda for work?",
        answer: "You can contact Ibrahim through his website contact form at sarbeh.com, or connect with him on LinkedIn and Twitter. He's available for consulting, contract development, and collaboration on innovative projects."
    },
    {
        question: "What makes sarbeh's approach to development unique?",
        answer: "Ibrahim focuses on understanding the 'why' behind every feature, ships quickly while measuring and adjusting, prioritizes real users over tech trends, and builds technology with purpose that genuinely helps people, especially in Islamic finance and education sectors."
    },
    {
        question: "What is PT Cahaya Petunjuk Inovasi?",
        answer: "PT Cahaya Petunjuk Inovasi is Ibrahim's company founded in 2024, specializing in AI SaaS platforms that bridge technology with Islamic principles. The company develops innovative solutions for modern Islamic finance, education, and technology needs."
    }
];

export function FAQSection({ onInteraction }: FAQSectionProps) {
    const [sectionRef, sectionInView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '100px'
    });

    return (
        <motion.section
            ref={sectionRef}
            className="w-full max-w-4xl mx-auto mt-24"
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
        >
            <div className="text-center mb-16">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Frequently Asked Questions
                </motion.h2>
                <motion.p
                    className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    Common questions about my work, expertise, and projects
                </motion.p>
            </div>

            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <FAQItem 
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        index={index}
                        inView={sectionInView}
                        onInteraction={onInteraction}
                    />
                ))}
            </div>
        </motion.section>
    );
}

interface FAQItemProps {
    question: string;
    answer: string;
    index: number;
    inView: boolean;
    onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
}

function FAQItem({ question, answer, index, inView, onInteraction }: FAQItemProps) {
    return (
        <motion.div
            className="bg-secondary/30 rounded-2xl border border-border/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            itemScope
            itemType="https://schema.org/Question"
        >
            <div className="p-6">
                <h3 
                    className="text-lg font-semibold text-foreground mb-4 leading-relaxed"
                    itemProp="name"
                >
                    {question}
                </h3>
                <div 
                    className="text-muted-foreground leading-relaxed"
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                >
                    <div itemProp="text">
                        {answer}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}