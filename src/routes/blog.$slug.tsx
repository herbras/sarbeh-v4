import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router";
import { fetchRSSFeed, findPostBySlug, type BlogPost } from "@/utils/rss-parser";
import { OGMeta } from "@/components/OGMeta";
import { StructuredData, createArticleSchema, createBreadcrumbSchema } from "@/components/StructuredData";
import { playSound } from "@/stores/app";
import { useEffect, useRef, useState } from "react";

const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-card rounded-lg p-6 border border-border hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => {
                playSound('click');
                window.open(post.link, '_blank');
            }}
            onMouseEnter={() => playSound('hover')}
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-foreground hover:text-orange-500 transition-colors line-clamp-2">
                    {post.title}
                </h3>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                    {post.formattedDate}
                </span>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {post.description}
            </p>
            <div className="flex items-center text-orange-500 text-sm font-medium">
                <span>Baca artikel</span>
            </div>
        </motion.article>
    );
};

export default function BlogSlug() {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const redirectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const [heroRef, heroInView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    const [suggestionsRef, suggestionsInView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    // Fetch blog data on component mount
    useEffect(() => {
        async function loadBlogData() {
            if (!slug) {
                setError("Slug parameter is required");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const rssData = await fetchRSSFeed();
                const foundPost = findPostBySlug(rssData.items, slug);

                if (!foundPost) {
                    setError("Blog post not found");
                    setLoading(false);
                    return;
                }

                setPost(foundPost);
                setAllPosts(rssData.items.slice(0, 5));
                setLoading(false);
            } catch (err) {
                setError("Failed to load blog data");
                setLoading(false);
            }
        }

        loadBlogData();
    }, [slug]);

      // Auto redirect after 5 seconds (only after data is loaded)
  useEffect(() => {
    if (!post || loading) return;

    redirectTimeoutRef.current = setTimeout(() => {
      playSound('success');
      window.location.href = post.link;
    }, 5000);

    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
        redirectTimeoutRef.current = undefined;
      }
    };
  }, [post, loading]);

      const handleRedirectNow = () => {
    if (!post) return;
    
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = undefined;
    }
    playSound('click');
    window.location.href = post.link;
  };

  const handleCancelRedirect = () => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = undefined;
    }
    playSound('toggle');
  };

    // Loading state
    if (loading) {
        return (
            <div className="bg-background min-h-screen">
                <div className="container mx-auto px-4 pt-28 md:pt-36 pb-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
                            <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-2"></div>
                            <div className="h-4 bg-muted rounded w-1/3 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !post) {
        return (
            <div className="bg-background min-h-screen">
                <div className="container mx-auto px-4 pt-28 md:pt-36 pb-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-serif font-medium mb-6 text-foreground">
                            {error === "Blog post not found" ? "Artikel Tidak Ditemukan" : "Terjadi Kesalahan"}
                        </h1>
                        <p className="text-muted-foreground text-lg mb-8">
                            {error === "Blog post not found"
                                ? "Artikel yang Anda cari tidak dapat ditemukan."
                                : "Gagal memuat data artikel. Silakan coba lagi nanti."
                            }
                        </p>
                        <motion.a
                            href="/writing"
                            onClick={() => playSound('click')}
                            onMouseEnter={() => playSound('hover')}
                            className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ← Kembali ke Writing
                        </motion.a>
                    </div>
                </div>
            </div>
        );
    }

    const truncatedDescription = post.description.length > 150 
        ? `${post.description.substring(0, 147)}...` 
        : post.description;

    const searchParams = new URLSearchParams({
        title: post.title,
        description: truncatedDescription,
    });
    const ogUrl = `/og?${searchParams.toString()}`;

    return (
        <>
            {post && (
                <>
                    <OGMeta
                        title={post.title}
                        description={post.description.length > 150 
                            ? `${post.description.substring(0, 147)}...` 
                            : post.description}
                        path={`/blog/${slug}`}
                        type="article"
                    />
                    <StructuredData data={[
                        createArticleSchema(
                            post.title,
                            post.description,
                            `https://sarbeh.com/blog/${slug}`,
                            post.pubDate,
                            post.pubDate,
                            ogUrl,
                            ["technology", "web development", "programming", "AI", "Islamic technology"]
                        ),
                        createBreadcrumbSchema([
                            { name: "Home", url: "https://sarbeh.com" },
                            { name: "Writing", url: "https://sarbeh.com/writing" },
                            { name: post.title, url: `https://sarbeh.com/blog/${slug}` }
                        ])
                    ]} />
                </>
            )}
            
            <div className="bg-background min-h-screen">
                <div className="container mx-auto px-4 pt-28 md:pt-36 pb-24">
                    {/* Hero Section */}
                    <motion.div
                        ref={heroRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <h1 className="text-3xl md:text-5xl font-serif font-medium mb-6 text-foreground leading-tight">
                                {post.title}
                            </h1>
                            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                                {post.description}
                            </p>
                            <div className="text-sm text-muted-foreground">
                                Dipublikasikan pada {post.formattedDate}
                            </div>
                        </motion.div>

                        {/* Redirect Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 mb-8"
                        >
                            <div className="flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-orange-600 dark:text-orange-400 font-medium">
                                    Mengalihkan ke blog utama...
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Anda akan dialihkan ke artikel lengkap di blog.sarbeh.com dalam 5 detik
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <motion.button
                                    onClick={handleRedirectNow}
                                    onMouseEnter={() => playSound('hover')}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Baca Sekarang
                                </motion.button>

                                <motion.button
                                    onClick={handleCancelRedirect}
                                    onMouseEnter={() => playSound('hover')}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Batalkan Redirect
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Recent Posts Suggestions */}
                    <motion.div
                        ref={suggestionsRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={suggestionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl mx-auto"
                    >
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={suggestionsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-2xl md:text-3xl font-serif font-medium mb-8 text-center"
                        >
                            Artikel Terbaru Lainnya
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {allPosts.filter(p => p.slug !== post.slug).slice(0, 4).map((blogPost, index) => (
                                <BlogPostCard key={blogPost.guid} post={blogPost} index={index} />
                            ))}
                        </div>

                        {/* View All Blog Link */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={suggestionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="text-center mt-12"
                        >
                            <motion.a
                                href="https://blog.sarbeh.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => playSound('click')}
                                onMouseEnter={() => playSound('hover')}
                                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Kunjungi Blog Utama
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Floating Elements */}
                    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                        <motion.div
                            className="absolute top-32 left-16 w-2 h-2 bg-orange-500/20 rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-40 right-20 w-1 h-1 bg-orange-500/30 rounded-full"
                            animate={{
                                y: [0, -15, 0],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

// Meta export for React Router
export function meta({ params }: { params: { slug: string } }) {
    return [
        { title: `${params.slug} | Sarbeh Blog` },
        { 
            name: "description", 
            content: "Read this blog post from sarbeh's collection of thoughts and insights on technology and life." 
        },
    ];
}