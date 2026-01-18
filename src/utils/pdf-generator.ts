export interface PDFOptions {
    filename?: string;
    title?: string;
    includeHeader?: boolean;
    includeFooter?: boolean;
    customCSS?: string;
}

export async function generatePDF(options: PDFOptions = {}) {
    const {
        filename = 'sarbeh-portfolio',
        title = 'Sarbeh.com - Portfolio',
        includeHeader = true,
        includeFooter = true,
        customCSS = ''
    } = options;

    try {
        // Get all current stylesheets
        const stylesheets = Array.from(document.styleSheets)
            .map(sheet => {
                try {
                    return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
                } catch (e) {
                    // Cross-origin stylesheets
                    return '';
                }
            })
            .join('\n');

        // Get inline styles
        const inlineStyles = Array.from(document.querySelectorAll('style'))
            .map(style => style.textContent || '')
            .join('\n');

        // Get the main content (try multiple selectors)
        const contentSelectors = ['main', '[role="main"]', '.main-content', 'body > div'];
        let mainContent = '';
        
        for (const selector of contentSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                mainContent = element.innerHTML;
                break;
            }
        }

        if (!mainContent) {
            mainContent = document.body.innerHTML;
        }

        // Create print window
        const printWindow = window.open('', '_blank', 'width=1200,height=800');
        
        if (!printWindow) {
            throw new Error('Failed to open print window. Please allow popups.');
        }

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>${title}</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <script>
                    tailwind.config = {
                        theme: {
                            extend: {
                                colors: {
                                    border: "hsl(var(--border))",
                                    input: "hsl(var(--input))",
                                    ring: "hsl(var(--ring))",
                                    background: "hsl(var(--background))",
                                    foreground: "hsl(var(--foreground))",
                                    primary: {
                                        DEFAULT: "hsl(var(--primary))",
                                        foreground: "hsl(var(--primary-foreground))",
                                    },
                                    secondary: {
                                        DEFAULT: "hsl(var(--secondary))",
                                        foreground: "hsl(var(--secondary-foreground))",
                                    },
                                    muted: {
                                        DEFAULT: "hsl(var(--muted))",
                                        foreground: "hsl(var(--muted-foreground))",
                                    },
                                },
                            },
                        },
                    }
                </script>
                <style>
                    :root {
                        --background: 0 0% 100%;
                        --foreground: 222.2 84% 4.9%;
                        --card: 0 0% 100%;
                        --card-foreground: 222.2 84% 4.9%;
                        --popover: 0 0% 100%;
                        --popover-foreground: 222.2 84% 4.9%;
                        --primary: 222.2 47.4% 11.2%;
                        --primary-foreground: 210 40% 98%;
                        --secondary: 210 40% 96%;
                        --secondary-foreground: 222.2 84% 4.9%;
                        --muted: 210 40% 96%;
                        --muted-foreground: 215.4 16.3% 46.9%;
                        --accent: 210 40% 96%;
                        --accent-foreground: 222.2 84% 4.9%;
                        --destructive: 0 84.2% 60.2%;
                        --destructive-foreground: 210 40% 98%;
                        --border: 214.3 31.8% 91.4%;
                        --input: 214.3 31.8% 91.4%;
                        --ring: 222.2 84% 4.9%;
                        --radius: 0.5rem;
                    }
                    
                    /* Preserve all existing styles */
                    ${inlineStyles}
                    ${stylesheets}
                    ${customCSS}
                    
                    /* PDF-specific styles */
                    @media print {
                        * {
                            -webkit-print-color-adjust: exact !important;
                            color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        
                        html, body {
                            width: 100% !important;
                            height: auto !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            background: white !important;
                            font-size: 12px !important;
                            line-height: 1.4 !important;
                            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
                        }
                        
                        .pdf-container {
                            max-width: none !important;
                            margin: 0 !important;
                            padding: 15mm !important;
                        }
                        
                        /* Hide interactive and navigation elements */
                        .no-print,
                        button,
                        [role="button"],
                        .hover\\:scale-105,
                        .group-hover\\:scale-\\[1\\.03\\],
                        nav,
                        header,
                        .navigation,
                        .menu,
                        .sidebar {
                            display: none !important;
                        }
                        
                        /* Page breaks */
                        .break-before-page { break-before: page !important; }
                        .break-inside-avoid { break-inside: avoid !important; }
                        .break-after-avoid { break-after: avoid !important; }
                        
                        /* Section spacing */
                        section {
                            break-inside: avoid !important;
                            margin-bottom: 2rem !important;
                        }
                        
                        /* Typography adjustments */
                        h1 { 
                            font-size: 22px !important; 
                            margin-bottom: 16px !important; 
                            break-after: avoid !important;
                            page-break-after: avoid !important;
                        }
                        h2 { 
                            font-size: 18px !important; 
                            margin-bottom: 12px !important; 
                            break-after: avoid !important;
                            page-break-after: avoid !important;
                        }
                        h3 { 
                            font-size: 16px !important; 
                            margin-bottom: 10px !important; 
                            break-after: avoid !important;
                            page-break-after: avoid !important;
                        }
                        
                        p {
                            margin-bottom: 8px !important;
                            orphans: 3 !important;
                            widows: 3 !important;
                        }
                        
                        /* Grid and flexbox adjustments */
                        .grid {
                            display: block !important;
                        }
                        
                        .flex {
                            display: block !important;
                        }
                        
                        .grid > *,
                        .flex > * {
                            margin-bottom: 1rem !important;
                            break-inside: avoid !important;
                        }
                        
                        /* Card styling */
                        .bg-secondary\\/30,
                        .bg-secondary,
                        .border,
                        [class*="rounded"],
                        .card {
                            border: 1px solid #e5e7eb !important;
                            background: #f9fafb !important;
                            margin-bottom: 1rem !important;
                            break-inside: avoid !important;
                            padding: 12px !important;
                            border-radius: 6px !important;
                        }
                        
                        /* Images */
                        img {
                            max-width: 150px !important;
                            height: auto !important;
                            break-inside: avoid !important;
                            margin: 8px 0 !important;
                        }
                        
                        /* Badge and tag styling */
                        .badge,
                        .inline-flex.items-center.rounded-md,
                        [class*="bg-"][class*="text-"] {
                            border: 1px solid #d1d5db !important;
                            padding: 4px 8px !important;
                            margin: 2px !important;
                            display: inline-block !important;
                            background: #f3f4f6 !important;
                            color: #374151 !important;
                            font-size: 11px !important;
                            break-inside: avoid !important;
                            border-radius: 4px !important;
                        }
                        
                        /* List styling */
                        ul, ol {
                            break-inside: avoid !important;
                            margin-bottom: 1rem !important;
                        }
                        
                        li {
                            break-inside: avoid !important;
                            margin-bottom: 4px !important;
                        }
                        
                        /* Accordion - show all content */
                        [data-state="closed"],
                        .collapse {
                            display: block !important;
                            height: auto !important;
                        }
                        
                        /* Footer info */
                        .pdf-footer {
                            position: fixed;
                            bottom: 10mm;
                            left: 15mm;
                            right: 15mm;
                            font-size: 10px;
                            color: #666;
                            text-align: center;
                            border-top: 1px solid #ddd;
                            padding-top: 5mm;
                        }
                        
                        /* Hide dark mode specific elements */
                        .dark\\:bg-gray-900,
                        .dark\\:text-white {
                            background: white !important;
                            color: black !important;
                        }
                    }
                    
                    @page {
                        size: A4;
                        margin: 15mm;
                    }
                </style>
            </head>
            <body class="bg-white text-gray-900">
                ${includeHeader ? `
                <div class="pdf-header" style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #e5e7eb;">
                    <h1 style="margin: 0; font-size: 20px; color: #111;">${title}</h1>
                    <p style="margin: 4px 0 0 0; color: #666; font-size: 12px;">Generated from sarbeh.com</p>
                </div>
                ` : ''}
                
                <div class="pdf-container">
                    ${mainContent}
                </div>
                
                ${includeFooter ? `
                <div class="pdf-footer no-print-footer">
                    <p>© ${new Date().getFullYear()} Ibrahim Nurul Huda (Sarbeh) - sarbeh.com | Generated on ${new Date().toLocaleDateString('id-ID')}</p>
                </div>
                ` : ''}
                
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        // Wait for Tailwind to load
                        setTimeout(() => {
                            // Force expand all collapsible content
                            const collapsibles = document.querySelectorAll('[data-state="closed"], .collapse');
                            collapsibles.forEach(el => {
                                el.setAttribute('data-state', 'open');
                                el.style.display = 'block';
                                el.style.height = 'auto';
                                el.style.overflow = 'visible';
                            });
                            
                            // Remove all interactive elements
                            const interactiveElements = document.querySelectorAll('.no-print, button, [role="button"], nav, header, .navigation, .menu, .sidebar');
                            interactiveElements.forEach(el => {
                                if (el && el.parentNode) {
                                    el.parentNode.removeChild(el);
                                }
                            });
                            
                            // Add page break classes to major sections
                            const sections = document.querySelectorAll('section, .section, [id*="section"]');
                            sections.forEach((section, index) => {
                                if (index > 2) { // Start page breaks after 3rd section
                                    section.style.pageBreakBefore = 'always';
                                }
                                section.style.pageBreakInside = 'avoid';
                            });
                            
                            // Set document title
                            document.title = '${filename}';
                            
                            // Trigger print dialog
                            setTimeout(() => {
                                window.print();
                            }, 1500);
                        }, 1000);
                    });
                    
                    // Close window after printing
                    window.addEventListener('afterprint', function() {
                        setTimeout(() => {
                            window.close();
                        }, 500);
                    });
                    
                    // Handle print cancellation
                    window.addEventListener('beforeunload', function() {
                        window.close();
                    });
                </script>
            </body>
            </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Gagal membuat PDF. Pastikan popup tidak diblokir dan coba lagi.');
        return false;
    }
}