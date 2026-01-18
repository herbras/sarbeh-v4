import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArticleCard } from "../Molecules/ArticleCard";
import { useEffect, useState } from "react";
import { fetchRSSFeed, type BlogPost } from "@/utils/rss-parser";

export function WritingSection({ onInteraction }: { onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void }) {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [headerRef, headerInView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    });
    
    const [postsRef, postsInView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    useEffect(() => {
        const loadBlogPosts = async () => {
            try {
                setLoading(true);
                const rssData = await fetchRSSFeed();
                setBlogPosts(rssData.items.slice(0, 6)); // Get latest 6 posts
                setError(null);
            } catch (err) {
                setError('Gagal memuat artikel blog');
                console.error('Error loading blog posts:', err);
            } finally {
                setLoading(false);
            }
        };

        loadBlogPosts();
    }, []);

    const handleArticleClick = (post: BlogPost) => {
        onInteraction('click');
        // Navigate to local blog route first, then it will redirect
        window.location.href = `/blog/${post.slug}`;
    };

    const handleArticleInteraction = (type: 'click' | 'hover' | 'success' | 'toggle', post: BlogPost) => {
        if (type === 'click') {
            handleArticleClick(post);
        } else {
            onInteraction(type);
        }
    };
    return (
        <motion.div
            className="relative mx-auto max-w-4xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="text-center py-16 md:py-24">
                {/* Header Section */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-[60px] md:text-[80px] font-serif font-medium leading-none mb-6 md:mb-8 tracking-tight gradient-text">
                        thoughts & ideas
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-12">
                        Artikel dan pemikiran seputar teknologi, pengembangan web, agama, dan kehidupan sehari-hari.
                    </p>
                </motion.div>

                {/* Content Section */}
                <motion.div
                    ref={postsRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={postsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8 mt-16 text-left"
                >
                    {loading && (
                        <div className="flex justify-center items-center py-12">
                            <motion.div
                                className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="ml-3 text-muted-foreground">Memuat artikel...</span>
                        </div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center"
                        >
                            <p className="text-red-600 dark:text-red-400">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Coba Lagi
                            </button>
                        </motion.div>
                    )}

                    {!loading && !error && blogPosts.map((post, index) => (
                        <motion.div
                            key={post.guid}
                            initial={{ opacity: 0, y: 20 }}
                            animate={postsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <ArticleCard
                                title={post.title}
                                excerpt={post.description}
                                date={post.formattedDate}
                                readTime="baca selengkapnya"
                                onInteraction={(type) => handleArticleInteraction(type, post)}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Blog Link */}
                {!loading && !error && blogPosts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={postsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-12 pt-8 border-t border-border"
                    >
                        <motion.a
                            href="https://blog.sarbeh.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => onInteraction('click')}
                            onMouseEnter={() => onInteraction('hover')}
                            className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Lihat Semua Artikel
                        </motion.a>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}