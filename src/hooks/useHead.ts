import { useEffect } from 'react';
import { useHead as useUnhead } from 'unhead';
import type { HeadEntryOptions } from 'unhead';

interface UseHeadOptions {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    twitterCard?: 'summary' | 'summary_large_image';
    canonical?: string;
    noindex?: boolean;
    keywords?: string;
}

export function useHead(options: UseHeadOptions) {
    const {
        title,
        description,
        ogTitle,
        ogDescription,
        ogImage,
        ogType = 'website',
        twitterCard = 'summary_large_image',
        canonical,
        noindex = false,
        keywords
    } = options;

    const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : process.env.PUBLIC_URL || 'https://sarbeh.com';

    const fullCanonical = canonical ? `${baseUrl}${canonical}` : undefined;
    
    // Clean text for meta tags to prevent XML parsing errors
    const cleanText = (text: string) => text.replace(/[&<>"']/g, (char) => {
        const entities: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return entities[char] || char;
    });

    const cleanTitle = title ? cleanText(title) : undefined;
    const cleanDescription = description ? cleanText(description) : undefined;
    const cleanOgTitle = ogTitle ? cleanText(ogTitle) : cleanTitle;
    const cleanOgDescription = ogDescription ? cleanText(ogDescription) : cleanDescription;

    // Generate OG image URL if not provided
    const ogImageUrl = ogImage || (title && description ? 
        `${baseUrl}/og?${new URLSearchParams({
            title: title.replace(/[&<>"']/g, ''),
            description: description.replace(/[&<>"']/g, ''),
            path: canonical || '',
        }).toString()}` : undefined
    );

    useUnhead({
        title: cleanTitle,
        meta: [
            // Basic meta tags
            ...(cleanDescription ? [{ name: 'description', content: cleanDescription }] : []),
            ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
            ...(noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : [{ name: 'robots', content: 'index, follow' }]),
            { name: 'author', content: 'sarbeh' },
            
            // Open Graph
            { property: 'og:type', content: ogType },
            ...(fullCanonical ? [{ property: 'og:url', content: fullCanonical }] : []),
            ...(cleanOgTitle ? [{ property: 'og:title', content: cleanOgTitle }] : []),
            ...(cleanOgDescription ? [{ property: 'og:description', content: cleanOgDescription }] : []),
            ...(ogImageUrl ? [
                { property: 'og:image', content: ogImageUrl },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' }
            ] : []),
            { property: 'og:site_name', content: 'sarbeh' },
            
            // Twitter Card
            { name: 'twitter:card', content: twitterCard },
            ...(fullCanonical ? [{ name: 'twitter:url', content: fullCanonical }] : []),
            ...(cleanOgTitle ? [{ name: 'twitter:title', content: cleanOgTitle }] : []),
            ...(cleanOgDescription ? [{ name: 'twitter:description', content: cleanOgDescription }] : []),
            ...(ogImageUrl ? [{ name: 'twitter:image', content: ogImageUrl }] : []),
        ].filter(Boolean),
        
        link: [
            ...(fullCanonical ? [{ rel: 'canonical', href: fullCanonical }] : []),
        ].filter(Boolean),
    });
}

// Export the hook for page-specific usage
export default useHead; 