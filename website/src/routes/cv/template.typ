// --- Palette de couleurs (Charcoal Slate-900 / Sky / Slate) ---
#let slate_900 = rgb("#0f172a") // bg-slate-900 (Header Card)
#let slate_800 = rgb("#1e293b") // text-slate-800
#let slate_700 = rgb("#334155") // text-slate-700
#let slate_600 = rgb("#475569") // text-slate-600
#let slate_500 = rgb("#64748b") // text-slate-500
#let slate_400 = rgb("#94a3b8") // text-slate-400
#let slate_100 = rgb("#e2e8f0") // border-slate-100
#let slate_50 = rgb("#f8fafc")  // bg-slate-50 (tags background)
#let sky_400 = rgb("#38bdf8")   // text-sky-400 (Subtitle)
#let sky_600 = rgb("#0284c7")   // text-sky-600 (Icons/Location/Accent Lines)
#let sky_50 = rgb("#f0f9ff")    // modern badge background
#let sky_100 = rgb("#e0f2fe")   // modern badge border
#let sky_700 = rgb("#0369a1")   // modern badge text
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
    width: 8.5pt,
    height: 8.5pt,
    baseline: 1.5pt,
    icon_fn(color)
  )
}

// --- Main Column Headings ---
#let main_heading(body) = {
  v(12pt)
  block(
    width: 100%,
    inset: (bottom: 4pt),
    [
      #text(fill: slate_900, weight: "extrabold", size: 9.5pt, tracking: 1.2pt)[#upper(body)]
      #v(3pt)
      // Dual-colored line: short blue accent segment on the left, thin grey segment on the right
      #grid(
        columns: (40pt, 1fr),
        gutter: 0pt,
        line(length: 100%, stroke: 2pt + sky_600),
        line(length: 100%, stroke: 0.8pt + slate_100)
      )
    ]
  )
  v(4pt)
}

// --- Entry Rendering (Work / Projects / Studies) ---
#let entry_item(item) = {
  block(width: 100%, breakable: false, [
    // Header Row: Title & Dates
    #grid(
      columns: (1fr, auto),
      align: (left, horizon),
      text(fill: slate_900, weight: "bold", size: 10pt)[
        #item.name
        #if "location" in item and item.location != none and item.location != "" [
          #text(fill: slate_500, size: 8.5pt, weight: "medium", style: "italic")[  (#item.location)]
        ]
      ],
      if "dates" in item and item.dates != none and item.dates.len() > 0 [
        #set text(fill: slate_500, size: 8.5pt, weight: "semibold")
        #let date_str = ""
        #for date in item.dates {
          date_str = date.start
          if date.end != none {
            date_str = date_str + " – " + date.end
          } else {
            date_str = date_str + " – Present"
          }
        }
        #date_str
      ]
    )
    
    // Description (Bullet points parsing)
    #if "description" in item and item.description != none and item.description != "" [
      #v(2.5pt)
      #let desc = item.description
      #if desc.contains("•") [
        #set text(fill: slate_700, size: 9pt)
        #let items = desc.split("\n").filter(x => x.trim() != "")
        #for li in items [
          #let clean_li = li.replace("•", "").trim()
          #list.item[#clean_li]
        ]
      ] else [
        #text(fill: slate_700, size: 9pt)[#desc]
      ]
    ]
    
    // Skill tags associated with project/work (Premium Light-Blue styling)
    #if "categories" in item and item.categories != none and item.categories.len() > 0 {
      v(3pt)
      let tags = item.categories.values().flatten()
      for tag in tags {
        box(
          rect(
            fill: sky_50,
            stroke: 0.5pt + sky_100,
            radius: 2.5pt,
            inset: (x: 5pt, y: 3pt),
            text(fill: sky_700, size: 7.5pt, weight: "semibold")[#tag]
          )
        )
        h(3pt)
      }
    }
  ])
}

#let section_item(title, items) = {
  let visible_items = items.filter(item => item.shown)
  if visible_items.len() > 0 {
    main_heading(title)
    stack(dir: ttb, spacing: 10pt,
      ..visible_items.map(item => entry_item(item))
    )
  }
}

