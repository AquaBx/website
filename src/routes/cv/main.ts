import type { Post } from "$lib/types";

type inputs = {
  title: string;
  categories: Post[]
}

export const main = (data) => {
  let {profile,categories} = data
  return `
#import "template.typ": cv_template, section_item

#show heading.where(level: 2): it => [
  #set text(size: 14pt, weight: "bold")
  #v(8pt)
  #it.body
  #v(4pt)
]

#cv_template(
  profile: (
    name: "${profile.name}",
    summary: "${profile.summary}",
    address: (value: "${profile.address.value}", url: "${profile.address.url}"),
    email: (value: "${profile.email.value}", url: "${profile.email.url}"),
    github: (value: "${profile.github.value}", url: "${profile.github.url}"),
    linkedin: (value: "${profile.linkedin.value}", url: "${profile.linkedin.url}")
  ),
  left_content: [
    #heading(level: 2, "Langues")
    #list(
      [🇫🇷 Français - Natif],
      [🇬🇧 Anglais - C1],
      [🇪🇸 Espagnol - B1]
    )
    
    #heading(level: 2, "Compétences")
    *Développement* \
    #text(size: 6pt)[React, Svelte, TypeScript, Node.js]
  ],
  right_content: [
    ${
      categories.map(cat => {
        return `
          #section_item("${cat.title}", (
            ${
              cat.categories.map(el => {
                return `(
                          name: "${el.name}",
                          dates: ${formatDates(el.dates)},
                          shown: ${el.shown},
                          description: ${el.description ? '"' + el.description + '"' : "none"},
                          location: ${el.location ? '"' + el.location + '"' : "none"},
                          categories: ${el.categories ? "none" : "none"},
                        )`
              }).join(",")
            }
          ))
        `
      }).join("\n")
    }
  ]
)
`
}


type dates = {
    start?: Date | undefined;
    end?: Date | undefined;
}[]

function formatDates(dates:dates) {
  return "(" + dates.map(d=>(`(start: ${'"' + (d.start ? d.start.getFullYear() : "Présent") + '"'}, end: ${'"' + (d.end ? d.end.getFullYear() : "Présent") + '"'})`)).join(",") + ",)"
}

// categories: ("Tech": ("React", "NestJS"), "Outils": ("Docker", "Git"))