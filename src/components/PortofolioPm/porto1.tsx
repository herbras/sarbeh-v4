"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
    ArrowRight,
    Check,
    Download,
    Globe,
    LineChart,
    Linkedin,
    Mail,
    MapPin,
    NotebookPen,
    Phone,
    Rocket,
    Shield,
    Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Kompressor from "@/assets/kompressor.webp"
import { Link } from "react-router"
import type React from "react"
import { Separator } from "@/components/ui/separator"
import ZikirAppImage from "@/assets/zikir.webp"
import amikomImage from "@/assets/amikom.jpeg"
import arbainImage from "@/assets/arbain.jpg"
import canvasImage from "@/assets/Canvas.png"
import { cn } from "@/lib/utils"
import compressorImage from "@/assets/compressor.jpg"
import dekaInsightImage from "@/assets/DekaInsight.jpg"
import eklinikImage from "@/assets/eklinik.jpg"
import fonderPlusImage from "@/assets/fonderPlus.png"
import { generatePDF } from "@/utils/pdf-generator"
import jadwalKRLImage from "@/assets/jadwalKRL.jpg"
import kajianImage from "@/assets/kajian.jpg"
import maylearningImage from "@/assets/maylearning.jpg"
import murunahImage from "@/assets/murunah.jpg"
import pesanImage from "@/assets/pesan.png"
import pokemonImage from "@/assets/Pokemon.webp"
import { portfolio } from "@/lib/portfolioPM"
import presensiImage from "@/assets/presensi.jpg"
import productManagementImage from "@/assets/productmanagement.webp"
import referensiImage from "@/assets/Referensi.jpg"
import shortenerImage from "@/assets/shortener.jpg"
import taarufImage from "@/assets/taaruf.jpg"
import weddingStuffImage from "@/assets/weddingStuff.jpg"
import yayasanNaikKelasImage from "@/assets/yayasanNaikKelas.jpg"

function getProjectImage(title: string): string {
    const imageMap: Record<string, string> = {
        "FounderPlus  - Landing Page i18n Super Cepat": fonderPlusImage,
        "Kajian  - Daftar Kajian Islam": kajianImage,
        "Jadwal KRL Solo Jogja  - Pencarian Interaktif": jadwalKRLImage,
        "Jadwal KRL  - Pencarian Jadwal Kereta": jadwalKRLImage,
        "May Learnings Dashboard  - Analisis Twitter Campaign": maylearningImage,
        "AI Chat Taaruf  - Perantara Taaruf": taarufImage,
        "Referensi Kutub  - Mazhab Syafi'i & Hanbali": referensiImage,
        "Arbain  - Koleksi 40 Hadits": arbainImage,
        "Eklinik  - Manajemen Klinik Digital": eklinikImage,
        "Murunah  - Platform Pembelajaran Al‑Quran": murunahImage,
        "Presensi  - Geolocation Check‑in/out": presensiImage,
        "Shortener  - URL Shortener + Analytics": shortenerImage,
        "Yayasan Naik Kelas  - Donasi & Program Pendidikan": yayasanNaikKelasImage,
        "Compress  - Image Compressor Client‑side": Kompressor,
        "Qlm One  - Link‑in‑bio + Canvas Ucapan": canvasImage,
        "Sistem Perpajakan AMIKOM (2023)  - UI Frontend": amikomImage,
        "Zikir & Doa  - App Mobile & Web": ZikirAppImage,
        "Pokemon Go Clone  - Nearby & Catch": pokemonImage,
    }

    return imageMap[title] || productManagementImage
}

function useClipboard() {
    const [copiedKey, setCopiedKey] = useState<string | null>(null)
    const copy = async (key: string, text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedKey(key)
            setTimeout(() => setCopiedKey(null), 1200)
        } catch {
            // no-op
        }
    }
    return { copiedKey, copy }
}



