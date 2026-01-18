import satori from "satori";

// Load Inter font data
async function getInterFont() {
    try {
        const fontResponse = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });

        const css = await fontResponse.text();
        const fontUrl = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)?.[1];

        if (fontUrl) {
            const fontData = await fetch(fontUrl);
            return await fontData.arrayBuffer();
        }
    } catch (error) {
        console.log('Failed to load Inter font, using fallback');
    }

    // Return empty buffer as fallback
    return new ArrayBuffer(0);
}

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const title = url.searchParams.get("title") ?? "sarbeh";
    const description = url.searchParams.get("description") ?? "Personal website and blog";
    const path = url.searchParams.get("path") ?? "/";

    try {
        const interFont = await getInterFont();

        // Create SVG with satori (using JSX-style object)
        const svg = await satori(
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0c0c0c",
                    backgroundImage: "linear-gradient(45deg, #0c0c0c 0%, #1a1a1a 100%)",
                    fontFamily: interFont.byteLength > 0 ? "Inter" : "system-ui, -apple-system, sans-serif",
                    color: "white",
                    position: "relative",
                }}
            >
                {/* Background pattern */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `radial-gradient(circle at 25% 25%, #ff6b35 0%, transparent 25%), 
                                       radial-gradient(circle at 75% 75%, #ff6b35 0%, transparent 25%)`,
                        opacity: 0.1,
                    }}
                />
                
                {/* Content container */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "60px",
                        maxWidth: "800px",
                        zIndex: 1,
                    }}
                >
                    {/* Logo/Brand */}
                    <div
                        style={{
                            fontSize: "48px",
                            fontWeight: 700,
                            marginBottom: "32px",
                            color: "#ff6b35",
                        }}
                    >
                        sarbeh
                    </div>
                    
                    {/* Title */}
                    <h1
                        style={{
                            fontSize: title.length > 50 ? "48px" : "64px",
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: "24px",
                            color: "#ffffff",
                        }}
                    >
                        {title}
                    </h1>
                    
                    {/* Description */}
                    {description && description !== "Personal website and blog" && (
                        <p
                            style={{
                                fontSize: "24px",
                                fontWeight: 400,
                                color: "#a3a3a3",
                                lineHeight: 1.4,
                                marginBottom: "40px",
                                maxWidth: "600px",
                            }}
                        >
                            {description.length > 120 ? description.substring(0, 117) + "..." : description}
                        </p>
                    )}
                    
                    {/* Path indicator */}
                    {path !== "/" && (
                        <div
                            style={{
                                fontSize: "18px",
                                color: "#ff6b35",
                                fontWeight: 500,
                                padding: "12px 24px",
                                border: "2px solid #ff6b35",
                                borderRadius: "30px",
                            }}
                        >
                            {path}
                        </div>
                    )}
                </div>
            </div>,
            {
                width: 1200,
                height: 630,
                fonts: interFont.byteLength > 0 ? [
                    {
                        name: "Inter",
                        data: interFont,
                        weight: 400,
                        style: "normal",
                    },
                    {
                        name: "Inter",
                        data: interFont,
                        weight: 700,
                        style: "normal",
                    },
                    {
                        name: "Inter",
                        data: interFont,
                        weight: 800,
                        style: "normal",
                    },
                ] : [],
            }
        );

        // Return SVG (lighter and faster than PNG)
        return new Response(svg, {
            headers: {
                "Content-Type": "image/svg+xml",
                "Cache-Control": "public, max-age=86400, s-maxage=31536000",
                "CDN-Cache-Control": "public, max-age=31536000",
            },
        });
    } catch (error) {
        console.error("Error generating OG image:", error);

        // Return a simple fallback SVG
        const fallbackSvg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0c0c0c"/>
            <stop offset="100%" style="stop-color:#1a1a1a"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        <text x="600" y="200" text-anchor="middle" fill="#ff6b35" font-size="48" font-family="system-ui, sans-serif" font-weight="700">sarbeh</text>
        <text x="600" y="300" text-anchor="middle" fill="white" font-size="56" font-family="system-ui, sans-serif" font-weight="800">${title.length > 30 ? title.substring(0, 27) + "..." : title}</text>
        <text x="600" y="450" text-anchor="middle" fill="#a3a3a3" font-size="24" font-family="system-ui, sans-serif">${description.length > 80 ? description.substring(0, 77) + "..." : description}</text>
      </svg>
    `;

        return new Response(fallbackSvg, {
            headers: {
                "Content-Type": "image/svg+xml",
                "Cache-Control": "public, max-age=3600",
            },
        });
    }
} 