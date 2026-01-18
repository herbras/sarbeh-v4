import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { OGMeta } from "@/components/OGMeta";
import { playSound } from "@/stores/app";
import type { Route } from "./+types/uses";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Uses - Ibrahim Nurul Huda (sarbeh)" },
        {
            name: "description",
            content: "Tools, technologies, frameworks and hardware I use for development and daily work as a Software Engineer."
        }
    ];
}

const UsesItem = ({
    title,
    description
}: {
    title: string;
    description: string;
}) => (
    <div className="mb-3">
        <h3 className="font-medium text-foreground">
            {title}
        </h3>
        <p className="text-muted-foreground text-sm">
            {description}
        </p>
    </div>
);

const Section = ({
    title,
    children
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <section className="mb-10">
        <h2 className="text-lg font-medium mb-4 text-foreground">
            {title}
        </h2>
        <div className="space-y-0">
            {children}
        </div>
    </section>
);

export default function Uses() {
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { threshold: 0.3, triggerOnce: true });
    const contentInView = useInView(contentRef, { threshold: 0.1, triggerOnce: true });

    return (
        <>
            <OGMeta
                title="Uses - Ibrahim Nurul Huda (sarbeh)"
                description="Tools, technologies, frameworks and hardware I use for development and daily work as a Software Engineer."
                path="/uses"
                type="website"
            />

            <div className="container mx-auto px-4 pt-28 md:pt-36 pb-24">
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
                                uses
                            </h1>
                            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-16">
                                Tools and technologies I use daily for development and engineering work.
                            </p>
                        </motion.div>

                        {/* Content Section */}
                        <motion.div
                            ref={contentRef}
                            className="text-left max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Section title="Languages">
                                <UsesItem title="TypeScript / JavaScript" description="Primary development languages" />
                                <UsesItem title="Python / MicroPython" description="Backend, AI/ML, automation" />
                                <UsesItem title="PHP / Laravel" description="Web development with modern stack" />
                            </Section>

                            <Section title="Frontend">
                                <UsesItem title="React / Next.js" description="Primary frontend stack" />
                                <UsesItem title="SvelteKit (svelte) / Nuxt (Vue)" description="Modern alternative framework" />
                                <UsesItem title="Alpine HTMX / Ajax" description="Simple Fast" />
                                <UsesItem title="Tailwind CSS" description="Utility-first styling" />
                                <UsesItem title="Framer Motion / Gsap" description="Animation library" />
                            </Section>

                            <Section title="Backend">
                                <UsesItem title="Node.js / Bun / Deno" description=" Runtimes" />
                                <UsesItem title="Elysia / Hono" description="Modern web frameworks" />
                                <UsesItem title="FastAPI / Flask / Django" description="Python web frameworks" />
                            </Section>

                            <Section title="Database">
                                <UsesItem title="PostgreSQL / MySQL" description="Primary relational database" />
                                <UsesItem title="SQLite" description="Lightweight database for projects" />
                                <UsesItem title="Google Sheets / AppScript" description="QuickApp database" />
                                <UsesItem title="Supabase" description="Backend-as-a-Service" />
                            </Section>

                            <Section title="AI & Vector">
                                <UsesItem title="OpenAI / Gemini / Mistral / Deepseek / Claude / LLaMA" description="Language model integration" />
                                <UsesItem title="Langchain / Agno / Pydantic-AI" description="LLM application tooling" />
                                <UsesItem title="PGVector / ChromaDB / ChromaDB " description="Vector databases" />
                            </Section>

                            <Section title="DevOps & Cloud">
                                <UsesItem title="Docker" description="Containerization platform" />
                                <UsesItem title="Nginx / Caddy" description="Web servers and reverse proxy" />
                                <UsesItem title="AWS / GCP" description="Cloud infrastructure" />
                                <UsesItem title="GitHub Actions" description="CI/CD automation" />
                                <UsesItem title="PM2" description="Node.js process manager for production" />
                                <UsesItem title="SSH / Systemd / systemctl / ufw / iptables" description="System administration and server management tools." />
                            </Section>

                            <Section title="Testing & Quality">
                                <UsesItem title="Jest / Vitest" description="Unit testing frameworks" />
                                <UsesItem title="Playwright / Stagehand" description="End-to-end testing" />
                                <UsesItem title="ESLint / Prettier / Biomejs / Ruff" description="Code quality and formatting" />
                            </Section>

                            <Section title="Security & Performance">
                                <UsesItem title="OWASP ZAP" description="Security vulnerability scanner" />
                                <UsesItem title="Burp Suite" description="Web application security testing" />
                                <UsesItem title="SQLMap" description="Automated SQL injection testing" />
                                <UsesItem title="Snyk" description="Code security dan dependency vulnerability scanning" />
                                <UsesItem title="SonarQube" description="Code quality dan security analysis" />
                                <UsesItem title="JMeter" description="Load testing and performance analysis" />
                                <UsesItem title="wrk" description="Modern HTTP benchmarking tool" />
                                <UsesItem title="Grafana + Prometheus" description="Monitoring dan alerting stack" />
                                <UsesItem title="htop/btop" description="System resource monitoring" />
                            </Section>

                            <Section title="Development Tools">
                                <UsesItem title="VSCode / Cursor" description="Primary code editors" />
                                <UsesItem title="Powershell Terminal" description="Default Terminal on Windows" />
                                <UsesItem title="Git / GitHub" description="Version control and collaboration" />
                                <UsesItem title="Postman / ApiDog / cUrl" description="API development and otomation testing" />
                            </Section>

                            <Section title="Deployment">
                                <UsesItem title="Vercel / Cloudflare" description="Serverless deployment platforms" />
                                <UsesItem title="Railway / Fly.io / VPS / Baremetal" description="Deployment platforms" />
                            </Section>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}