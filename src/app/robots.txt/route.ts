export async function GET() {
	return new Response(
		`User-agent: *\nAllow: /\nSitemap: https://sapio.ro/sitemap.xml\n`,
		{ headers: { "Content-Type": "text/plain" } }
	);
}