async function downloadPDF() {
    await generatePDF({
        filename: 'Ibrahim-Nurul-Huda-Portfolio-PM',
        title: 'Ibrahim Nurul Huda - Product Management Portfolio',
        includeHeader: true,
        includeFooter: true,
        customCSS: `
            /* Portfolio-specific PDF styles */
            .bg-emerald-600 {
                background-color: #059669 !important;
                color: white !important;
            }
            
            .text-emerald-600 {
                color: #059669 !important;
            }
            
            /* Ensure project images are properly sized */
            .aspect-\\[16\\/9\\] img {
                width: 100% !important;
                max-width: 200px !important;
                height: auto !important;
            }
        `
    });
}

function Section(props: {
    id?: string
    title?: string
    description?: string
    className?: string
    children?: React.ReactNode
}) {
    const { id = "", title = "", description = "", className = "", children = null } = props
    return (
        <section id={id} className={cn("scroll-mt-24", className)}>
            {title ? (
                <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
                    {description ? <p className="text-muted-foreground mt-2">{description}</p> : null}
                </div>
            ) : null}
            {children}
        </section>
    )
}




function ContactBar() {
    const { copiedKey, copy } = useClipboard()
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => copy("email", portfolio.contact.email)} className="group">
                {copiedKey === "email" ? (
                    <Check className="mr-2 h-4 w-4 text-emerald-600" />
                ) : (
                    <Mail className="mr-2 h-4 w-4" />
                )}
                {portfolio.contact.email}
            </Button>
            <Button variant="outline" size="sm" onClick={() => copy("phone", portfolio.contact.phone)} className="group">
                {copiedKey === "phone" ? (
                    <Check className="mr-2 h-4 w-4 text-emerald-600" />
                ) : (
                    <Phone className="mr-2 h-4 w-4" />
                )}
                {portfolio.contact.phone}
            </Button>
            <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                </Button>
            </a>
            <a href={portfolio.contact.website} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">
                    <Globe className="mr-2 h-4 w-4" />
                    sarbeh.com
                </Button>
            </a>
            <div className="ml-auto flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {portfolio.contact.location}
            </div>
        </div>
    )
}

