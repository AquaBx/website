// --- Configuration des couleurs (Palette Tailwind Sky & Slate) ---
#let sky_900 = rgb("#0c4a6e")
#let sky_800 = rgb("#075985")
#let sky_700 = rgb("#0369a1")
#let sky_600 = rgb("#0284c7")
#let sky_500 = rgb("#0ea5e9")
#let sky_200 = rgb("#bae6fd")
#let gray_200 = rgb("#e5e7eb")
#let white = rgb("#ffffff")

// --- Fonctions utilitaires de style ---

// Titre de section colonne de gauche (Style: border-l-4 border-sky-200)
#let aside_heading(body) = {
  v(8pt)
  block(
    stroke: (left: 4pt + sky_200),
    inset: (left: 8pt),
    width: 100%,
    text(fill: sky_800, weight: "bold", size: 9pt, tracking: 1pt, upper(body))
  )
  v(4pt)
}

// Titre de section principale (Style: border-b-2 border-sky-200 uppercase)
#let main_heading(body) = {
  v(12pt)
  block(
    width: 100%,
    stroke: (bottom: 2pt + sky_200),
    inset: (bottom: 4pt),
    below: 10pt,
    text(fill: sky_800, weight: "extrabold", size: 14pt, tracking: 0.5pt, upper(body))
  )
}

// --- Le Template Principal ---

#let cv_template(
  profile: (:),
  left_content: [],
  right_content: []
) = {
  // Configuration globale de la page
  set page(
    margin: (x: 1cm, y: 1cm), // Un peu de marge comme le p-4 de Tailwind
    fill: white
  )
  // Font similaire à "Inter" ou sans-serif clean
  set text(font: "Roboto", size: 9pt, fill: black) 
  
  // Layout principal : Grille 2 colonnes avec espace
  grid(
    columns: (30%, 1fr), // ~8cm pour la gauche, le reste pour la droite
    gutter: 16pt, // gap-4

    // --- Colonne de Gauche (Sidebar style carte) ---
    rect(
      fill: white,
      stroke: 1pt + gray_200, // border border-gray-200
      radius: 12pt, // rounded-2xl
      width: 100%,
      inset: 16pt, // p-4
      [
        #set align(center)
        
        // Avatar avec effet "overflow hidden"
        #block(
          width: 90pt,
          height: 90pt,
          radius: 50%,
          clip: true,
          stroke: none,
          // Placeholder si pas d'image, sinon mettre image(profile.image)
          fill: gray_200, 
          [
             // Décommentez la ligne ci-dessous si vous avez l'image
             // #image("avatar.jpg", width: 100%, height: 100%, fit: "cover")
             #place(center + horizon, text(fill: white, size: 30pt, weight: "bold")[#profile.name.at(0)])
          ]
        )
        
        #v(12pt)
        
        // Nom
        #text(fill: sky_900, size: 22pt, weight: "extrabold", tracking: -0.5pt)[
          #profile.name
        ]
        
        #v(12pt)
        #line(length: 100%, stroke: 0.5pt + gray_200)
        #v(12pt)

        #set align(left)
        
        // Résumé
        #aside_heading("Résumé")
        #text(fill: sky_700, size: 8pt, style: "italic")[
          #profile.summary
        ]

        #v(8pt)
        #line(length: 100%, stroke: 0.5pt + gray_200)
        
        // Contact (Généré automatiquement depuis profile)
        #aside_heading("Contact")
        #set text(size: 8pt, fill: sky_700)
        #stack(dir: ttb, spacing: 6pt,
          if "address" in profile { 
            link(profile.address.url)[📍 #h(4pt) #profile.address.value] 
          },
          if "website" in profile { 
            link(profile.website.url)[🌐 #h(4pt) #profile.website.value] 
          },
          if "phone" in profile { 
            link(profile.phone.url)[📞 #h(4pt) #profile.phone.value] 
          },
          if "email" in profile { 
            link(profile.email.url)[✉️ #h(4pt) #profile.email.value] 
          },
          if "linkedin" in profile { 
            link(profile.linkedin.url)[🔗 #h(4pt) #profile.linkedin.value] 
          },
          if "github" in profile { 
            link(profile.github.url)[💻 #h(4pt) #profile.github.value] 
          }
        )

        #v(8pt)
        #line(length: 100%, stroke: 0.5pt + gray_200)

        // Contenu libre gauche (Compétences, Langues...)
        // L'utilisateur doit utiliser aside_heading() dans ce contenu s'il veut le même style
        #left_content
      ]
    ),

    // --- Colonne de Droite (Contenu Principal) ---
    block(
      width: 100%,
      [
        #set align(left)
        #right_content
      ]
    )
  )
}

// --- Composant pour une section (Post / CvBlock) ---
// Adapté pour ressembler à CvRow.svelte

#let section_item(title, items) = {
  if items.len() > 0 {
    // Titre de la catégorie (ex: EXPÉRIENCE)
    main_heading(title)
    
    // Liste des items
    stack(dir: ttb, spacing: 12pt,
      ..items.map(item => {
        if item.shown {
          block(width: 100%, breakable: true, [
            // Titre du poste (Sky-900, Bold)
            #text(fill: sky_900, weight: "bold", size: 11pt)[#item.name]
            
            // Lieu (Italic, Sky-600)
            #if item.location != none [
              #h(1fr) 
              #text(fill: sky_600, size: 9pt, style: "italic")[#item.location]
            ]
            
            // Dates (Mono, Sky-700) - Avec icône calendrier simulée
            #if item.dates != none [
              #block(above: 2pt, below: 4pt, [
                #set text(font: "Roboto Mono", fill: sky_700, size: 8pt)
                #for date in item.dates [
                  📅 #date.start 
                  #if date.end != none [ – #date.end ] else [ – Aujourd'hui]
                  #h(8pt)
                ]
              ])
            ]

            // Description (Sky-800)
            #if item.description != none [
              #text(fill: sky_800, size: 9pt)[
                #item.description
              ]
            ]
            
            // Tags / Catégories (Optionnel, style badge simple)
            #if item.categories != none and item.categories.len() > 0 {
              v(4pt)
              text(size: 7pt, fill: sky_600, weight: "bold")[
                #item.categories.values().join(", ")
              ]
            }
          ])
        }
      })
    )
  }
}