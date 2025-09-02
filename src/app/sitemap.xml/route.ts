const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://sapio.ro";

export async function GET() {
	const urls = ["/", "/projects", "/team", "/chatbot", "/contact", "/services"].map((p) => `${ORIGIN}${p}`);
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
		urls.map((u) => `<url><loc>${u}</loc></url>`).join("") +
		`</urlset>`;
	return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}