// --- The Main Template ---
#let cv_template(
  profile: (:),
  left_content: [],
  right_content: [],
  height: 31.5cm,
  header_bg: rgb("#0f172a"),
  header_text: rgb("#ffffff"),
  avatar_size: 80pt
) = [
  // Page Configuration: Customized taller single-page format (21cm x 31.5cm)
  #set page(
    width: 21.0cm,
    height: height,
    margin: (x: 0cm, top: 0cm, bottom: 1.0cm),
    fill: white,
  )
  
  #set text(font: ("Noto Sans", "sans-serif"), size: 9pt, fill: slate_800)
  
  // 1. Header (Full-Bleed banner, custom header background color)
  #block(
    width: 100%,
    fill: header_bg,
    stroke: none,
    inset: 1.1cm,
    [
      #grid(
        columns: (auto, 1fr),
        gutter: 20pt,
        align: (center + horizon, left + horizon),
        
        // Avatar block (left side of the header card, custom diameter size)
        block(
          width: avatar_size,
          height: avatar_size,
          radius: 50%,
          clip: true,
          stroke: 2.5pt + slate_700,
          fill: slate_800,
          [
             #if "avatar" in profile and profile.avatar != none and profile.avatar != "" [
                #let img_scale = if "avatar_scale" in profile { profile.avatar_scale } else { 1.8 }
                #let img_x = if "avatar_x" in profile { profile.avatar_x } else { 5 }
                #let img_y = if "avatar_y" in profile { profile.avatar_y } else { 10 }
                
                #let dx = avatar_size * img_x / 100
                #let dy = avatar_size * img_y / 100
                
                #place(
                  top + left,
                  dx: dx,
                  dy: dy,
                  scale(
                    x: img_scale * 100%,
                    y: img_scale * 100%,
                    image(profile.avatar, width: avatar_size, height: avatar_size, fit: "cover")
                  )
                )
             ] else [
                #place(center + horizon, text(fill: header_text, size: avatar_size * 0.3, weight: "bold")[#profile.name.at(0)])
             ]
          ]
        ),
        
        // Name and Contact info (right side of the header card)
        [
          #text(fill: header_text, size: 20pt, weight: "black", tracking: 0.5pt)[
            #upper(profile.name)
          ]
          #v(-2pt)
          #text(fill: sky_400, size: 10pt, weight: "bold", tracking: 1.2pt)[
            #upper("Software Engineer")
          ]
          #v(2pt)
          #text(fill: if header_text == white { slate_400 } else { header_text }, size: 7.5pt, weight: "bold", tracking: 0.5pt)[CONTACT DETAILS]
          #v(2pt)
          
          // Contact Info Line (2-column structured grid)
          #set text(size: 8pt, fill: header_text)
          #grid(
            columns: (1.1fr, 1fr),
            gutter: 6pt,
            if "email" in profile and profile.email != none {
              link(profile.email.url)[#draw_icon(icon_mail, color: header_text) #h(4pt) #profile.email.value]
            },
            if "phone" in profile and profile.phone != none {
              link(profile.phone.url)[#draw_icon(icon_phone, color: header_text) #h(4pt) #profile.phone.value]
            },
            if "linkedin" in profile and profile.linkedin != none {
              link(profile.linkedin.url)[#draw_icon(icon_linkedin, color: header_text) #h(4pt) #profile.linkedin.value]
            },
            if "github" in profile and profile.github != none {
              link(profile.github.url)[#draw_icon(icon_github, color: header_text) #h(4pt) #profile.github.value]
            },
            if "website" in profile and profile.website != none {
              link(profile.website.url)[#draw_icon(icon_globe, color: header_text) #h(4pt) #profile.website.value]
            },
            if "address" in profile and profile.address != none {
              link(profile.address.url)[#draw_icon(icon_mappin, color: header_text) #h(4pt) #profile.address.value]
            }
          )
        ]
      )
    ]
  )
  
  // Wrap the rest of the document content in padding to restore standard margins
  #pad(x: 1.1cm, top: 14pt, bottom: 0pt)[
    
    // Set custom list markers to sky-blue for premium details
    #set list(marker: text(fill: sky_600, weight: "bold")[•])
    
    // 2. Summary
    #if "summary" in profile and profile.summary != none and profile.summary != "" [
      #v(2pt)
      #text(fill: slate_700, size: 8.8pt)[#profile.summary]
    ]
    
    // 3. Dynamic Skills Section (structured grid with premium visual badges)
    #if "skills" in profile and profile.skills != none and profile.skills.len() > 0 [
      #main_heading("Skills")
      #stack(
        dir: ttb,
        spacing: 10pt,
        ..profile.skills.pairs().map(pair => {
          let (cat, tags) = pair
          grid(
            columns: (75pt, 1fr),
            gutter: 10pt,
            align: (left + horizon, left + horizon),
            text(weight: "bold", fill: slate_900, size: 8.5pt)[#cat],
            box(width: 100%, [
              #for tag in tags {
                box(
                  rect(
                    fill: sky_50,
                    stroke: 0.5pt + sky_100,
                    radius: 2.5pt,
                    inset: (x: 5pt, y: 3.5pt),
                    text(fill: sky_700, size: 7.5pt, weight: "semibold")[#tag]
                  )
                )
                h(3pt)
              }
            ])
          )
        })
      )
    ]
    
    // 4. Main content from Svelte (Experience, Projects, Education)
    #right_content
    
    // 5. Languages & Certifications (drawn at the bottom in a 2-column grid to save vertical space)
    #let has_langs = "languages" in profile and profile.languages != none and profile.languages.len() > 0
    #let has_certs = "certifications" in profile and profile.certifications != none and profile.certifications.len() > 0
    
    #if has_langs or has_certs [
      #grid(
        columns: (1fr, 1fr),
        gutter: 20pt,
        if has_langs [
          #main_heading("Languages")
          #stack(
            dir: ttb,
            spacing: 5pt,
            ..profile.languages.map(lang => block(width: 100%)[
              #text(weight: "bold", fill: slate_800, size: 8.8pt)[#lang.name] #h(2pt) — #text(fill: slate_600, size: 8.5pt)[#lang.level]
            ])
          )
        ],
        if has_certs [
          #main_heading("Certifications")
          #stack(
            dir: ttb,
            spacing: 5pt,
            ..profile.certifications.map(cert => block(width: 100%)[
              #text(weight: "bold", fill: slate_800, size: 8.8pt)[#cert.name]
              #if "detail" in cert and cert.detail != none and cert.detail != "" [ (#cert.detail) ]
              #if "year" in cert and cert.year != none and cert.year != "" [ — #text(style: "italic", fill: slate_500, size: 8pt)[#cert.year] ]
            ])
          )
        ]
      )
    ]
  ]
]