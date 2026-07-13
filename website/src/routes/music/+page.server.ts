export async function load() {
	const modules = import.meta.glob("../../lib/assets/musiques/*", { eager: true, import: "default" });

	interface musictype {
		src: string;
		caption?: string;
		cover?: string;
	}

	const library: musictype[] = [];

	for (const [path, url] of Object.entries(modules)) {
		library.push({
			src: url as string,
			caption: path.split("/").pop()?.replace(/\.[^/.]+$/, "") || ""
		});
	}

	return {
		library
	};
}