function ProjectsGrid() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.projects.map((p) => (
                <Card key={p.title} className="group overflow-hidden">
                    <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                            src={getProjectImage(p.title)}
                            alt={p.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                    </div>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{p.title}</CardTitle>
                            <Badge variant={p.status === "Live" ? "default" : p.status === "Private" ? "secondary" : "outline"}>
                                {p.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                            {p.tech.slice(0, 6).map((t) => (
                                <Badge key={t} variant="outline">
                                    {t}
                                </Badge>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                                {p.tags.map((t) => (
                                    <span key={t} className="mr-2">
                                        #{t}
                                    </span>
                                ))}
                            </div>
                            {p.link ? (
                                <a href={p.link} target="_blank" rel="noreferrer">
                                    <Button variant="ghost" size="sm">
                                        Lihat <ArrowRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </a>
                            ) : null}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

function CaseStudies() {
    const items = portfolio.caseStudies
    return (
        <Accordion type="multiple" className="w-full">
            {items.map((c) => (
                <AccordionItem key={c.id} value={c.id}>
                    <AccordionTrigger className="text-left">{c.title}</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Situasi & Tugas</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground space-y-2">
                                    <p>
                                        <strong>Situation:</strong> {c.situation}
                                    </p>
                                    <p>
                                        <strong>Task:</strong> {c.task}
                                    </p>
                                    <p>
                                        <strong>Constraints:</strong> {c.constraints}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Strategi</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    <ul className="list-disc pl-5 space-y-1">
                                        {c.strategy.map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Solusi (MVP) & Delivery</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground space-y-3">
                                    <div>
                                        <div className="font-medium">Solution (MVP)</div>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {c.solution.map((s, i) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="font-medium">Delivery</div>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {c.delivery.map((s, i) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Measurement & Results</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground space-y-3">
                                    <div>
                                        <div className="font-medium">Experiment/Measurement</div>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {c.measurement.map((s, i) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="font-medium">Results</div>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {c.results.map((s, i) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    {c.extras?.length ? (
                                        <div>
                                            <div className="font-medium">Ringkasan/Lainnya</div>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {c.extras.map((s, i) => (
                                                    <li key={i}>{s}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : null}
                                    {c.next?.length ? (
                                        <div>
                                            <div className="font-medium">Next</div>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {c.next.map((s, i) => (
                                                    <li key={i}>{s}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : null}
                                </CardContent>
                            </Card>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default function ClientPage() {
    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth"
        return () => {
            document.documentElement.style.scrollBehavior = ""
        }
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto max-w-7xl px-4 pt-28 md:pt-36 pb-24">
                {/* HERO */}
                <Section id="about" className="pt-10 md:pt-16">
                    <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <Badge className="bg-emerald-600 hover:bg-emerald-700">Product Management  - Internship</Badge>
                            <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">Ibrahim Nurul Huda</h1>
                            <p className="mt-3 max-w-2xl text-base md:text-lg text-muted-foreground">
                                Founder‑minded PM Intern yang membangun, mengukur, dan beriterasi cepat. Fokus pada discovery yang
                                disiplin, delivery yang cepat namun terukur, dan alignment lintas fungsi yang rapi.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge variant="outline">Agile + Shape Up</Badge>
                                <Badge variant="outline">Ship  to Measure  to Adjust</Badge>
                                <Badge variant="outline">Engineer × Product Builder</Badge>
                                <Badge variant="outline">Jabodetabek, ID</Badge>
                            </div>
                            <div className="mt-6">
                                <ContactBar />
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a href="#projects">
                                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                                        Lihat Proyek <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </a>
                                <a href="#cases">
                                    <Button variant="outline">Studi Kasus</Button>
                                </a>
                                <Button variant="outline" onClick={downloadPDF} className="no-print">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Card className="overflow-hidden">
                                <div className="relative w-full">
                                    <img
                                        src={productManagementImage}
                                        alt="Ilustrasi kerja produk"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-3">
                                        <Rocket className="h-5 w-5 text-emerald-600 mt-0.5" />
                                        <div>
                                            <div className="font-medium">Filosofi Eksekusi</div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Product management bagi saya adalah panggilan untuk memiliki masalah secara mendalam dan
                                                menyelesaikannya tuntas -bukan ticket taking. Saya membangun, mengukur, dan menyesuaikan cepat
                                                dengan disiplin discovery dan guardrails anti "feeling only".
                                            </p>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Shield className="h-4 w-4 text-emerald-600" />
                                            Ownership penuh
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <NotebookPen className="h-4 w-4 text-emerald-600" />
                                            Discovery disiplin
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <LineChart className="h-4 w-4 text-emerald-600" />
                                            Data‑driven
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Section>

                {/* NARRATIVE FULL */}
                <Section
                    id="narrative"
                    title="Narasi Lengkap"
                    description="Tidak disederhanakan  - seluruh detail dan konteks yang relevan."
                    className="mt-10 md:mt-16"
                >
                    <div className="space-y-8">
                        <section>
                            <h3 className="text-lg md:text-xl font-semibold">Filosofi & Pengalaman Founder</h3>
                            <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                                {portfolio.narrative.philosophy.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg md:text-xl font-semibold">Co‑creation yang Terstruktur</h3>
                            <p className="mt-3 text-sm text-muted-foreground">{portfolio.narrative.coCreation.intro}</p>
                            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {portfolio.narrative.coCreation.disciplines.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg md:text-xl font-semibold">Gaya Kerja: Agile + Shape Up</h3>
                            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {portfolio.narrative.teamStyle.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg md:text-xl font-semibold">Learning Focus (Ongoing)</h3>
                            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {portfolio.narrative.learningFocus.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg md:text-xl font-semibold">Guardrails Anti "Feeling Only"</h3>
                            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {portfolio.narrative.guardrails.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </Section>

                {/* PROOF POINTS */}
                <Section
                    id="proof"
                    title="Proof Points"
                    description="Angka nyata dari proyek yang saya pegang  - tanpa disederhanakan."
                    className="mt-10 md:mt-16"
                >
                    <div className="space-y-6">
                        {portfolio.proofDetails.map((pd, i) => (
                            <section key={i}>
                                <h3 className="text-base md:text-lg font-semibold">{pd.title}</h3>
                                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                    {pd.points.map((pt, j) => (
                                        <li key={j}>{pt}</li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </Section>

                {/* SKILLS */}
                <Section
                    id="skills"
                    title="Skills Snapshot"
                    description="Discovery  to Prioritization  to Delivery  to Analytics  to Growth  to Tech Fluency  to Communication  to SaaS Research  to Leadership"
                    className="mt-10 md:mt-16"
                >
                    <div className="space-y-8">
                        {portfolio.skills.map((s) => (
                            <section key={s.key}>
                                <h3 className="text-base md:text-lg font-semibold">{s.name}</h3>
                                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{s.summary}</p>
                                <div className="mt-2">
                                    <div className="text-sm font-medium">Output:</div>
                                    <ul className="mt-1 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                        {s.outputs.map((o, i) => (
                                            <li key={i}>{o}</li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        ))}

                        <section>
                            <h3 className="text-base md:text-lg font-semibold">Tooling & Tech Stack</h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {portfolio.tools.map((t) => (
                                    <span
                                        key={t}
                                        className="inline-flex items-center rounded-md border px-2 py-1 text-xs text-muted-foreground"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                </Section>
                {/* CASE STUDIES */}
                <Section
                    id="cases"
                    title="Studi Kasus Inti"
                    description="Situasi  to Strategi  to Solusi  to Delivery  to Measurement  to Results (plus ringkasan angka bila ada)."
                    className="mt-10 md:mt-16"
                >
                    <CaseStudies />
                </Section>
                {/* PROJECTS */}
                <Section
                    id="projects"
                    title="Katalog Proyek (Ringkas, Lengkap)"
                    description="Daftar lengkap lintas kategori  - fokus pada dampak dan pembelajaran."
                    className="mt-10 md:mt-16"
                >
                    <ProjectsGrid />
                </Section>



                {/* LEADERSHIP */}
                <Section
                    id="leadership"
                    title="Kepemimpinan & Kolaborasi"
                    description="Co‑creation, fasilitasi keputusan, dan ritme eksekusi."
                    className="mt-10 md:mt-16"
                >
                    <Card>
                        <CardContent className="p-6 text-sm text-muted-foreground">
                            <p>{portfolio.leadership.intro}</p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                {portfolio.leadership.points.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </Section>

                {/* CONTACT */}
                <Section
                    id="contact"
                    title="Kontak & Ketersediaan"
                    description="Tertarik berdiskusi atau kolaborasi? Saya siap berkontribusi sejak hari pertama."
                    className="mt-10 md:mt-16 mb-16"
                >
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                                <div>
                                    <div className="text-lg font-medium">
                                        Co‑creation yang terstruktur, eksekusi pragmatis, dan kepemilikan penuh.
                                    </div>
                                    <p className="text-muted-foreground mt-1">
                                        Prefer tim kecil dengan ritme Agile + Shape Up. Lokasi: Jabodetabek, Indonesia.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <a href={`mailto:${portfolio.contact.email}`}>
                                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                                            <Mail className="mr-2 h-4 w-4" />
                                            Email
                                        </Button>
                                    </a>
                                    <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">
                                        <Button variant="outline">
                                            <Linkedin className="mr-2 h-4 w-4" />
                                            LinkedIn
                                        </Button>
                                    </a>
                                    <a href={portfolio.contact.website} target="_blank" rel="noreferrer">
                                        <Button variant="outline">
                                            <Globe className="mr-2 h-4 w-4" />
                                            sarbeh.com
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Section>
            </main>

            <footer className="border-t">
                <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
                    <div>
                        © {new Date().getFullYear()} {portfolio.contact.name}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span>Built with Next.js + shadcn/ui</span>
                        <span className="hidden md:inline">•</span>
                        <a href="#about" className="hover:underline">
                            Kembali ke atas
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
