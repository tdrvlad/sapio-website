import fs from 'fs';
import path from 'path';
import ServicesPageClient from './ServicesPageClient';

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

export default function ServicesPage() {
  const techLogos = getPublicImages("tech_logos");
  
  return <ServicesPageClient techLogos={techLogos} />;
}
