import { motion } from "framer-motion";

// Enhanced component implementations with accessibility and sound effects
export function AnimatedTimelineYear({ year, children, delay, inView }: { year: string; children: React.ReactNode; delay: number; inView: boolean }) {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay }}
            role="region"
            aria-label={`Timeline for year ${year}`}
        >
            <div className="relative mb-6">
                <motion.div
                    className="absolute left-[21px] top-2 w-[10px] h-[10px] rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-background shadow-md"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: delay + 0.2, type: "spring", stiffness: 300 }}
                    aria-hidden="true"
                />
                <div className="ml-[50px]">
                    <h3 className="font-bold text-xl text-foreground">{year}</h3>
                </div>
            </div>
            <div className="ml-[50px] space-y-4">{children}</div>
        </motion.div>
    );
}

export function AnimatedTimelineItem({ children, delay, inView }: { children: React.ReactNode; delay: number; inView: boolean }) {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay }}
        >
            <div className="relative flex gap-3 items-start">
                <motion.div
                    className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0 mt-2.5"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: delay + 0.1, type: "spring", stiffness: 300 }}
                    aria-hidden="true"
                />
                <div className="flex flex-col space-y-3 w-full">
                    <div className="flex items-center gap-1 flex-wrap">{children}</div>
                </div>
            </div>
        </motion.div>
    );
}

export function SubTimelineItem({ children, delay, inView }: { children: React.ReactNode; delay: number; inView: boolean }) {
    return (
        <motion.div
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
            transition={{ duration: 0.5, delay }}
        >
            <motion.div
                className="w-2 h-2 rounded-full bg-background border border-orange-300 mt-1 flex-shrink-0"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.3, delay: delay + 0.1 }}
                aria-hidden="true"
            />
            <div className="flex items-center gap-1 flex-wrap -mt-1">{children}</div>
        </motion.div>
    );
}