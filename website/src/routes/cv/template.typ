// --- Palette de couleurs (Charcoal Slate-900 / Sky / Slate) ---
#let slate_900 = rgb("#0f172a") // bg-slate-900
#let slate_800 = rgb("#1e293b") // bg-slate-800 / text-slate-800
#let slate_700 = rgb("#334155") // border-slate-700
#let slate_600 = rgb("#475569") // text-slate-600
#let slate_50 = rgb("#f8fafc")  // bg-slate-50
#let slate_100 = rgb("#f1f5f9") // border-slate-100
#let slate_500 = rgb("#64748b") // text-slate-500
#let slate_400 = rgb("#94a3b8") // text-slate-400
#let sky_400 = rgb("#38bdf8")   // text-sky-400 (badges, titres sidebar)
#let sky_600 = rgb("#0284c7")   // text-sky-600 (lieux)
#let white = rgb("#ffffff")

// --- SVG Icons (Lucide replica using raw bytes to avoid deprecation warnings) ---
#let icon_mappin(color) = image(bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"" + color.to-hex() + "\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>"))

#let icon_mail(color) = image(bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"" + color.to-hex() + "\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"/><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"/></svg>"))

#let icon_phone(color) = image(bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"" + color.to-hex() + "\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"/></svg>"))

#let icon_globe(color) = image(bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"" + color.to-hex() + "\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/><path d=\"M2 12h20\"/></svg>"))

#let icon_linkedin(color) = image(bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"" + color.to-hex() + "\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"/><rect width=\"4\" height=\"12\" x=\"2\" y=\"9\"/><circle cx=\"4\" cy=\"4\" r=\"2\"/></svg>"))

#let icon_github(color) = image(bytes("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"" + color.to-hex() + "\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4\"/><path d=\"M9 18c-4.51 2-5-2-7-2\"/></svg>"))

#let draw_icon(icon_fn, color: rgb("#cbd5e1")) = {
  box(
    width: 9pt,
    height: 9pt,
    baseline: 1.5pt,
    icon_fn(color)
  )
}

// --- Composants de la Sidebar (colonne de gauche) ---

// Titres de section dans la sidebar
#let aside_heading(body) = {
  v(12pt)
  text(fill: sky_400, weight: "black", size: 8pt, tracking: 1.5pt, upper(body))
  v(0pt)
}

// Élément de langue avec son badge
#let language_item(name, level) = {
  grid(
    columns: (1fr, auto),
    align: (left, horizon),
    text(fill: rgb("#cbd5e1"), size: 8.5pt)[#name],
    rect(
      fill: slate_800,
      radius: 6pt,
      inset: (x: 6pt, y: 3pt),
      stroke: none,
      text(fill: sky_400, size: 7pt, weight: "bold", tracking: 0.5pt)[#upper(level)]
    )
  )
}

// Élément de certification
#let cert_item(name, detail, year) = {
  block(width: 100%)[
    #text(fill: white, weight: "bold", size: 8.5pt)[#name]
    #if (detail != none and detail != "") or (year != none and year != "") [
      \
      #v(-2pt)
      #grid(
        columns: (1fr, auto),
        text(fill: rgb("#cbd5e1"), size: 8pt)[#detail],
        text(fill: rgb("#cbd5e1"), size: 8pt, style: "italic")[#year]
      )
    ]
  ]
}

// Badge de compétence (tag)
#let skill_tag(body) = {
  box(
    rect(
      fill: slate_800,
      stroke: 0.5pt + slate_700,
      radius: 3pt,
      inset: (x: 6pt, y: 4.5pt),
      text(fill: rgb("#e2e8f0"), size: 7.5pt)[#body]
    )
  )
}

// Groupe de compétences
#let skill_group(category, tags) = {
  block(width: 100%, [
    #text(fill: rgb("#bae6fd"), weight: "bold", size: 8pt, tracking: 0.5pt)[#upper(category)]
    #v(0pt)
    #box(width: 100%, [
      #for tag in tags {
      skill_tag(tag)
      h(3pt)
    }
    ])
  ])
}

// --- Composants de la colonne principale (colonne de droite) ---

// Titres de section principaux
#let main_heading(body) = {
  v(14pt)
  block(
    width: 100%,
    stroke: (bottom: 1pt + slate_100),
    inset: (bottom: 5pt),
    text(fill: slate_400, weight: "extrabold", size: 8.5pt, tracking: 1.5pt)[#upper(body)]
  )
  v(6pt)
}

// Élément d'expérience / projet (équivalent à CvRow.svelte)
#let entry_item(item) = {
  block(width: 100%, breakable: true, [
    // Ligne de titre et dates
    #grid(
      columns: (1fr, auto),
      align: (left, horizon),
      text(fill: slate_800, weight: "bold", size: 10.5pt)[#item.name],
      if "dates" in item and item.dates != none and item.dates.len() > 0 [
        #set text(fill: slate_400, size: 8pt, weight: "bold")
        #for date in item.dates [
          #date.start
          #if date.end != none [ – #date.end ] else [ – Présent ]
          #h(4pt)
        ]
      ]
    )
    
    // Lieu
    #if "location" in item and item.location != none and item.location != "" [
      #v(2pt)
      #text(fill: sky_600, size: 8pt, weight: "medium")[#draw_icon(icon_mappin, color: sky_600) #h(2pt) #item.location]
    ]
    
    // Description
    #if "description" in item and item.description != none and item.description != "" [
      #v(4pt)
      #text(fill: slate_600, size: 9pt)[#item.description]
    ]
    
    // Tags / Catégories de compétences associés
    #if "categories" in item and item.categories != none and item.categories.len() > 0 {
      v(0pt)
      let tags = item.categories.values().flatten()
      for tag in tags {
        box(
          rect(
            fill: slate_50,
            stroke: 0.5pt + slate_100,
            radius: 2pt,
            inset: (x: 5pt, y: 3pt),
            text(fill: slate_500, size: 7.5pt, weight: "medium")[#tag]
          )
        )
        h(3.5pt)
      }
    }
  ])
}

