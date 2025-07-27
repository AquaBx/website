import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import type { Section } from "./types";


let profile = {
    name: "Tom Chauvel",
    address: { value: "14 La Noë, 35740 Pacé, France", url: "https://maps.google.com/?q=14+La+Noë,+35740+Pacé,+France" },
    website: { value: "www.aquabx.ovh", url: "https://www.aquabx.ovh/" },
    phone: { value: "+33601846944", url: "tel:+33601846944" },
    email: { value: "tom.chauvel@hotmail.com", url: "mailto:tom.chauvel@hotmail.com" },
    linkedin: { value: "linkedin.com/in/tom-chauvel", url: "https://www.linkedin.com/in/tom-chauvel" },
    github: { value: "github.com/aquabx", url: "https://github.com/aquabx" },
    avatar: "/moi.png",
    summary: "Étudiant curieux en 2ème année à l’ESIR, je recherche un stage de fin d’études ou un contrat de professionnalisation dans le développement web full-stack."
};


function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
        ? dateStr
        : date.toLocaleDateString("fr-FR", { month: "2-digit", year: "numeric" });
}

function formatDateRange(start?: string, end?: string): string {
    if (start && end) return `${formatDate(start)} – ${formatDate(end)}`;
    if (start) return `Depuis ${formatDate(start)}`;
    if (end) return `Jusqu'à ${formatDate(end)}`;
    return "";
}

function mergeCategories(projects: { [k: string]: string[] }[]): { [k: string]: string[] } {
    return projects.reduce((acc, curr) => {
        for (const [key, values] of Object.entries(curr.categories || {})) {
            acc[key] = Array.from(new Set([...(acc[key] || []), ...values]));
        }
        return acc;
    }, {} as { [k: string]: string[] });
}



export async function generatePDF(data: { [section: string]: Section }) {

    const left: any[] = [];
    const right: any[] = [];

    // 🟦 Profil
    left.push({
        image: await generateImage(profile.avatar, 0.5),
        width: 100,
        height: 100,
        alignment: 'center',
        style: 'profilePic'
    });

    left.push({ style: "h1", text: profile.name });
    left.push({ style: "h2", text: "Résumé" });
    left.push({ style: "p", text: profile.summary });

    left.push({ style: "h2", text: "Coordonnées" });
    left.push({
        style: "p",
        ul: [

            [{ text: profile.address.value, link: profile.address.url }],
            [{ text: profile.email.value, link: profile.email.url }],
            [{ text: profile.github.value, link: profile.github.url }],
            [{ text: profile.linkedin.value, link: profile.linkedin.url }],
            [{ text: profile.phone.value, link: profile.phone.url }],
            [{ text: profile.website.value, link: profile.website.url }],
        ]
    });


    left.push({ style: "h2", text: "Langues" });
    left.push({
        style: "p",
        ul: [
            { text: [{ style: "emoji", text: "🇫🇷" }, { text: " Français - Natif" }] },
            { text: [{ style: "emoji", text: "🇬🇧" }, { text: " Anglais - C1" }] },
            { text: [{ style: "emoji", text: "🇪🇸" }, { text: " Espagnol - B1" }] },
            { text: [{ style: "emoji", text: "🇵🇱" }, { text: " Polonais - Notions" }] }
        ]
    });

    left.push({ style: "h2", text: "Diplômes et certifications" });
    left.push({
        style: "p",
        ul: [
            "Toeic (2024) – 965 / 990",
            "Baccalauréat (2021) – Mention Très Bien",
            "Sensibilisation aux ODD",
            "Permis B",
            "PSC1"
        ]
    });

    left.push({ style: "h2", text: "Compétences" });
    const skills = mergeCategories(data["projects"]);
    Object.entries(skills).forEach(([key, values]) => {
        left.push([{ style: "h3", text: `${key}` }, {
            text: `${values.join(", ")}`,
            style: "p"
        }],
        );
    });

    // 🧾 Sections dynamiques (expériences, projets, etc.)
    for (const section of Object.values(data)) {
        if (section.every(row => !row.shown)) continue;

        right.push({ style: "h2", text: section.name });

        for (const row of section) {
            if (!row.shown) continue;

            right.push({ style: "h3", text: row.name });

            if (row.location) {
                right.push(
                    {
                        style: "p",
                        text: [
                            { style: "emoji", text: "📍" },
                            { text: " " + row.location }
                        ]
                    }
                );
            }

            for (const date of row.dates) {
                right.push(
                    {
                        style: "p",
                        text: [
                            { style: "emoji", text: "📅" },
                            { text: ` ${formatDateRange(date.start, date.end)}` }
                        ]
                    }
                )
            }

            if (row.description) {
                right.push({ style: "p", text: row.description });
            }

            if (row.categories) {
                const categoryRows = Object.entries(row.categories).map(
                    ([key, values]) => [{ bold: true, text: `${key} :` }, values.join(", ")]
                );

                right.push({
                    layout: 'noBorders',
                    style: 'tableCategories',
                    table: {
                        widths: [45, '*'],
                        body: categoryRows,
                    }
                });
            }
        }
    }

    const dd = {
        pageMargins: [0, 0, 0, 0],
        content: [
            {
                table: {
                    widths: [180, '*'],
                    body: [
                        [
                            {
                                stack: left,
                                fillColor: '#3587da',
                                color: 'white',
                                margin: [12, 12, 12, 12]
                            },
                            {
                                stack: right,
                                margin: [12, 12, 12, 12]
                            }
                        ]
                    ]
                },
                layout: 'noBorders'
            }
        ],
        styles: {
            h1: { fontSize: 14, bold: true, margin: [0, 4], alignment: 'center' },
            h2: { fontSize: 10, bold: true, margin: [0, 2] },
            h3: { fontSize: 8, bold: true, margin: [0, 1] },
            p: { fontSize: 6, margin: [0, 2] },
            tableCategories: { fontSize: 6, margin: [0, 1] },
            profilePic: { margin: [0, 10, 0, 10] },
            emoji: { font: 'NotoEmoji' }
        }
        ,
        defaultStyle: {
            font: 'NotoSans'
        }
    };

    pdfMake.fonts = {
        NotoSans: {
            normal: window.origin + "/NotoSans-VariableFont_wdth,wght.ttf",
            bold: window.origin + "/NotoSans-VariableFont_wdth,wght.ttf",
            italics: window.origin + "/NotoSans-Italic-VariableFont_wdth,wght.ttf",
            bolditalics: window.origin + "/NotoSans-Italic-VariableFont_wdth,wght.ttf",
        },

        NotoEmoji: {
            normal: window.origin + "/NotoEmoji-VariableFont_wght.ttf",
            bold: window.origin + "/NotoEmoji-VariableFont_wght.ttf",
        },
    }

    return new Promise((res,rej) =>{
        pdfMake.createPdf(dd).getBlob((blob) => {
            res(URL.createObjectURL(blob))
        });
    })

}

async function generateImage(src, r) {
    const img = new Image();
    img.src = src;

    await new Promise(resolve => { img.onload = resolve; console.log(img.sizes) });

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 200;
    const ctx = canvas.getContext("2d")!;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width * r, canvas.width * r, canvas.width * r, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    return canvas.toDataURL("image/PNG")
}