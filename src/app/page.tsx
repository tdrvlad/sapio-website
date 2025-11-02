import fs from "fs";
import path from "path";
import HomeContent from "@/components/HomeContent";

function getPublicImages(dir: string): string[] {
	try {
		const abs = path.join(process.cwd(), "public", dir);
		const files = fs.readdirSync(abs);
		return files
			.filter((f) => /\.(png|jpe?g|svg|webp)$/i.test(f))
			.map((f) => `/${dir}/${f}`);
	} catch {
		return [];
	}
}

export default function Home() {
	const clientLogos = getPublicImages("clients_logos");
	const techLogos = getPublicImages("tech_logos");

	return <HomeContent clientLogos={clientLogos} techLogos={techLogos} />
}