// Composant pour afficher une section complète (CV Block)
#let section_item(title, items) = {
  // Filtrer les éléments visibles
  let visible_items = items.filter(item => item.shown)
  if visible_items.len() > 0 {
    main_heading(title)
    v(4pt)
    stack(dir: ttb, spacing: 14pt,
      ..visible_items.map(item => entry_item(item))
    )
  }
}

// --- Le Template Principal ---

#let cv_template(
  profile: (:),
  left_content: [],
  right_content: []
) = {
  // Configuration globale de la page (Sidebar à gauche de 7.5cm peinte en arrière-plan)
  set page(
    paper: "a4",
    margin: (left: 7.5cm + 28pt, right: 28pt, top: 28pt, bottom: 28pt),
    fill: white,
    background: place(
      top + left,
      rect(
        fill: slate_900,
        width: 7.5cm,
        height: 100%,
        stroke: none
      )
    )
  )
  
  // Utilisation de la police Noto Sans préchargée (et fallback sans-serif)
  set text(font: ("Noto Sans", "sans-serif"), size: 9pt, fill: slate_800) 
  
  // Placer le contenu de la sidebar de façon absolue sur la première page
  place(
    top + left,
    dx: -(7.5cm + 28pt) + 22pt,
    dy: 0pt,
    block(
      width: 7.5cm - 44pt,
      [
        #set align(center)
        
        // Avatar circulaire avec bordure et fond sombre
        #block(
          width: 96pt,
          height: 96pt,
          radius: 50%,
          clip: true,
          stroke: 4pt + slate_700,
          fill: slate_800,
          [
             #if "avatar" in profile and profile.avatar != none and profile.avatar != "" [
               #let img_scale = if "avatar_scale" in profile { profile.avatar_scale } else { 1.8 }
               #let img_x = if "avatar_x" in profile { profile.avatar_x } else { 5 }
               #let img_y = if "avatar_y" in profile { profile.avatar_y } else { 10 }
               
               #let dx = 96pt * img_x / 100
               #let dy = 96pt * img_y / 100
               
               #place(
                 top + left,
                 dx: dx,
                 dy: dy,
                 scale(
                   x: img_scale * 100%,
                   y: img_scale * 100%,
                   image(profile.avatar, width: 96pt, height: 96pt, fit: "cover")
                 )
               )
             ] else [
               #place(center + horizon, text(fill: white, size: 36pt, weight: "bold")[#profile.name.at(0)])
             ]
          ]
        )
        
        #v(14pt)
        
        // Nom de l'utilisateur
        #text(fill: white, size: 16pt, weight: "bold", tracking: 0.5pt)[
          #upper(profile.name)
        ]
        
        #v(0pt)
        #rect(fill: sky_400, width: 36pt, height: 2.5pt, radius: 1.25pt)
        #v(0pt)

        #set align(left)
        
        // Coordonnées de Contact
        #aside_heading("Contact")
        #set text(size: 8.5pt, fill: rgb("#e2e8f0"))
        #stack(dir: ttb, spacing: 8pt,
          if "address" in profile and profile.address != none { 
            link(profile.address.url)[#draw_icon(icon_mappin) #h(5pt) #profile.address.value] 
          },
          if "email" in profile and profile.email != none { 
            link(profile.email.url)[#draw_icon(icon_mail) #h(5pt) #profile.email.value] 
          },
          if "phone" in profile and profile.phone != none { 
            link(profile.phone.url)[#draw_icon(icon_phone) #h(5pt) #profile.phone.value] 
          },
          if "website" in profile and profile.website != none { 
            link(profile.website.url)[#draw_icon(icon_globe) #h(5pt) #profile.website.value] 
          },
          if "linkedin" in profile and profile.linkedin != none { 
            link(profile.linkedin.url)[#draw_icon(icon_linkedin) #h(5pt) #profile.linkedin.value] 
          },
          if "github" in profile and profile.github != none { 
            link(profile.github.url)[#draw_icon(icon_github) #h(5pt) #profile.github.value] 
          }
        )

        // Langues
        #if "languages" in profile and profile.languages != none and profile.languages.len() > 0 {
          aside_heading("Langues")
          v(2pt)
          stack(
            dir: ttb,
            spacing: 8pt,
            ..profile.languages.map(lang => language_item(lang.name, lang.level))
          )
        }

        // Certifications
        #if "certifications" in profile and profile.certifications != none and profile.certifications.len() > 0 {
          aside_heading("Certifications")
          v(2pt)
          stack(
            dir: ttb,
            spacing: 8pt,
            ..profile.certifications.map(cert => {
              let detail = if "detail" in cert { cert.detail } else { none }
              let year = if "year" in cert { cert.year } else { none }
              cert_item(cert.name, detail, year)
            })
          )
        }

        // Compétences (extraites dynamiquement)
        #if "skills" in profile and profile.skills != none and profile.skills.len() > 0 {
          aside_heading("Compétences")
          v(2pt)
          stack(
            dir: ttb,
            spacing: 8pt,
            ..profile.skills.pairs().map(pair => {
              let (cat, tags) = pair
              skill_group(cat, tags)
            })
          )
        }

        #left_content
      ]
    )
  )

  // Le flux du contenu principal (colonne de droite) commence ici et peut faire un saut de page naturellement
  right_content
}