interface PersonSchema {
    "@type": "Person";
    name: string;
    alternateName?: string;
    url: string;
    image?: string;
    jobTitle: string;
    worksFor?: {
        "@type": "Organization";
        name: string;
        url?: string;
    };
    address?: {
        "@type": "PostalAddress";
        addressLocality: string;
        addressRegion: string;
        addressCountry: string;
    };
    alumniOf?: string;
    knowsAbout?: string[];
    sameAs?: string[];
}

interface OrganizationSchema {
    "@type": "Organization";
    name: string;
    url: string;
    logo?: string;
    description?: string;
    founder?: {
        "@type": "Person";
        name: string;
    };
    foundingDate?: string;
    address?: {
        "@type": "PostalAddress";
        addressLocality: string;
        addressRegion: string;
        addressCountry: string;
    };
    sameAs?: string[];
}

interface WebsiteSchema {
    "@type": "WebSite";
    name: string;
    url: string;
    description?: string;
    author?: {
        "@type": "Person";
        name: string;
    };
    potentialAction?: {
        "@type": "SearchAction";
        target: {
            "@type": "EntryPoint";
            urlTemplate: string;
        };
        "query-input": string;
    };
}

interface ArticleSchema {
    "@type": "Article" | "BlogPosting";
    headline: string;
    description: string;
    author: {
        "@type": "Person";
        name: string;
        url?: string;
    };
    publisher: {
        "@type": "Organization";
        name: string;
        logo?: {
            "@type": "ImageObject";
            url: string;
        };
    };
    datePublished: string;
    dateModified?: string;
    url: string;
    image?: string;
    articleSection?: string;
    keywords?: string[];
}

interface FAQSchema {
    "@type": "FAQPage";
    mainEntity: Array<{
        "@type": "Question";
        name: string;
        acceptedAnswer: {
            "@type": "Answer";
            text: string;
        };
    }>;
}

interface BreadcrumbSchema {
    "@type": "BreadcrumbList";
    itemListElement: Array<{
        "@type": "ListItem";
        position: number;
        name: string;
        item: string;
    }>;
}

type StructuredDataType = 
    | PersonSchema 
    | OrganizationSchema 
    | WebsiteSchema 
    | ArticleSchema 
    | FAQSchema
    | BreadcrumbSchema;

interface StructuredDataProps {
    data: StructuredDataType | StructuredDataType[];
}

export function StructuredData({ data }: StructuredDataProps) {
    const structuredData = {
        "@context": "https://schema.org",
        ...(Array.isArray(data) ? { "@graph": data } : data)
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData, null, 2)
            }}
        />
    );
}

export const createPersonSchema = (): PersonSchema => ({
    "@type": "Person",
    name: "Ibrahim Nurul Huda",
    alternateName: "sarbeh",
    url: "https://sarbeh.com",
    image: "https://sarbeh.com/og?title=Ibrahim%20Nurul%20Huda%20(sarbeh)&description=Founder%20%40%20PT%20Cahaya%20Petunjuk%20Inovasi",
    jobTitle: "Software Engineer & Founder",
    worksFor: {
        "@type": "Organization",
        name: "PT Cahaya Petunjuk Inovasi",
        url: "https://sarbeh.com"
    },
    address: {
        "@type": "PostalAddress",
        addressLocality: "Tangerang",
        addressRegion: "Banten",
        addressCountry: "Indonesia"
    },
    knowsAbout: [
        "Web Development",
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "SEO",
        "Performance Optimization",
        "AI/ML Integration",
        "Islamic Finance Technology",
        "SaaS Development"
    ],
    sameAs: [
        "https://twitter.com/sarbeh",
        "https://linkedin.com/in/sarbeh",
        "https://github.com/sarbeh"
    ]
});

export const createOrganizationSchema = (): OrganizationSchema => ({
    "@type": "Organization",
    name: "PT Cahaya Petunjuk Inovasi",
    url: "https://sarbeh.com",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQH6PGuwSYXCMg/company-logo_100_100/company-logo_100_100/0/1727244027403?e=1754524800&v=beta&t=mk5VeV57OCLzMeCOCxgkuKBdn0NNKLApzyu9jUCKIr4",
    description: "AI SaaS platform bridging technology with Islamic principles, specializing in intelligent solutions for modern Islamic finance and education.",
    founder: {
        "@type": "Person",
        name: "Ibrahim Nurul Huda"
    },
    foundingDate: "2024-01-01",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Tangerang",
        addressRegion: "Banten",
        addressCountry: "Indonesia"
    }
});

export const createWebsiteSchema = (): WebsiteSchema => ({
    "@type": "WebSite",
    name: "sarbeh - Personal Website & Blog",
    url: "https://sarbeh.com",
    description: "Personal website showcasing work, writing, and thoughts on technology, web development, and Islamic AI solutions.",
    author: {
        "@type": "Person",
        name: "Ibrahim Nurul Huda"
    },
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: "https://sarbeh.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
});

export const createFAQSchema = (): FAQSchema => ({
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What does Ibrahim Nurul Huda (sarbeh) specialize in?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ibrahim specializes in full-stack web development, AI/ML integration, SEO optimization, and building SaaS platforms. He particularly focuses on creating technology solutions that align with Islamic principles, including Islamic finance technology and educational platforms."
            }
        },
        {
            "@type": "Question",
            name: "What is Bantu AI?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Bantu AI is an AI SaaS platform with 50+ models that bridges technology with Islamic principles. It includes features like Islamic inheritance calculator (Kalkulator Waris Syafi'i), RAG Library for fiqh knowledge, and specialized search for Islamic references."
            }
        },
        {
            "@type": "Question",
            name: "What technologies does sarbeh work with?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ibrahim works with modern web technologies including React, Node.js, Python, JavaScript/TypeScript, Astro.js, Svelte, Vue.js, and various AI/ML frameworks. He also specializes in performance optimization, SEO, and serverless architectures."
            }
        },
        {
            "@type": "Question",
            name: "How can I contact Ibrahim Nurul Huda for work?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can contact Ibrahim through his website contact form at sarbeh.com, or connect with him on LinkedIn and Twitter. He's available for consulting, contract development, and collaboration on innovative projects."
            }
        },
        {
            "@type": "Question",
            name: "What makes sarbeh's approach to development unique?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ibrahim focuses on understanding the 'why' behind every feature, ships quickly while measuring and adjusting, prioritizes real users over tech trends, and builds technology with purpose that genuinely helps people, especially in Islamic finance and education sectors."
            }
        }
    ]
});

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>): BreadcrumbSchema => ({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
    }))
});

export const createArticleSchema = (
    title: string,
    description: string,
    url: string,
    publishedDate: string,
    modifiedDate?: string,
    image?: string,
    keywords?: string[]
): ArticleSchema => ({
    "@type": "BlogPosting",
    headline: title,
    description: description,
    author: {
        "@type": "Person",
        name: "Ibrahim Nurul Huda",
        url: "https://sarbeh.com"
    },
    publisher: {
        "@type": "Organization",
        name: "sarbeh",
        logo: {
            "@type": "ImageObject",
            url: "https://sarbeh.com/logo.png"
        }
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    url: url,
    image: image,
    articleSection: "Technology",
    keywords: keywords || ["web development", "technology", "AI", "Islamic technology"]
});