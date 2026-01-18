import { motion } from "framer-motion";
import { HelpCircle, Rocket } from "lucide-react";
import { AnimatedTimelineItem, AnimatedTimelineYear, SubTimelineItem } from "../Molecules/Timeline";
import { CompanyBadge } from "../Molecules/CompanyBadge";

export function AboutSection({ heroRef, heroInView, timelineRef, timelineInView, onInteraction }: {
    heroRef: (node?: Element | null) => void;
    heroInView: boolean;
    timelineRef: (node?: Element | null) => void;
    timelineInView: boolean;
    onInteraction: (type: 'click' | 'hover' | 'success' | 'toggle') => void;
}) {
    return (
        <>
            {/* Hero Section */}
            <motion.div
                ref={heroRef}
                className="relative mx-auto max-w-[560px] w-full z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="relative text-center max-w-[560px] pt-16 md:pt-24 pb-12 md:pb-16">
                    <motion.h1
                        className="text-[60px] md:text-[80px] font-serif font-medium leading-none mb-6 md:mb-8 tracking-tight gradient-text"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        hi, i'm Ibrahim Nurul Huda
                    </motion.h1>
                    <motion.div
                        className="flex items-center justify-center gap-1 text-muted-foreground mb-4 md:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span className="text-base md:text-lg">tangerang, banten, indonesia</span>
                    </motion.div>
                    <motion.p
                        className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        founder @{" "}
                        <span 
                            className="text-foreground"
                            itemScope
                            itemType="https://schema.org/Organization"
                        >
                            <span itemProp="name">pt cahaya petunjuk inovasi</span>
                        </span><br />
                        building{" "}
                        <span
                            className="text-foreground underline decoration-2 underline-offset-2 decoration-muted-foreground"
                            itemScope
                            itemType="https://schema.org/SoftwareApplication"
                        >
                            <span itemProp="name">bantu ai</span>
                        </span>{" "}
                        - <span itemScope itemType="https://schema.org/Product">
                            <span itemProp="description">ai saas platform bridging technology with islamic principles</span>
                        </span>.<br />
                        currently{" "}
                        <span className="text-foreground font-medium">product manager</span>{" "}
                        @ founderplus.
                    </motion.p>
                </div>
            </motion.div>

            {/* Timeline Section */}
            <motion.div
                ref={timelineRef}
                className="w-full max-w-5xl mx-auto mt-16"
                initial={{ opacity: 0 }}
                animate={timelineInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="relative w-full max-w-4xl mx-auto py-6">
                    <motion.div
                        className="mb-8 ml-[20px]"
                        initial={{ opacity: 0, x: -30 }}
                        animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold text-foreground tracking-tight">Timeline</h2>
                    </motion.div>

                    <div className="space-y-12">
                        <AnimatedTimelineYear year="2025" delay={0.3} inView={timelineInView}>
                            <AnimatedTimelineItem delay={0.4} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground whitespace-nowrap">Technical Product Manager at</span>
                                    <CompanyBadge
                                        name="Founderplus"
                                        logo="https://media.licdn.com/dms/image/v2/D560BAQGQtFxRvqOCIg/company-logo_100_100/company-logo_100_100/0/1698201641498/founderplus_logo?e=1754524800&v=beta&t=example"
                                        bgColor="rgb(235, 245, 255)"
                                        borderColor="rgb(185, 220, 255)"
                                        href="https://founderplus.id"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">- dec 2025 - present</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={0.7} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>Company Rebranding:</b> Leading engineering execution and product strategy</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={0.8} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>Sleek Graph LXP:</b> Knowledge graph education with Zettelkasten for AI recommendations</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={0.9} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>SEO Executive Dashboard:</b> GSC + Clarity automation with sleek executive reports</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={1.0} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>FB Ads Automation:</b> Autonomous sales system learning from ad performance</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={1.1} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>WhatsApp CRM Extension:</b> Chrome extension for sales team with minimal learning curve</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={1.2} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>Mobile App (TWA):</b> Android app with Expo for user nurturing and engagement</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>

                            <AnimatedTimelineItem delay={1.3} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground whitespace-nowrap">Product Manager at</span>
                                    <CompanyBadge
                                        name="Founderplus"
                                        logo="https://media.licdn.com/dms/image/v2/D560BAQGQtFxRvqOCIg/company-logo_100_100/company-logo_100_100/0/1698201641498/founderplus_logo?e=1754524800&v=beta&t=example"
                                        bgColor="rgb(235, 245, 255)"
                                        borderColor="rgb(185, 220, 255)"
                                        href="https://founderplus.id"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">- aug - dec 2025</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 1.5 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={1.6} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>12x Faster Delivery:</b> Reduced shipping cycles from ~3 months to ~1 week</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={1.7} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>GSC Impressions +511%:</b> Technical SEO boost with 90+ Lighthouse scores</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={1.8} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>Multi-tenant Platform:</b> Content, payment, auth, assessment for multiple partners</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={1.9} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>+300% Ops Adoption:</b> Zoho + GA + FB Pixel unified tracking journey</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>

                            <AnimatedTimelineItem delay={2.0} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground">Fullstack Developer at</span>
                                    <CompanyBadge
                                        name="Agrego Commerce"
                                        logo="https://media.licdn.com/dms/image/v2/C560BAQGJqD50IyiLpQ/company-logo_100_100/company-logo_100_100/0/1630646976659?e=1754524800&v=beta&t=bkPIX0tbhBTGuU8OFFiOqGMnEDV-m29IVutqwUeLbqk"
                                        bgColor="rgb(235, 245, 255)"
                                        borderColor="rgb(185, 220, 255)"
                                        href="https://www.linkedin.com/company/72290279/"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">- jan - aug 2025</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 2.2 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={2.3} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>API Latency -60ms:</b> Migrated Laravel/PHP-FPM to FrankenPHP, fixed N+1 queries</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={2.4} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>Bundle 2MB to 500KB:</b> 85% faster first-paint, increased purchase intent</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={2.5} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>AI UI Insights:</b> Gemini Flash 2.5 enabling merchants to launch campaigns 3x faster</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={2.6} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>A/B Testing Tool:</b> +25% lead conversion uplift with GTM + FB Pixel tracking</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>
                        </AnimatedTimelineYear>

                        <AnimatedTimelineYear year="2024" delay={2.7} inView={timelineInView}>
                            <AnimatedTimelineItem delay={2.8} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground whitespace-nowrap">founder at</span>
                                    <CompanyBadge
                                        name="PT Cahaya Petunjuk Inovasi"
                                        logo="https://media.licdn.com/dms/image/v2/D560BAQH6PGuwSYXCMg/company-logo_100_100/company-logo_100_100/0/1727244027403?e=1754524800&v=beta&t=mk5VeV57OCLzMeCOCxgkuKBdn0NNKLApzyu9jUCKIr4"
                                        bgColor="rgb(230, 249, 251)"
                                        borderColor="rgb(168, 221, 230)"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">-</span>
                                    <span className="text-base text-foreground whitespace-nowrap">jan 2022 - present</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={0.7} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Built</span>
                                        <CompanyBadge
                                            name="Bantu AI"
                                            logo="https://media.licdn.com/dms/image/v2/D562DAQFNEMiitWlO4g/profile-treasury-image-shrink_160_160/profile-treasury-image-shrink_160_160/0/1739176585540?e=1749862800&v=beta&t=WDJcePXjp0-ewNjumyCbW9WDgZEW6wI_Q-iTN220gWs"
                                            bgColor="rgb(234, 243, 246)"
                                            borderColor="rgb(188, 216, 228)"
                                            href="https://www.sarbeh.com/bantuAi"
                                            small
                                            onInteraction={onInteraction}
                                        />
                                        <span className="text-sm text-muted-foreground">- AI SaaS platform with 50+ models</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={0.8} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>Kalkulator Waris Syafi'i:</b> Islamic inheritance calculator with fiqh-based calculations</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={0.9} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>RAG Library:</b> Fiqh knowledge base from student notes with agentic search</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={1.0} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Specialized search for Shamela Turath and trusted Islamic references</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>

                            <AnimatedTimelineItem delay={1.0} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground">Back End Developer at</span>
                                    <CompanyBadge
                                        name="Badr Interactive"
                                        logo="https://media.licdn.com/dms/image/v2/C560BAQEapJBXD--rEQ/company-logo_100_100/company-logo_100_100/0/1631315970076?e=1754524800&v=beta&t=CmVbOczolB4hkbrgjHnAHt6Rko5NCYdkpmhEmObF53Q"
                                        bgColor="rgb(255, 240, 235)"
                                        borderColor="rgb(255, 200, 180)"
                                        href="https://www.linkedin.com/company/3122795/"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">- nov-dec 2024 (contract)</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={1.3} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>Agent & Affiliate System:</b> User analysis and inter-user affiliate capabilities</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={1.4} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">JWT/RBAC authentication with advanced user behavior tracking and analytics</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>

                            <AnimatedTimelineItem delay={1.5} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground">Software Engineer at</span>
                                    <CompanyBadge
                                        name="Deka Insight"
                                        logo="https://media.licdn.com/dms/image/v2/C510BAQHOjheEYhbZiw/company-logo_100_100/company-logo_100_100/0/1630609052679/deka_marketing_research_logo?e=1754524800&v=beta&t=poicTKekgtEeK6ye9TNhvnW9YedtuwXwpcNTmMuFHRU"
                                        bgColor="rgb(250, 245, 255)"
                                        borderColor="rgb(215, 195, 255)"
                                        href="https://www.linkedin.com/company/1133120/"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">- may-jul 2024</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 2.3 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={2.4} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Fixed CMS bugs, implemented image upload fix, CSS layout refactoring</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={2.5} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Legacy code optimization and database restructuring for better performance</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={2.6} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Upgraded CKEditor security and implemented "Related Blog" feature</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>

                            <AnimatedTimelineItem delay={2.7} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground">Web Developer at</span>
                                    <CompanyBadge
                                        name="PT NCI"
                                        logo="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                        bgColor="rgb(255, 248, 240)"
                                        borderColor="rgb(255, 225, 190)"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">- jan-mar 2024 (freelance)</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 2.9 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={3.0} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>Medical Clinic System:</b> End-to-end frontend for healthcare management</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={3.1} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">FIGMA to ReactJS+Tailwind: data tables, filters, forms, medical workflows</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>
                        </AnimatedTimelineYear>

                        <AnimatedTimelineYear year="2023" delay={2.2} inView={timelineInView}>
                            <AnimatedTimelineItem delay={3.2} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground">Web Developer at</span>
                                    <CompanyBadge
                                        name="Murunah Kreatif Indonesia"
                                        logo="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                        bgColor="rgb(245, 255, 245)"
                                        borderColor="rgb(195, 235, 195)"
                                        href="https://www.linkedin.com/company/89711428/"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">- oct-dec 2023</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 3.4 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={3.5} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>Programmatic SEO:</b> Created 100 SEO pages, acquired clients in 3 days</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={3.6} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Built SEO-optimized landing pages for events and marketing campaigns</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={3.7} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Tech Stack: Svelte, Cloudflare CDN for security and speed optimization</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>

                            <AnimatedTimelineItem delay={3.8} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground">Software Developer at</span>
                                    <CompanyBadge
                                        name="Braincore.id"
                                        logo="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                        bgColor="rgb(255, 250, 240)"
                                        borderColor="rgb(255, 220, 180)"
                                        href="https://www.linkedin.com/company/75629462/"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">- aug-oct 2023 (freelance)</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 4.0 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={4.1} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Developed programmatic SEO and blog/image/PDF converter microservices</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={4.2} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Automated nginx and systemctl setup, perfect client-side performance score</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={4.3} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Tech Stack: Python, unoconv, LibreOffice, Linux VPS, HTMX</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>

                            <AnimatedTimelineItem delay={4.4} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground">Fullstack Web Developer at</span>
                                    <CompanyBadge
                                        name="Pt Strong and Trusty"
                                        logo="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                        bgColor="rgb(240, 255, 255)"
                                        borderColor="rgb(180, 235, 235)"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">- may-jun 2023 (part-time)</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 4.6 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={4.7} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>Yayasan Naik Kelas & Ma'had Maliah:</b> Educational platforms with quizzes and videos</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={4.8} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Web Vitals score 85+ with multimedia member area and advanced authentication</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={4.9} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Tech Stack: Astro.js, Alpine.js, Svelte, Vue.js, React, Vercel serverless</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>
                        </AnimatedTimelineYear>

                        <AnimatedTimelineYear year="2020-2022" delay={5.0} inView={timelineInView}>
                            <AnimatedTimelineItem delay={5.1} inView={timelineInView}>
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-base text-foreground">Frontend Engineer at</span>
                                    <CompanyBadge
                                        name="Sunat Ceria"
                                        logo="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                        bgColor="rgb(255, 245, 235)"
                                        borderColor="rgb(255, 215, 175)"
                                        onInteraction={onInteraction}
                                    />
                                    <span className="text-base text-foreground">- jan 2020 - oct 2022</span>
                                </div>

                                <motion.div
                                    className="pl-6 space-y-3 mt-3 relative"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={timelineInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.6, delay: 5.3 }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-orange-200" />

                                    <SubTimelineItem delay={5.4} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground"><b>WordPress to Astro migration:</b> Lighthouse 100 desktop, 98 mobile scores</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={5.5} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Cost reduction by 90%, dramatically improved website speed and performance</span>
                                    </SubTimelineItem>

                                    <SubTimelineItem delay={5.6} inView={timelineInView}>
                                        <span className="text-sm text-muted-foreground">Advanced SEO strategies, local SEO dominance, advertising and link-building</span>
                                    </SubTimelineItem>
                                </motion.div>
                            </AnimatedTimelineItem>

                            <AnimatedTimelineItem delay={5.7} inView={timelineInView}>
                                <span className="text-base text-muted-foreground">
                                    <b>Foundation years:</b> Built expertise in SEO, frontend development, and performance optimization
                                </span>
                            </AnimatedTimelineItem>
                        </AnimatedTimelineYear>
                    </div>
                </div>
            </motion.div>

            {/* Value Proposition Section */}
            <motion.div
                className="w-full max-w-5xl mx-auto mt-24"
                initial={{ opacity: 0, y: 30 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                        Engineer × Product Builder
                    </h3>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                        I don't just write code - I solve real business problems, building products that actually work for people, especially when you need something shipped yesterday.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Card 1: How I Work */}
                    <div className="bg-secondary/30 p-8 rounded-2xl border border-border/20 transition-all hover:border-border/40 hover:bg-secondary/50">
                        <div className="flex justify-start mb-5">
                            <div className="p-3 bg-orange-500/10 rounded-lg">
                                <HelpCircle className="w-6 h-6 text-orange-500" />
                            </div>
                        </div>
                        <h4 className="text-xl font-semibold text-foreground mb-4">How I Work</h4>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0 mt-1"><path d="M20 6 9 17l-5-5"/></svg><span className="flex-1">Question everything - understanding the *why* behind every feature.</span></li>
                            <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0 mt-1"><path d="M20 6 9 17l-5-5"/></svg><span className="flex-1">Ship, measure, adjust - because perfect is the enemy of done.</span></li>
                            <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0 mt-1"><path d="M20 6 9 17l-5-5"/></svg><span className="flex-1">Focus on real users and real problems, not just tech trends.</span></li>
                            <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0 mt-1"><path d="M20 6 9 17l-5-5"/></svg><span className="flex-1">Build with purpose - creating technology that genuinely helps.</span></li>
                        </ul>
                    </div>

                    {/* Card 2: What You Get */}
                     <div className="bg-secondary/30 p-8 rounded-2xl border border-border/20 transition-all hover:border-border/40 hover:bg-secondary/50">
                        <div className="flex justify-start mb-5">
                             <div className="p-3 bg-orange-500/10 rounded-lg">
                                <Rocket className="w-6 h-6 text-orange-500" />
                            </div>
                        </div>
                        <h4 className="text-xl font-semibold text-foreground mb-4">What You Get</h4>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0 mt-1"><path d="M20 6 9 17l-5-5"/></svg><span className="flex-1">Working prototypes - ideas to clickable demos in weeks, not months.</span></li>
                            <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0 mt-1"><path d="M20 6 9 17l-5-5"/></svg><span className="flex-1">Cost-effective solutions that optimize, not just rebuild.</span></li>
                            <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0 mt-1"><path d="M20 6 9 17l-5-5"/></svg><span className="flex-1">Expert contract development (Javascript, PHP, Python).</span></li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
