import type { Route } from "./+types/work";
import { WorkSection } from "@/components/Organism/WorkSection";
import { OGMeta } from "@/components/OGMeta";
import { StructuredData, createBreadcrumbSchema } from "@/components/StructuredData";
import { playSound } from "@/stores/app";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Professional Work & Projects - Ibrahim Nurul Huda (sarbeh) | React, AI, Islamic Tech" },
		{
			name: "description",
			content: "Explore Ibrahim Nurul Huda's professional portfolio including Bantu AI (50+ AI models), Islamic inheritance calculator, RAG library, and full-stack development projects using React, Node.js, Python, and AI/ML technologies."
		}
	];
}

export default function Work() {
	return (
		<>
			<OGMeta
				title="Professional Work & Projects - Ibrahim Nurul Huda (sarbeh) | React, AI, Islamic Tech"
				description="Explore Ibrahim Nurul Huda's professional portfolio including Bantu AI (50+ AI models), Islamic inheritance calculator, RAG library, and full-stack development projects using React, Node.js, Python, and AI/ML technologies."
				path="/work"
				type="website"
			/>
			
			<StructuredData data={createBreadcrumbSchema([
				{ name: "Home", url: "https://sarbeh.com" },
				{ name: "Work", url: "https://sarbeh.com/work" }
			])} />
			
			<div className="container mx-auto px-4 pt-28 md:pt-36 pb-24">
				<WorkSection onInteraction={playSound} />
			</div>
		</>
	);
} 