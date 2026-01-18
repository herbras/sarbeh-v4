import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { generatePDF } from "@/utils/pdf-generator";

interface PDFDownloadButtonProps {
    filename?: string;
    title?: string;
    className?: string;
    size?: "sm" | "default" | "lg";
    variant?: "default" | "outline" | "ghost" | "secondary";
}

export function PDFDownloadButton({ 
    filename = "sarbeh-page", 
    title = "Sarbeh.com - Page",
    className = "",
    size = "sm",
    variant = "outline"
}: PDFDownloadButtonProps) {
    const handleDownload = async () => {
        await generatePDF({
            filename,
            title,
            includeHeader: true,
            includeFooter: true,
            customCSS: `
                /* Global PDF styles for all pages */
                .gradient-text {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                    -webkit-background-clip: text !important;
                    -webkit-text-fill-color: transparent !important;
                    color: #4f46e5 !important; /* fallback */
                }
                
                .bg-orange-500 {
                    background-color: #f97316 !important;
                    color: white !important;
                }
                
                .text-orange-500 {
                    color: #f97316 !important;
                }
                
                .bg-emerald-600 {
                    background-color: #059669 !important;
                    color: white !important;
                }
                
                .text-emerald-600 {
                    color: #059669 !important;
                }
                
                /* Timeline styles */
                .timeline-line {
                    border-left: 2px solid #e5e7eb !important;
                }
                
                /* Particle animations - hide in PDF */
                .particles-container,
                .floating-particle {
                    display: none !important;
                }
            `
        });
    };

    return (
        <Button 
            variant={variant} 
            size={size}
            onClick={handleDownload}
            className={`no-print ${className}`}
        >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
        </Button>
    );
}