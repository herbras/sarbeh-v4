import { AboutSection } from "@/components/Organism/AboutSection";
import { FAQSection } from "@/components/Organism/FAQSection";
import { OGMeta } from "@/components/OGMeta";
import { StructuredData, createPersonSchema, createOrganizationSchema, createWebsiteSchema, createFAQSchema } from "@/components/StructuredData";
import { playSound } from "@/stores/app";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Ibrahim Nurul Huda (sarbeh) - AI & Web Development Expert | Islamic Tech Solutions" },
		{
			name: "description",
			content: "Ibrahim Nurul Huda (sarbeh) is a software engineer and founder of PT Cahaya Petunjuk Inovasi, specializing in AI/ML, React, Node.js, and Islamic technology solutions. Creator of Bantu AI - an AI SaaS platform with 50+ models bridging technology with Islamic principles.",
		},
	];
}

export default function Home() {
	// Memoized intersection observer hooks for animations to prevent re-creation
	const [heroRef, heroInView] = useInView({ 
		threshold: 0.3, 
		triggerOnce: true,
		rootMargin: '50px'
	});
	
	const [timelineRef, timelineInView] = useInView({ 
		threshold: 0.1, 
		triggerOnce: true,
		rootMargin: '100px'
	});

	// Memoize playSound to prevent re-creation
	const memoizedPlaySound = useMemo(() => playSound, []);

	return (
		<>
			<OGMeta
				title="Ibrahim Nurul Huda (sarbeh) - AI & Web Development Expert | Islamic Tech Solutions"
				description="Ibrahim Nurul Huda (sarbeh) is a software engineer and founder of PT Cahaya Petunjuk Inovasi, specializing in AI/ML, React, Node.js, and Islamic technology solutions. Creator of Bantu AI - an AI SaaS platform with 50+ models bridging technology with Islamic principles."
				path="/"
				type="website"
			/>
			
			<StructuredData data={[
				createPersonSchema(),
				createOrganizationSchema(),
				createWebsiteSchema(),
				createFAQSchema()
			]} />
			
			<div className="container mx-auto px-4 pt-28 md:pt-36 pb-24">
				<AboutSection 
					heroRef={heroRef} 
					heroInView={heroInView} 
					timelineRef={timelineRef} 
					timelineInView={timelineInView} 
					onInteraction={memoizedPlaySound}
				/>
				
				<FAQSection onInteraction={memoizedPlaySound} />
			</div>
		</>
	);
}
