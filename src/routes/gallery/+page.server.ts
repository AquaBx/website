interface imgtype {
    src: string,
    alt: string
}

interface PostOut {
    images: imgtype[],
    title: string,
}

interface PostIn {
    sources: string[],
    title: string,
}

export const csr = true

async function getAll() {
    let posts: PostOut[] = []

    const paths = import.meta.glob(`$content/photos/**/*.svx`, {
        eager: true,
    })

    const images = import.meta.glob(`$content/photos/**/*`, {
        eager: true,
        query: { enhanced: true, w: "1280; 800; 400" }
    })

    // Convert absolute paths to filenames
    const imagesByFilename = Object.entries(images).reduce((acc, [path, value]) => {
        const filename = path.split('/').pop() || path;
        acc[filename] = value;
        return acc;
    }, {} as typeof images);

    for (let path in paths) {
        const file = paths[path]
        if (file && typeof file === 'object' && 'metadata' in file) {
            const metadata = file.metadata as PostIn
            if (metadata.sources.length > 0) {
                const images = metadata.sources.map((src) => {
                    return {
                        src:imagesByFilename[src].default,
                        alt:metadata.title
                    }
                })
                posts.push({ ...metadata, images })
            }
        }
    }
    return posts
}

export async function load() {
    const items = await getAll()
    return { items }
}