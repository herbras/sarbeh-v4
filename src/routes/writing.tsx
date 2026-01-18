import type { Route } from "./+types/writing";
import { WritingSection } from "@/components/Organism/WritingSection";
import { OGMeta } from "@/components/OGMeta";
import { StructuredData, createBreadcrumbSchema } from "@/components/StructuredData";
import { playSound } from "@/stores/app";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Tech Articles & Blog - Ibrahim Nurul Huda (sarbeh) | AI, Web Development, Islamic Tech" },
		{
			name: "description",
			content: "Read Ibrahim Nurul Huda's articles and insights on AI/ML, web development, React, Node.js, Islamic technology, SEO optimization, and modern software engineering practices. Expert perspectives on building AI SaaS platforms."
		}
	];
}

export default function Writing() {
	return (
		<>
			<OGMeta
				title="Tech Articles & Blog - Ibrahim Nurul Huda (sarbeh) | AI, Web Development, Islamic Tech"
				description="Read Ibrahim Nurul Huda's articles and insights on AI/ML, web development, React, Node.js, Islamic technology, SEO optimization, and modern software engineering practices. Expert perspectives on building AI SaaS platforms."
				path="/writing"
				type="website"
			/>
			
			<StructuredData data={createBreadcrumbSchema([
				{ name: "Home", url: "https://sarbeh.com" },
				{ name: "Writing", url: "https://sarbeh.com/writing" }
			])} />
			
			<div className="container mx-auto px-4 pt-28 md:pt-36 pb-24">
				<WritingSection onInteraction={playSound} />
			</div>
		</>
	);
} 