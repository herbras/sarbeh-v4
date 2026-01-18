interface OGMetaProps {
    title: string;
    description: string;
    path: string;
    image?: string;
    type?: "website" | "article";
}

export function OGMeta({
    title,
    description,
    path,
    image,
    type = "website"
}: OGMetaProps) {
    const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : process.env.PUBLIC_URL || 'https://sarbeh.com';

    const fullUrl = `${baseUrl}${path}`;
    
    // Properly encode parameters for OG image URL to avoid XML parsing errors
    const ogImageUrl = image || `${baseUrl}/og?${new URLSearchParams({
        title: title.replace(/[&<>"']/g, ''), // Remove XML special characters
        description: description.replace(/[&<>"']/g, ''), // Remove XML special characters
        path: path,
    }).toString()}`;

    // Clean meta content to prevent XML errors
    const cleanTitle = title.replace(/[&<>"']/g, (char) => {
        const entities: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return entities[char] || char;
    });

    const cleanDescription = description.replace(/[&<>"']/g, (char) => {
        const entities: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return entities[char] || char;
    });

    return (
        <>
            <title>{cleanTitle}</title>
            <meta name="description" content={cleanDescription} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={cleanTitle} />
            <meta property="og:description" content={cleanDescription} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="sarbeh" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={cleanTitle} />
            <meta name="twitter:description" content={cleanDescription} />
            <meta name="twitter:image" content={ogImageUrl} />

            {/* Additional meta for AEO */}
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="author" content="Ibrahim Nurul Huda (sarbeh)" />
            <meta name="publisher" content="sarbeh" />
            <meta name="language" content="en" />
            <meta name="revisit-after" content="7 days" />
            <meta name="theme-color" content="#f97316" />
            
            {/* Enhanced meta for AI parsing */}
            <meta name="keywords" content="Ibrahim Nurul Huda, sarbeh, web development, AI, machine learning, Islamic technology, software engineer, React, JavaScript, full-stack developer" />
            <meta name="subject" content="Web Development and Technology" />
            <meta name="coverage" content="Worldwide" />
            <meta name="distribution" content="Global" />
            <meta name="rating" content="General" />
            
            {/* Article specific meta for blog posts */}
            {type === "article" && (
                <>
                    <meta name="article:author" content="Ibrahim Nurul Huda" />
                    <meta name="article:publisher" content="https://sarbeh.com" />
                    <meta name="article:section" content="Technology" />
                    <meta name="article:tag" content="web development, technology, AI, programming" />
                </>
            )}
            
            {/* AI-friendly meta tags */}
            <meta name="speakable" content="true" />
            <meta name="citation_author" content="Ibrahim Nurul Huda" />
            <meta name="citation_title" content={cleanTitle} />
            <meta name="citation_publication_date" content={new Date().toISOString().split('T')[0]} />
            
            {/* Canonical URL */}
            <link rel="canonical" href={fullUrl} />
        </>
    );
} 