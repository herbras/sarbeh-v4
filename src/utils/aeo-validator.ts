// AEO Validation Utilities
// Tools untuk memvalidasi implementasi AEO secara programmatic

interface StructuredDataTest {
    valid: boolean;
    errors: string[];
    warnings: string[];
    schemas: string[];
}

interface MetaTagTest {
    hasRequiredTags: boolean;
    missingTags: string[];
    aiOptimized: boolean;
}

interface AEOTestResult {
    structuredData: StructuredDataTest;
    metaTags: MetaTagTest;
    faqContent: boolean;
    entityMarkup: boolean;
    breadcrumbs: boolean;
    overallScore: number;
}

/**
 * Validates structured data on current page
 */
export function validateStructuredData(): StructuredDataTest {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    const result: StructuredDataTest = {
        valid: true,
        errors: [],
        warnings: [],
        schemas: []
    };

    if (jsonLdScripts.length === 0) {
        result.valid = false;
        result.errors.push('No JSON-LD structured data found');
        return result;
    }

    jsonLdScripts.forEach((script, index) => {
        try {
            const data = JSON.parse(script.textContent || '');
            
            // Check for @context
            if (!data['@context'] || !data['@context'].includes('schema.org')) {
                result.warnings.push(`Schema ${index + 1}: Missing or invalid @context`);
            }

            // Extract schema types
            if (Array.isArray(data)) {
                data.forEach(item => {
                    if (item['@type']) result.schemas.push(item['@type']);
                });
            } else if (data['@graph']) {
                data['@graph'].forEach((item: any) => {
                    if (item['@type']) result.schemas.push(item['@type']);
                });
            } else if (data['@type']) {
                result.schemas.push(data['@type']);
            }

        } catch (error) {
            result.valid = false;
            result.errors.push(`Schema ${index + 1}: Invalid JSON syntax`);
        }
    });

    return result;
}

/**
 * Validates meta tags for AEO optimization
 */
export function validateMetaTags(): MetaTagTest {
    const requiredTags = [
        'title',
        'description',
        'og:title',
        'og:description',
        'og:type',
        'og:url',
        'og:image',
        'twitter:card',
        'author',
        'canonical'
    ];

    const aeoOptimizedTags = [
        'robots',
        'speakable',
        'citation_author',
        'citation_title',
        'keywords',
        'subject'
    ];

    const result: MetaTagTest = {
        hasRequiredTags: true,
        missingTags: [],
        aiOptimized: true
    };

    // Check required meta tags
    requiredTags.forEach(tag => {
        let exists = false;
        
        if (tag === 'title') {
            exists = !!document.querySelector('title');
        } else if (tag === 'canonical') {
            exists = !!document.querySelector('link[rel="canonical"]');
        } else if (tag.startsWith('og:')) {
            exists = !!document.querySelector(`meta[property="${tag}"]`);
        } else {
            exists = !!document.querySelector(`meta[name="${tag}"]`);
        }

        if (!exists) {
            result.hasRequiredTags = false;
            result.missingTags.push(tag);
        }
    });

    // Check AEO optimized tags
    const missingAeoTags = aeoOptimizedTags.filter(tag => {
        return !document.querySelector(`meta[name="${tag}"]`);
    });

    if (missingAeoTags.length > 2) {
        result.aiOptimized = false;
    }

    return result;
}

/**
 * Checks for FAQ structured content
 */
export function validateFAQContent(): boolean {
    // Check for FAQ schema in JSON-LD
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    let hasFAQSchema = false;

    jsonLdScripts.forEach(script => {
        try {
            const data = JSON.parse(script.textContent || '');
            if (Array.isArray(data)) {
                hasFAQSchema = data.some(item => item['@type'] === 'FAQPage');
            } else if (data['@graph']) {
                hasFAQSchema = data['@graph'].some((item: any) => item['@type'] === 'FAQPage');
            } else {
                hasFAQSchema = data['@type'] === 'FAQPage';
            }
        } catch (error) {
            // Invalid JSON, skip
        }
    });

    // Check for semantic FAQ markup
    const hasSemanticFAQ = document.querySelectorAll('[itemtype*="Question"]').length > 0;

    return hasFAQSchema || hasSemanticFAQ;
}

/**
 * Checks for entity markup (microdata)
 */
