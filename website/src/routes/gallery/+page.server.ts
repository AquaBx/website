import type { PostIn, PostOut } from "$lib/types"

export const csr = true

async function getAll() {
    const paths = import.meta.glob(`$content/photos/**/*.svx`, {
        eager: true,
    })

    const images = import.meta.glob(`$content/photos/**/*`, {
        eager: true,
        query: { enhanced: true, w: "1280; 800; 400" }
    })

    // Map images by their filename for quick lookup
    const imagesByFilename = Object.entries(images).reduce((acc, [path, value]) => {
        const filename = path.split('/').pop() || path;
        acc[filename] = (value as any).default;
        return acc;
    }, {} as Record<string, any>);

    const posts: PostOut[] = [];

    for (const path in paths) {
        const file = paths[path] as any;
        if (file?.metadata) {
            const metadata = file.metadata as PostIn;
            if (metadata.sources?.length > 0) {
                const postImages = metadata.sources.map((src) => ({
                    src: imagesByFilename[src],
                    alt: metadata.title || "Gallery image"
                })).filter(img => img.src); // Ensure image was found
                
                if (postImages.length > 0) {
                    posts.push({ ...metadata, images: postImages });
                }
            }
        }
    }
    return posts;
}

export async function load() {
    const items = await getAll()
    return { items }
}