export function validateEntityMarkup(): boolean {
    const entityTypes = [
        'Person',
        'Organization',
        'SoftwareApplication',
        'Product',
        'Answer'
    ];

    return entityTypes.some(type => 
        document.querySelectorAll(`[itemtype*="${type}"]`).length > 0
    );
}

/**
 * Checks for breadcrumb navigation
 */
export function validateBreadcrumbs(): boolean {
    // Check for breadcrumb schema
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    let hasBreadcrumbSchema = false;

    jsonLdScripts.forEach(script => {
        try {
            const data = JSON.parse(script.textContent || '');
            if (Array.isArray(data)) {
                hasBreadcrumbSchema = data.some(item => item['@type'] === 'BreadcrumbList');
            } else if (data['@graph']) {
                hasBreadcrumbSchema = data['@graph'].some((item: any) => item['@type'] === 'BreadcrumbList');
            } else {
                hasBreadcrumbSchema = data['@type'] === 'BreadcrumbList';
            }
        } catch (error) {
            // Invalid JSON, skip
        }
    });

    // Check for semantic breadcrumb markup
    const hasSemanticBreadcrumb = document.querySelectorAll('[itemtype*="BreadcrumbList"]').length > 0;

    return hasBreadcrumbSchema || hasSemanticBreadcrumb;
}

/**
 * Runs complete AEO validation test
 */
export function runAEOValidation(): AEOTestResult {
    const structuredData = validateStructuredData();
    const metaTags = validateMetaTags();
    const faqContent = validateFAQContent();
    const entityMarkup = validateEntityMarkup();
    const breadcrumbs = validateBreadcrumbs();

    // Calculate overall score (0-100)
    let score = 0;
    
    // Structured data (40 points)
    if (structuredData.valid) score += 30;
    if (structuredData.schemas.length >= 3) score += 10;

    // Meta tags (30 points)
    if (metaTags.hasRequiredTags) score += 20;
    if (metaTags.aiOptimized) score += 10;

    // Content features (30 points)
    if (faqContent) score += 10;
    if (entityMarkup) score += 10;
    if (breadcrumbs) score += 10;

    return {
        structuredData,
        metaTags,
        faqContent,
        entityMarkup,
        breadcrumbs,
        overallScore: score
    };
}

/**
 * Generate AEO report for console logging
 */
export function generateAEOReport(): void {
    const result = runAEOValidation();
    
    console.group('🤖 AEO Validation Report');
    console.log(`Overall Score: ${result.overallScore}/100`);
    
    console.group('📊 Structured Data');
    console.log(`Valid: ${result.structuredData.valid}`);
    console.log(`Schemas found: ${result.structuredData.schemas.join(', ')}`);
    if (result.structuredData.errors.length > 0) {
        console.log('Errors:', result.structuredData.errors);
    }
    if (result.structuredData.warnings.length > 0) {
        console.log('Warnings:', result.structuredData.warnings);
    }
    console.groupEnd();

    console.group('🏷️ Meta Tags');
    console.log(`Required tags complete: ${result.metaTags.hasRequiredTags}`);
    console.log(`AI optimized: ${result.metaTags.aiOptimized}`);
    if (result.metaTags.missingTags.length > 0) {
        console.log('Missing tags:', result.metaTags.missingTags);
    }
    console.groupEnd();

    console.group('📝 Content Features');
    console.log(`FAQ content: ${result.faqContent}`);
    console.log(`Entity markup: ${result.entityMarkup}`);
    console.log(`Breadcrumbs: ${result.breadcrumbs}`);
    console.groupEnd();

    console.groupEnd();

    // Recommendations
    if (result.overallScore < 80) {
        console.group('💡 Recommendations');
        if (!result.structuredData.valid) {
            console.log('• Fix JSON-LD syntax errors');
        }
        if (!result.metaTags.hasRequiredTags) {
            console.log('• Add missing meta tags:', result.metaTags.missingTags);
        }
        if (!result.metaTags.aiOptimized) {
            console.log('• Add AI-optimized meta tags (speakable, citation_author, etc.)');
        }
        if (!result.faqContent) {
            console.log('• Add FAQ section with structured data');
        }
        if (!result.entityMarkup) {
            console.log('• Add entity markup for better AI understanding');
        }
        if (!result.breadcrumbs) {
            console.log('• Implement breadcrumb navigation');
        }
        console.groupEnd();
    }
}

// Auto-run validation in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Run validation after page load
    window.addEventListener('load', () => {
        setTimeout(generateAEOReport, 1000);
    });
}