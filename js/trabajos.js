/* ═══════════════════════════════════════════════
   Trabajos — Camiloh
   Data-driven list + panels + i18n (ES/EN)
   ═══════════════════════════════════════════════ */

const PROJECTS = [
  {
    title: "Aloha", year: "2024", slug: "aloha",
    role: { es: "Simulación", en: "Simulation" },
    desc: {
      es: "VFX para el comercial de Aloha Cereza & Mandarina: un shot fresco donde el producto y el sabor se sienten.",
      en: "VFX for the Aloha Cherry & Mandarin commercial — a crisp shot where the product and the flavor almost feel real."
    },
    /* credits template — copy this array into any project:
       { role: "Animador 3D", name: "Camiloh", ig: "Camiloohh" }
       ig is the Instagram username without @ ; link is auto-built */
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Productora ejecutiva", name: "Sara Lucía", ig: "soysaralucia" },
      { role: "Coordinacion", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Director de animación", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Modelado/Iluminación", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Rigger", name: "Cristian Rangel", ig: "cristianrangel65" },
      { role: "Simulación de tela", name: "Camiloh", ig: "Camiloohh" },
      { role: "Composición", name: "Tomas Madrid", ig: "tomasmadridv" },
      { role: "Motion", name: "Alejandra Monroy", ig: "mariamoon_roy" },
      { role: "Color", name: "Cleyder Duque", ig: "cleyder_duque" },
      { role: "Audio", name: "Diego Caceres", ig: "dizeemills" },
      { role: "DP", name: "Andres Mauricio", ig: "comanchedp1" },
      { role: "AD", name: "Camilo Bahamon", ig: "camilobahamonj" },
      { role: "Producción de campo", name: "Alejo", ig: "alejo_de_lujo" },
      { role: "Arte", name: "Rodrigo Quintero", ig: "rodrigoquintero" },
      { role: "Vestuario", name: "Jesus Barrios", ig: "yisus___________" },
      { role: "Agencia", name: "Havas Colombia", ig: "havascolombia" },
    ],
    accent: "#ced449", rgb: "206,212,73", deep: "#767a1f", hue: "54deg"
  },
  {
    title: "Amper", year: "2026", slug: "amper", cat: "ia",
    role: { es: "Artista 3D y Artista de IA", en: "3D Artist and AI Artist" },
    desc: {
      es: "Pieza generada con IA para Amper Icee, explorando un look publicitario limpio y con mucha energía visual.",
      en: "AI-driven piece for Amper Icee, exploring a clean ad look with plenty of visual energy."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Coordinacion", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Director de animación", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Modelado/Iluminación", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Modelado/Iluminación", name: "Camiloh", ig: "Camiloohh" },
      { role: "Simulación", name: "Eugenio Herrera", ig: "eugenio_herrera_fx" },
      { role: "Composición", name: "Tomas Madrid", ig: "tomasmadridv" },
      { role: "Matchmove", name: "Will Pinzón", ig: "willguitars" },
    ],
    accent: "#b3d449", rgb: "179,212,73", deep: "#647a1f", hue: "65deg"
  },
  {
    title: "Auntie Anne's", year: "2023", slug: "auntie-annes",
    role: { es: "Iluminación y render", en: "Lighting & render" },
    desc: {
      es: "Campaña para Auntie Anne's con mirada puesta en el Mundial 2026: iluminación y render pensados para que el producto brille en pantalla.",
      en: "Campaign for Auntie Anne's aimed at the 2026 World Cup — lighting and render built so the product pops on screen."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Coordinacion", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Coordinacion", name: "Rafael Soto", ig: "rafacore_gs" },
      { role: "Animación 3D", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Modelado/Iluminación", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Modelado/Iluminación", name: "Camiloh", ig: "Camiloohh" },
      { role: "Composición", name: "Juan Aguirre", ig: "juanpa_00_" },
      { role: "Composición", name: "Tomas madrid", ig: "tomasmadridv" },
    ],
    accent: "#d4bf49", rgb: "212,191,73", deep: "#7a6c1f", hue: "42deg"
  },
  {
    title: "Avianca", year: "2025", slug: "avianca",
    role: { es: "Iluminación y render", en: "Lighting & render" },
    desc: {
      es: "CGI para una campaña de Avianca: atmósfera cuidada, materiales honestos y un acabado listo para broadcast.",
      en: "CGI for an Avianca campaign — careful atmosphere, honest materials, and a broadcast-ready finish."
    },
    credits: [
      { role: "Postproductora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Sebastian Mejía", ig: "dr_pancreas" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Coordinacion", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Animación 3D", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Animación 3D", name: "Camiloh", ig: "Camiloohh" },
      { role: "Modelado/Iluminación", name: "Camiloh", ig: "Camiloohh" },
      { role: "Composición", name: "Juan Aguirre", ig: "juanpa_00_" },
    ],
    accent: "#98d449", rgb: "152,212,73", deep: "#527a1f", hue: "77deg"
  },
  {
    title: "Brokix", year: "2025", slug: "brokix",
    role: { es: "Animación", en: "Animation" },
    desc: {
      es: "Animación 3D para la cancion de BROKIX Tu Eres Mala.",
      en: "3D animation for the BROKIX song Tu Eres Mala."
    },
    credits: [
      { role: "Dirección", name: "Rengi", ig: "rengi.enmarte" },
      { role: "Animación 3D", name: "Camiloh", ig: "Camiloohh" },
      { role: "Animación 3D", name: "Juanpa", ig: "_juanpa1399_" },
      { role: "Animación 3D", name: "Rengi", ig: "rengi.enmarte" },
      { role: "Modelado y Iluminación", name: "Rengi", ig: "rengi.enmarte" },
    ],
    accent: "#e9e9e9", rgb: "232,232,232", deep: "#757575", hue: "188deg"
  },
  {
    title: "Club Colombia", year: "2026", slug: "club-colombia", cat: "ia",
    role: { es: "Artista de IA", en: "AI Artist" },
    desc: {
      es: "Exploración visual con IA para Club Colombia, buscando un tono premium sin perder calidez.",
      en: "AI visual exploration for Club Colombia, aiming for a premium tone without losing warmth."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "María Monroy", ig: "mariamoon_roy" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Coordinacion", name: "Lorena Díaz", ig: "lore4714" },
      { role: "Generación de Imagenes", name: "Camiloh", ig: "Camiloohh" },
      { role: "Generación de Imagenes", name: "María Monroy", ig: "mariamoon_roy" },
      { role: "Generación de Imagenes", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Generación de Imagenes", name: "Maria Isabel Díez", ig: "mariaisabeldiezr" },
      { role: "Generación de Video", name: "Camiloh", ig: "Camiloohh" },
      { role: "Generación de Video", name: "María Monroy", ig: "mariamoon_roy" },
      { role: "Generación de Video", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Motion Graphics", name: "María Monroy", ig: "mariamoon_roy" },
      { role: "Edición", name: "Ivan Hernández", ig: "ivhega.exe" },
    ],
    accent: "#49b8d4", rgb: "73,184,212", deep: "#1f687a", hue: "183deg"
  },
  {
    title: "Cyzone", year: "2026", slug: "cyzone",
    role: { es: "Modelado, iluminación y render", en: "Modeling, lighting & render" },
    desc: {
      es: "Campaña del perfume Cyzone Illusion con Evaluna: modelado, luz y render para un mundo glam y contemporáneo.",
      en: "Campaign for Cyzone Illusion perfume with Evaluna — modeling, light and render for a glam, contemporary world."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Sebastian Mejía", ig: "dr_pancreas" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Coordinacion", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Modelado/Iluminación", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Modelado/Iluminación", name: "Camiloh", ig: "Camiloohh" },
      { role: "Animación 3D", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Animación 3D", name: "Camiloh", ig: "Camiloohh" },
      { role: "Composición", name: "Juan Aguirre", ig: "juanpa_00_" },
      { role: "Composición", name: "Tomas madrid", ig: "tomasmadridv" },
    ],
    accent: "#7cd449", rgb: "124,212,73", deep: "#407a1f", hue: "89deg"
  },
  {
    title: "Flytrap", year: "2025", slug: "flytrap",
    role: { es: "Generalista 3D", en: "3D generalist" },
    desc: {
      es: "Piezas publicitarias de juguetes para Flytrap.",
      en: "Toy ad pieces for Flytrap."
    },
    credits: [
      { role: "Artista 3D", name: "Camiloh", ig: "Camiloohh" },
    ],
    accent: "#7e49d4", rgb: "126,73,212", deep: "#421f7a", hue: "254deg"
  },
  {
    title: "Four Loko", year: "2026", slug: "four-loko",
    role: { es: "Modelado y animación", en: "Modeling & animation" },
    desc: {
      es: "Comercial para Four Loko Jackpot: modelado y animación con ritmo, color y un cierre que se queda en la cabeza.",
      en: "Commercial for Four Loko Jackpot — modeling and animation with rhythm, color, and a closer that sticks."
    },
    credits: [
      { role: "Director", name: "Jaime Restrepo", ig: "jaimerestrepo_tv" },
      { role: "Productora", name: "Diana Buitrago", ig: "dianacromatica" },
      { role: "Artista 3D", name: "Braviera", ig: "braviera" },
      { role: "Rigger", name: "Juan Ñahui", ig: "juanybabas" },
      { role: "Animación 3D", name: "Camiloh", ig: "Camiloohh" },
    ],
    accent: "#d44986", rgb: "212,73,134", deep: "#7a1f47", hue: "325deg"
  },
  {
    title: "Frunas", year: "2025", slug: "frunas",
    role: { es: "Modelado y texturizado", en: "Modeling & texturing" },
    desc: {
      es: "Campaña de Frunas para los nuevos sabores aciditos y dulcecitos.",
      en: "Frunas campaign for the new sour and sweet flavors."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Productora ejecutiva", name: "Sara Lucía", ig: "soysaralucia" },
      { role: "Coordinacion", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Generación de Imagenes", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Generación de Imagenes", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Generación de Video", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Generación de Video", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Generación de Video", name: "Alejandra Monroy", ig: "sebasgambeta" },
      { role: "Modelado/Textura/Iluminación", name: "Camiloh", ig: "mariamoon_roy" },
      { role: "Motion Graphics", name: "Alejandra Monroy", ig: "mariamoon_roy" },
      { role: "Audio", name: "Diego Caceres", ig: "dizeemills" },
      { role: "DP", name: "Juan Sáchica", ig: "juanpablosachica" },
      { role: "Agencia", name: "McCANN", ig: "mccann_colombia" },
    ],
    accent: "#49d44d", rgb: "73,212,77", deep: "#1f7a21", hue: "112deg"
  },
  {
    title: "Holcim", year: "2025", slug: "holcim",
    role: { es: "Modelado y texturizado", en: "Modeling & texturing" },
    desc: {
      es: "Campaña por los 70 años de Holcim: modelado y textura al servicio de una historia de marca sólida y cercana.",
      en: "Campaign for Holcim's 70th anniversary — modeling and texture in service of a solid, approachable brand story."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Coordinacion", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Director de animación", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Modelado/Iluminación", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Rigger", name: "Cristian Rangel", ig: "cristianrangel65" },
      { role: "Modelado/Textura", name: "Angie Rubiano", ig: "/" },
      { role: "Modelado/Textura", name: "Camiloh", ig: "Camiloohh" },
      { role: "Composición", name: "Juan Aguirre", ig: "juanpa_00_" },
      { role: "Motion", name: "Alejandra Monroy", ig: "mariamoon_roy" },
    ],
    accent: "#49d468", rgb: "73,212,104", deep: "#1f7a33", hue: "124deg"
  },
  {
    title: "Joaqui", year: "2025", slug: "joaqui",
    role: { es: "Modelado y texturizado", en: "Modeling & texturing" },
    desc: {
      es: "Visuales para el show de La Joaqui en Buenos Aires 2025: assets 3D listos para escenario y pantalla grande.",
      en: "Visuals for La Joaqui's Buenos Aires 2025 show — 3D assets ready for stage and big screens."
    },
    credits: [
      { role: "Directora", name: "Julia Conde", ig: "julitaconde" },
      { role: "Productora", name: "Ivanna Watnik", ig: "_darussian" },
      { role: "Edición", name: "Felipe Monguillot", ig: "shotbyfmb" },
      { role: "Motion", name: "Andrés Alexander", ig: "eeffes" },
      { role: "Composición", name: "Andrés Alexander", ig: "eeffes" },
      { role: "Diseño Grafico", name: "Fabri Orellano", ig: "fabri.denis" },
      { role: "Artista 3D", name: "Camiloh", ig: "Camiloohh" },
    ],
    accent: "#b549d4", rgb: "181,73,212", deep: "#661f7a", hue: "278deg"
  },
  {
    title: "Kinderland", year: "2025", slug: "kinderland",
    role: { es: "Iluminación y render", en: "Lighting & render" },
    desc: {
      es: "Pieza publicitaria para la tienda de juguetes Kinderland: color, luz y un acabado que invita a jugar.",
      en: "Ad piece for the Kinderland toy store — color, light, and a finish that invites you to play."
    },
    credits: [
      { role: "Directora", name: "Julia Conde", ig: "julitaconde" },
      { role: "Productora", name: "Ivanna Watnik", ig: "_darussian" },
      { role: "Artista 3D", name: "Cris", ig: "criswallss" },
      { role: "Artista 3D", name: "Camiloh", ig: "Camiloohh" },
      { role: "Habían mas Artistas pero no los encontré y ya no me acuerdo tampoco😢", name: "si ves esto y participaste escribeme al dm!", ig: "Camiloohh" },
    ],
    accent: "#4966d4", rgb: "73,102,212", deep: "#1f327a", hue: "219deg"
  },
  {
    title: "Knak", year: "2025", slug: "knak",
    role: { es: "Modelado, texturizado e iluminación", en: "Modeling, texturing & lighting" },
    desc: {
      es: "Visuales para el show en vivo de KNAK: un paquete 3D con presencia escénica y cuidado al detalle.",
      en: "Visuals for KNAK's live show — a 3D package with stage presence and careful detail."
    },
    credits: [
      { role: "Directora", name: "Ivanna Watnik", ig: "_darussian" },
      { role: "Asistente de dirección", name: "indajaus", ig: "indajaus._" },
      { role: "Artista 3D", name: "indajaus", ig: "indajaus._" },
      { role: "Artista 3D", name: "Camiloh", ig: "Camiloohh" },
      { role: "Artista 3D", name: "Fede Yoma", ig: "f.e.y._" },
      { role: "Artista 3D", name: "Ezequiel Semczyszyn", ig: "batifbx" },
      { role: "Motion, Comp y edit", name: "indajaus", ig: "indajaus._" },
      { role: "Motion, Comp y edit", name: "Luka verm", ig: "vermithg" },
      { role: "Motion, Comp y edit", name: "Fede Yoma", ig: "f.e.y._" },
      { role: "Motion, Comp y edit", name: "Ezequiel Semczyszyn", ig: "batifbx" },
      { role: "Motion, Comp y edit", name: "Nicolás Martins", ig: "1337.png" },
      { role: "Motion, Comp y edit", name: "Ignacio Garin", ig: "garinignacio" },
    ],
    accent: "#494bd4", rgb: "73,75,212", deep: "#1f207a", hue: "230deg"
  },
  {
    title: "Late del Sur", year: "2026", slug: "late-del-sur", cat: "ia",
    role: { es: "Artista de IA", en: "AI Artist" },
    desc: {
      es: "Video musical con IA para los Juegos Suramericanos, interpretado por Capi y Soledad.",
      en: "AI music video for the South American Games, performed by Capi and Soledad."
    },
    credits: [
      { role: "Dirección", name: "Indajaus", ig: "indajaus._" },
      { role: "Coordinacion", name: "Charly Bronzini", ig: "charlybronzini" },
      { role: "Generación de Imagenes", name: "Camiloh", ig: "Camiloohh" },
      { role: "Generación de Imagenes", name: "Indajaus", ig: "indajaus._" },
      { role: "Generación de Imagenes", name: "Luka Verm", ig: "vermithg" },
      { role: "Generación de Video", name: "Indajaus", ig: "indajaus._" },
      { role: "Generación de Video", name: "Luka Verm", ig: "vermithg" },
      { role: "Generación de Video", name: "Camiloh", ig: "Camiloohh" },
      { role: "Edición", name: "Indajaus", ig: "indajaus._" },
    ],
    accent: "#d44950", rgb: "212,73,80", deep: "#7a1f23", hue: "348deg"
  },
  {
    title: "Lil Peep", year: "2026", slug: "lil-peep",
    role: { es: "Animación", en: "Animation" },
    desc: {
      es: "Visuales para el video musical Coke Baby de Lil Peep.",
      en: "Visuals for Lil Peep's Coke Baby music video."
    },
    credits: [
      { role: "Director", name: "Jaime Restrepo", ig: "jaimerestrepo_tv" },
      { role: "Compañía Productora", name: "Dreambear", ig: "dreambearproductions" },
      { role: "Productor de Línea", name: "Diana Buitrago", ig: "dianacromatica" },
      { role: "3D Director", name: "Brayan Viera", ig: "braviera" },
      { role: "Rigger", name: "Juan Ñahui", ig: "juanybabas" },
      { role: "Modelado y Textura", name: "Alex Arroqui", ig: "sosty_ar" },
      { role: "Modelado y Textura", name: "Juan Andino", ig: "juxni" },
      { role: "Modelado y Textura", name: "Brayan Viera", ig: "braviera" },
      { role: "Animación 3D", name: "Alex Arroqui", ig: "sosty_ar" },
      { role: "Animación 3D", name: "Camiloh", ig: "camiloohh" },
      { role: "Animación 3D", name: "Nohelia Trujillo", ig: "nohedraws" },
      { role: "Animación 3D", name: "Juan Ñahui", ig: "juanybabas" },
      { role: "Animación 3D", name: "Brayan Viera", ig: "braviera" },
      { role: "Animatic", name: "Diana Buitrago", ig: "dianacromatica" },
    ],
    accent: "#d449a2", rgb: "212,73,162", deep: "#7a1f59", hue: "313deg"
  },
  {
    title: "Lit Killah", year: "2025", slug: "lit-killah",
    role: { es: "Modelado, texturizado y render", en: "Modeling, texturing & render" },
    desc: {
      es: "Visuales para el show en vivo de Lit Killah.",
      en: "Visuals for Lit Killah's live show."
    },
    credits: [
      { role: "Dirección Creativa", name: "Agustin perez", ig: "headprod" },
      { role: "Dirección de Visuales", name: "Nicolás Martins", ig: "1337.png" },
      { role: "Producción General", name: "Ivanna Watnik", ig: "_darussian" },
      { role: "Artista 3D", name: "Camiloh", ig: "Camiloohh" },
      { role: "Edición y Composición", name: "Nicolás Martins", ig: "1337.png" },
      { role: "Edición y Composición", name: "Andrés Alexanderh", ig: "eeffes" },
    ],
    accent: "#d049d4", rgb: "208,73,212", deep: "#781f7a", hue: "289deg"
  },
  {
    title: "Malher", year: "2025", slug: "malher",
    role: { es: "Modelado y texturizado", en: "Modeling & texturing" },
    desc: {
      es: "Video promocional de Malher para la dinámica «Lo pago con pollitos»: un concepto jugado, resuelto en 3D con claridad.",
      en: "Promotional video for Malher's «Lo pago con pollitos» activation — a playful concept, resolved cleanly in 3D."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Coordinacion", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Director de animación", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Modelado/Iluminación", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Rigger", name: "Cristian Rangel", ig: "cristianrangel65" },
      { role: "Modelado/Textura", name: "Camiloh", ig: "Camiloohh" },
      { role: "Composición", name: "Juan Aguirre", ig: "juanpa_00_" },
      { role: "Motion", name: "Alejandra Monroy", ig: "mariamoon_roy" },
    ],
    accent: "#49d483", rgb: "73,212,131", deep: "#1f7a45", hue: "136deg"
  },
  {
    title: "Miniso Navidad", year: "2024", slug: "miniso-navidad",
    role: { es: "Iluminación, animación y render", en: "Lighting, animation & render" },
    desc: {
      es: "Producción virtual para la campaña «Una Navidad en el Mundo Miniso», en colaboración con @juandam___: luces, animación y render al servicio de una historia cálida.",
      en: "Virtual production for the «A Christmas in the Miniso World» campaign, with @juandam___ — lights, animation and render in service of a warm story."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Coordinacion", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Director de animación", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Modelado/Iluminación", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Modelado/Iluminación", name: "Camiloh", ig: "Camiloohh" },
      { role: "Composición", name: "Juan Aguirre", ig: "juanpa_00_" },
      { role: "Motion", name: "Alejandra Monroy", ig: "mariamoon_roy" },
    ],
    accent: "#d4a449", rgb: "212,164,73", deep: "#7a5a1f", hue: "30deg"
  },
  {
    title: "Mirringo", year: "2024", slug: "mirringo",
    role: { es: "Modelado, texturizado e iluminación", en: "Modeling, texturing & lighting" },
    desc: {
      es: "«¡Qué suerte, yo tengo un gato!»: reimaginar momentos icónicos de la historia… con un gato siempre presente. Humor, detalle y mucho cariño en 3D.",
      en: "«¡Qué suerte, yo tengo un gato!»: reimagining iconic moments in history — with a cat always in the frame. Humor, detail, and a lot of 3D love."
    },
    credits: [
      { role: "Productora", name: "Antiestático", ig: "antiestatico" },
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Pedro Pinto", ig: "peter.pint" },
      { role: "Director de Fotografía", name: "Andres Mauricio", ig: "comanchedp1" },
      { role: "Director de VFX", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Productora ejecutiva", name: "Juliana Cordoba", ig: "juli_cordoba_barcelona" },
      { role: "Productora ejecutiva", name: "Ingrid Beschiroff", ig: "ibeschiroff" },
      { role: "Productora ejecutiva", name: "Ana Greiffenstein", ig: "ana_greiffenstein" },
      { role: "Coordinación", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Coordinación", name: "Caterine Moreno", ig: "caterinemoreno_" },
      { role: "Director de animación", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Modelado/Iluminación", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Modelado/Iluminación", name: "Camiloh", ig: "camiloohh" },
      { role: "Rigger", name: "Cristian Rangel", ig: "cristianrangel65" },
      { role: "Animación 3D", name: "Angie Rubiano", ig: "/" },
      { role: "Composición", name: "Tomas Madrid", ig: "tomasmadridv" },
      { role: "Composición", name: "Juan Aguirre", ig: "juanpa_00_" },
      { role: "Composición", name: "Camilo Rueda", ig: "micro_vfx" },
      { role: "Motion", name: "Alejandra Monroy", ig: "mariamoon_roy" },
    ],
    accent: "#49d49f", rgb: "73,212,159", deep: "#1f7a57", hue: "148deg"
  },
  {
    title: "MP3 Emilia", year: "2024", slug: "mp3-emilia",
    role: { es: "Animación", en: "Animation" },
    desc: {
      es: "Visuales para el segundo álbum de Emilia: animación con identidad propia y un pulso que acompaña la música.",
      en: "Visuals for Emilia's second album — animation with its own identity and a pulse that follows the music."
    },
    credits: [
      { role: "Dirección", name: "Julia Conde", ig: "julitaconde" },
      { role: "Producción", name: "ANESTESIA", ig: "anestesia.av" },
      { role: "Producción Ejecutiva", name: "Nicolas Ballve", ig: "nicoballve" },
      { role: "Producción Ejecutiva", name: "Tute Ballve", ig: "tuteballve" },
      { role: "Producción General", name: "Euge", ig: "eugetewes" },
      { role: "Dirección de Arte", name: "Melanie Anton", ig: "melanieantondef" },
      { role: "AD", name: "Bruno Adamovsky", ig: "brunoada" },
      { role: "DOP", name: "Franco D'Alessandro", ig: "fran.dalessa" },
      { role: "Jefe Producción Rodaje", name: "Santi Goldfarb", ig: "santi.goldfarb" },
      { role: "Estilismo", name: "Dav Martens", ig: "davmartens" },
      { role: "Estilismo", name: "CHINA", ig: "chinaajazmin" },
      { role: "Pelo emi", name: "uan Manuel", ig: "juanmacativa" },
      { role: "Mkp emi", name: "Juicy Makeup", ig: "juicymakeup" },
      { role: "Mngmt", name: "Guadalupe Alvear", ig: "guadyalvear" },
      { role: "Producción post", name: "ivanna Watnik", ig: "_darussian" },
      { role: "Coordinadora post", name: "Belen Murillo", ig: "belumurillo" },
      { role: "Lead vfxs y edit", name: "Nicola Martins", ig: "nic0martins" },
      { role: "Dirección de arte gráfico", name: "Victoria", ig: "victoria.scratch" },
      { role: "Edición", name: "Angel", ig: "angelisonfire" },
      { role: "Color", name: "Franco D'Alessandro", ig: "fran.dalessa" },
      { role: "Diseño", name: "Yai Salinas", ig: "yaisalinas" },
      { role: "Diseño", name: "Tomás Callegaro", ig: "tomicalle.art" },
      { role: "Diseño", name: "Marcus", ig: "marcuscus3d" },
      { role: "Diseño", name: "Maritimar", ig: "m4ritimar" },
      { role: "Diseño", name: "Karina Lizeth", ig: "karinalizeth.motion" },
      { role: "Diseño", name: "Lozax", ig: "lozax.pixel" },
      { role: "Diseño", name: "Nestor Vassallo", ig: "__nesva" },
      { role: "Diseño Personajes", name: "P0ompui", ig: "p0ompui" },
      { role: "Diseño Personajes", name: "Juani", ig: "juxni" },
      { role: "Diseño Personajes", name: "Victoria", ig: "victoria.scratch" },
      { role: "Lead 3D", name: "Criswallss", ig: "criswallss" },
      { role: "Lead 3D", name: "Camiloh", ig: "camiloohh" },
    ],
    accent: "#4981d4", rgb: "73,129,212", deep: "#1f447a", hue: "207deg"
  },
  {
    title: "Paloma Mami", year: "2025", slug: "paloma-mami",
    role: { es: "Generalista 3D", en: "3D generalist" },
    desc: {
      es: "Visuales para el álbum Códigos de Muñeka de Paloma Mami.",
      en: "Visuals for Paloma Mami's Códigos de Muñeka album."
    },
    credits: [
      { role: "Dirección", name: "Camila Grandi", ig: "camigrandi" },
      { role: "Dirección Creativa", name: "Palomamami", ig: "palomamami" },
      { role: "Dirección de Arte", name: "Julia Conde", ig: "julitaconde" },
      { role: "Producción", name: "Ivanna Watnik", ig: "_darussian" },
      { role: "Producción Ejecutiva", name: "Yani Molina", ig: "yanimolina" },
      { role: "Productor Técnico", name: "Sebastián Alvarez", ig: "sebaastian_alvareez" },
      { role: "Director Asistente", name: "Coty Nuñez", ig: "_gattodelcoty" },
      { role: "Director de Fotografía", name: "Vicente Mayo", ig: "elvicho_mayo" },
      { role: "Diseñador de Producción (En Set)", name: "Fernanda Garriga", ig: "fernandagarriga" },
      { role: "Atrezzo", name: "Sebastian", ig: "medescubrieron" },
      { role: "Estilista", name: "", ig: "pau_poblet_" },
      { role: "Maquillaje", name: "Sofía Castillo", ig: "sofiacastillo_" },
      { role: "Peluquería", name: "Iván Barria", ig: "ivanbarriaa" },
      { role: "Jefe de Post Producción", name: "Paula Braga", ig: "paubm1" },
      { role: "Productor VFX/Post", name: "Paula Braga", ig: "paubm1" },
      { role: "Productor VFX/Post", name: "BM Estudio", ig: "bmestudio.arg" },
      { role: "Post Producción Adicional", name: "Vanina Balza", ig: "vanibal" },
      { role: "Post Producción Adicional", name: "Felipe Monguillot", ig: "shotbyfmb" },
      { role: "Diseño Gráfico", name: "Mar", ig: "m4ritimar" },
      { role: "Títulos y Letras", name: "Rena", ig: "renadrago" },
      { role: "Edición", name: "Camila Grandi", ig: "camigrandi" },
      { role: "Color", name: "Felipe Martínez", ig: "felipemartinezu" },
      { role: "Color", name: "Wemakecolor", ig: "wemakecolor" },
      { role: "Artista VFX/3D", name: "Andre", ig: "byandregv" },
      { role: "Artista VFX/3D", name: "Criswalls", ig: "criswallss" },
      { role: "Artista VFX/3D", name: "Camiloh", ig: "camiloohh" },
      { role: "Artista VFX/3D", name: "Rodo Gautier", ig: "rodogautier" },
      { role: "Artista VFX/3D", name: "Carlos Bruno De Paoli", ig: "carlosbrunodepaoli" },
      { role: "Creación, Modelado y Texturizado de Personaje 3D", name: "Bruno", ig: "brunoderavioli" },
      { role: "Discográfica", name: "Sony Music Latin", ig: "sonymusiclatin" },
      { role: "Equipo Discográfica", name: "Adrian", ig: "_adrian88" },
      { role: "Equipo Discográfica", name: "Alessandro Martino", ig: "amartinophoto" },
    ],
    accent: "#6349d4", rgb: "99,73,212", deep: "#301f7a", hue: "242deg"
  },
  {
    title: "Piscilago", year: "2023", slug: "piscilago",
    role: { es: "Modelado, iluminación y render", en: "Modeling, lighting & render" },
    desc: {
      es: "Animación 3D para el parque acuático Piscilago: una experiencia inmersiva que invita a meterse al agua… aunque sea desde la pantalla.",
      en: "3D animation for the Piscilago water park — an immersive experience that makes you want to jump in, even from the screen."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Director", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Productora ejecutiva", name: "Sara Lucía", ig: "soysaralucia" },
      { role: "Dirección de Fotografía", name: "Andres Mauricio", ig: "comanchedp1" },
      { role: "Coordinacion", name: "Angie Aguilar", ig: "anngie_aguilar" },
      { role: "Director de animación", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Grooming 3D", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Grooming 3D", name: "Luis Fernando", ig: "theredman3d" },
      { role: "Modelado y Iluminación", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Modelado y Iluminación", name: "Camiloh", ig: "Camiloohh" },
      { role: "Modelado y textura", name: "Stiven Valero", ig: "stiven_valero_mora" },
      { role: "Modelado y textura", name: "Lorena Bosch", ig: "bosch_lore" },
      { role: "Rigger", name: "Cristian Rangel", ig: "cristianrangel65" },
      { role: "Animación 3D", name: "Angie Rubiano", ig: "/" },
      { role: "Artista 3D", name: "Julian Puentes", ig: "julianpuentes_cg" },
      { role: "Composición", name: "Tomas Madrid", ig: "tomasmadridv" },
      { role: "Motion y composición", name: "Alejandra Monroy", ig: "mariamoon_roy" },
      { role: "Motion y composición", name: "Sebastian", ig: "yosoyundonnadie" },
      { role: "Arte Conceptual", name: "Andres Aponte", ig: "andresaponteart" },
      { role: "Arte Conceptual", name: "Harry Villamil", ig: "harry_villamil" },
      { role: "Vestuario", name: "Becca Hayer", ig: "beccahayer" },
      { role: "Vestuario", name: "Miss Tutu", ig: "misstutustyling" },
    ],
  },
  {
    title: "Polet", year: "2025", slug: "polet",
    role: { es: "Modelado y texturizado", en: "Modeling & texturing" },
    desc: {
      es: "Promocional de Polet Cremhelado para el lanzamiento de la paleta Chocoavellana: modelado y textura con ganas de morder la pantalla.",
      en: "Polet Cremhelado promo for the Chocoavellana bar launch — modeling and texture that make you want to bite the screen."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Dirección", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Dirección", name: "Zárate", ig: "zaratefilm" },
      { role: "Dirección de Fotografía", name: "Juan Sáchica", ig: "juanpablosachica" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Productora ejecutiva", name: "Sara Lucía", ig: "soysaralucia" },
      { role: "Gaffer", name: "Jah War", ig: "jahwar.luz" },
      { role: "Color", name: "Sisifo", ig: "sisifo___" },
      { role: "Styling", name: "Daniela Tokio", ig: "daniela__tokio" },
      { role: "Dirección de Fotografía", name: "Andres Mauricio", ig: "comanchedp1" },
      { role: "Coordinacion", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Director de animación", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Animación 3D", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Iluminación y Render", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Modelado y Textura", name: "Camiloh", ig: "Camiloohh" },
      { role: "Composición", name: "Tomas Madrid", ig: "tomasmadridv" },
    ],
    accent: "#49d4ba", rgb: "73,212,186", deep: "#1f7a69", hue: "160deg"
  },
  {
    title: "Quatro", year: "2025", slug: "quatro",
    role: { es: "Motion graphics", en: "Motion graphics" },
    desc: {
      es: "Motion graphics para Quatro Colombia: ácida, dulce y burbujeante… igual que la bebida. Ritmo y color de punta a punta.",
      en: "Motion graphics for Quatro Colombia — sour, sweet and bubbly, just like the drink. Rhythm and color end to end."
    },
    credits: [
      { role: "Productora", name: "Diptongo", ig: "diptongomediagroup" },
      { role: "Dirección", name: "Sebastian Mejía", ig: "sebasgambeta" },
      { role: "Productora ejecutiva", name: "Margarita Montoya", ig: "marge_marge1111" },
      { role: "Coordinacion", name: "Nathaly Díaz", ig: "nathalydiaz18" },
      { role: "Director de animación", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Animación 3D", name: "Camiloh", ig: "camiloohh" },
      { role: "Animación 3D", name: "Mauricio Nieto", ig: "dr_pancreas" },
      { role: "Modelado y Iluminación", name: "Arturo Martinez", ig: "arturo_3d_stuff" },
      { role: "Simulación de Liquidos", name: "Giorgio Zegarra", ig: "giorgiovfx" },
      { role: "Composición", name: "Tomas Madrid", ig: "tomasmadridv" },
    ],
    accent: "#49d3d4", rgb: "73,211,212", deep: "#1f7a7a", hue: "171deg"
  },
  {
    title: "Rutinario", year: "2026", slug: "rutinario", cat: "ia",
    role: { es: "Artista de IA", en: "AI Artist" },
    desc: {
      es: "Video musical generado por completo con IA: Rutinario. Una pieza que prueba hasta dónde puede llegar una narrativa hecha a base de prompts… y criterio.",
      en: "Fully AI-generated music video: Rutinario. A piece that tests how far a prompt-driven narrative can go — with real creative judgment."
    },
    credits: [
      { role: "Hecho Por", name: "Camiloh", ig: "Camiloohh" },
    ],
    accent: "#d4496b", rgb: "212,73,107", deep: "#7a1f35", hue: "336deg"
  },
  {
    title: "Santorini", year: "2024", slug: "santorini",
    role: { es: "Modelado y texturizado", en: "Modeling & texturing" },
    desc: {
      es: "Video musical Santorini de Beéle, Jason Derulo y Farruko.",
      en: "Santorini music video by Beéle, Jason Derulo and Farruko."
    },
    credits: [
      { role: "Productora", name: "Absnt.absnt", ig: "absnt.absnt" },
      { role: "Dirección", name: "Martín Seipel", ig: "martinseipel" },
      { role: "Dirección y Modelado 3D", name: "Criswalls", ig: "criswallss" },
      { role: "VFX y Color", name: "Andrés Alexander", ig: "eeffes" },
      { role: "Cover Art", name: "Andrés Alexander", ig: "eeffes" },
      { role: "Cover Art", name: "Leomar Solorzano", ig: "leomarswar" },
      { role: "Soporte 3D", name: "Mariano Rojas", ig: "rxxjvs" },
      { role: "Diseño de Titulo", name: "Leomar Solorzano", ig: "leomarswar" },
      { role: "Diseño de Personajes", name: "Camiloh", ig: "camiloohh" },
      { role: "Coordinación y Supervisión Visual", name: "Rocio", ig: "rotaboada" },
      { role: "Coordinación y Supervisión Visual", name: "Guille Pozzi", ig: "guillepozzi" }
    ],
    accent: "#499dd4", rgb: "73,157,212", deep: "#1f567a", hue: "195deg"
  },
  {
    title: "Sech Visuales", year: "2025", slug: "sech-visuales",
    role: { es: "Generalista 3D", en: "3D generalist" },
    desc: {
      es: "Visuales para la gira Antes del Tour de Sech: un set 3D versátil, listo para girar de ciudad en ciudad.",
      en: "Visuals for Sech's Antes del Tour run — a versatile 3D set, ready to travel city to city."
    },
    credits: [
      { role: "Dirección Creativa", name: "Arturo Martinez", ig: "arturomartinez.oficial" },
      { role: "Artista 3D", name: "Camiloh", ig: "camiloohh" },
    ],
    accent: "#d449bd", rgb: "212,73,189", deep: "#7a1f6b", hue: "301deg"
  },
  {
    title: "STAY x PITBULLYING", year: "2024", slug: "staypit",
    role: { es: "Generalista 3D", en: "3D generalist" },
    desc: {
      es: "Animación 3D para la colección de ropa XZLY 777",
      en: "3D Animation for the XZLY 777 Clothing Collection"
    },
    credits: [
      { role: "Dirección Creativa", name: "Camiloh", ig: "camiloh" },
      { role: "Dirección Creativa", name: "Pitbullying", ig: "pitbullying_clothing" },
      { role: "Dirección Creativa", name: "Stay", ig: "stay.cloo" },
      { role: "Artista 3D", name: "Camiloh", ig: "Camiloohh" },
    ],
    accent: "#435fd8", rgb: "73,75,212", deep: "#121485", hue: "230deg"
  },
];

/* Sorted alphabetically (already in order above; keep sort at runtime for safety) */
PROJECTS.sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));

const UI = {
  es: {
    navAbout: "Sobre mí",
    navWork: "Trabajos",
    navGallery: "Galería",
    navContact: "Contacto",
    navArt: "Tu arte",
    heroTag: "Mi trabajo",
    heroTitle: "Proyectos",
    heroSub: "Índice de proyectos, agradecimientos a todos los involucrados.",
    colName: "Nombre",
    colRole: "Rol",
    colYear: "Año",
    filterAll: "Todos",
    filter3d: "3D",
    filterIa: "IA",
    note: "Cada proyecto es una historia en construcción.",
    zoomHint: "clic para ampliar",
    close: "CERRAR ✕",
    reel: "Rodado en 22mm · Camiloh",
    yearLabel: "Año",
    roleLabel: "Rol",
    expand: "Ampliar",
    madeWith: "Creado con amor",
    footerLeft: "© 2026 Camiloh — Artista 3D",
    footerRight: "Rodado en 35mm · Colombia",
    frame: "Frame",
    credits: "Créditos",
    creditsEmpty: "Créditos por agregar.",
  },
  en: {
    navAbout: "About",
    navWork: "Work",
    navGallery: "Gallery",
    navContact: "Contact",
    navArt: "Your art",
    heroTag: "My work",
    heroTitle: "Projects",
    heroSub: "A project index, thanks to everyone involved.",
    colName: "Name",
    colRole: "Role",
    colYear: "Year",
    filterAll: "All",
    filter3d: "3D",
    filterIa: "AI",
    note: "Every project is a story still being written.",
    zoomHint: "click to expand",
    close: "CLOSE ✕",
    reel: "Shot on 22mm · Camiloh",
    yearLabel: "Year",
    roleLabel: "Role",
    expand: "Expand",
    madeWith: "Made with love",
    footerLeft: "© 2026 Camiloh — 3D Artist",
    footerRight: "Shot on 35mm · Colombia",
    frame: "Frame",
    credits: "Credits",
    creditsEmpty: "Credits to be added.",
  },
};

let lang = localStorage.getItem("camiloh-lang") || "es";
if (lang !== "es" && lang !== "en") lang = "es";

function t(key) {
  return (UI[lang] && UI[lang][key]) || UI.es[key] || key;
}

function tr(field) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.es || "";
}

const SPARK_SVG = '<svg class="p-spark" viewBox="0 0 24 24"><path d="M12 2c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/></svg>';
const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const HEART_SVG = '<svg viewBox="0 0 24 24"><path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"/></svg>';
const IG_SVG = '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>';
const MAIL_SVG = '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6.5 8 6.5 8-6.5"/></svg>';

function pad(n) {
  return String(n).padStart(2, "0");
}

function buildList() {
  const listCol = document.querySelector(".tw-col-list");
  const note = listCol.querySelector(".tw-note");
  const frame = document.getElementById("previewFrame");
  const cap = document.getElementById("pvCap");

  listCol.querySelectorAll(".proj-row").forEach((el) => el.remove());
  frame.querySelectorAll("img").forEach((el) => el.remove());

  const frag = document.createDocumentFragment();
  const imgFrag = document.createDocumentFragment();

  PROJECTS.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "proj-row";
    row.dataset.index = i;
    row.dataset.accent = "red";
    row.dataset.title = p.title;
    row.dataset.role = tr(p.role);
    row.dataset.year = p.year;
    row.dataset.cat = p.cat || "3d";
    row.innerHTML =
      '<div class="p-left">' +
      '<span class="p-num">' + pad(i + 1) + "</span>" +
      SPARK_SVG +
      '<span class="p-name">' + p.title + "</span>" +
      "</div>" +
      '<span class="p-role">' + tr(p.role) + "</span>" +
      '<span class="p-year">' + p.year + "</span>" +
      '<span class="p-arrow">' + ARROW_SVG + "</span>";
    frag.appendChild(row);

    // Lazy: only set data-src; real src loads on hover / near viewport
    const img = document.createElement("img");
    img.dataset.index = i;
    img.dataset.src = "assets/img/" + p.slug + ".jpg";
    img.alt = p.title;
    img.decoding = "async";
    img.loading = "lazy";
    imgFrag.appendChild(img);
  });

  listCol.insertBefore(frag, note);
  frame.insertBefore(imgFrag, cap);

  // drop skeleton once real rows exist
  document.body.classList.add("is-ready");
  const skel = listCol.querySelector(".proj-skeleton");
  if (skel) skel.remove();

  observeRows();
}


function buildCreditsHtml(p) {
  const list = Array.isArray(p.credits) ? p.credits : [];
  let rows = "";
  if (list.length === 0) {
    rows = '<span class="pp-credits-empty">' + t("creditsEmpty") + "</span>";
  } else {
    list.forEach((c) => {
      const role = c.role || "";
      const name = c.name || "";
      const ig = (c.ig || "").replace(/^@/, "");
      const igHtml = ig
        ? ' — <a href="https://www.instagram.com/' + ig + '/" target="_blank" rel="noopener">@' + ig + "</a>"
        : "";
      rows +=
        '<div class="pp-credit-row">' +
        role + " — " + name + igHtml +
        "</div>";
    });
  }
  return (
    '<div class="pp-credits">' +
    '<button type="button" class="pp-credits-toggle" aria-expanded="false">' +
    '<svg class="pp-credits-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/></svg>' +
    '<span class="pp-credits-label">' + t("credits") + "</span>" +
    '<span class="pp-credits-chevron" aria-hidden="true"></span>' +
    "</button>" +
    '<div class="pp-credits-list">' + rows + "</div>" +
    "</div>"
  );
}

function buildPanel(idx) {
  const p = PROJECTS[idx];
  if (!p) return null;

  const styleParts = [];
  if (p.accent) styleParts.push("--accent:" + p.accent);
  if (p.rgb) styleParts.push("--accent-rgb:" + p.rgb);
  if (p.deep) styleParts.push("--accent-deep:" + p.deep);
  if (p.hue) styleParts.push("--pp-hue:" + p.hue);

  let frames = "";
  for (let n = 1; n <= 6; n++) {
    const num = pad(n);
    frames +=
      '<div class="pp-shot">' +
      '<img data-src="assets/img/' + p.slug + "-frame" + num + '.jpg" alt="' + p.title + " " + num + '" loading="lazy">' +
      '<span class="pp-shot-num">' + num + "</span>" +
      '<span class="pp-shot-zoom">' + t("expand") + "</span>" +
      "</div>";
  }

  const postHtml = "";

  const panel = document.createElement("div");
  panel.id = "projectPanel-" + idx;
  panel.className = "proj-panel";
  panel.dataset.projIndex = idx;
  if (styleParts.length) panel.setAttribute("style", styleParts.join("; "));

  panel.innerHTML =
    '<button class="pp-close" type="button" aria-label="Cerrar">✕</button>' +
    '<div class="pp-frame"><div class="proj-panel-inner">' +
    '<canvas id="ppRain-' + idx + '" class="pp-rain-canvas"></canvas>' +
    '<div class="pp-spot"></div>' +
    '<span class="pp-reel">' + t("reel") + "</span>" +
    '<div class="pp-media-wrap"><div class="pp-media">' +
    '<video class="pp-video video-js vjs-glass" id="ppVideo-' + idx + '" muted loop playsinline controls preload="none" poster="assets/img/' + p.slug + '.jpg">' +
    '<source data-src="assets/video/' + p.slug + '.mp4" type="video/mp4">' +
    "</video></div></div>" +
    '<div class="pp-head"><div class="pp-head-left">' +
    '<h2 class="pp-title gradient-text">' + p.title + "</h2>" +
    '<p class="pp-desc">' + tr(p.desc) + "</p>" +
    postHtml +
    '</div><div class="pp-head-right">' +
    '<div class="pp-meta-block"><span class="pp-meta-label">' + t("yearLabel") + "</span>" +
    '<span class="pp-year gradient-text">' + p.year + "</span></div>" +
    '<div class="pp-meta-block"><span class="pp-meta-label">' + t("roleLabel") + "</span>" +
    '<span class="pp-role">' + tr(p.role) + "</span></div>" +
    "</div></div>" +
    buildCreditsHtml(p) +
    '<div class="pp-gallery">' + frames + "</div>" +
    '<div class="pp-love-card">' +
    '<div class="pp-social-group pp-love-left">' +
    '<a class="pp-social-item" href="https://www.instagram.com/camiloohh/" target="_blank" rel="noopener">' +
    '<span class="pp-social-icon" aria-hidden="true">' + IG_SVG + "</span>" +
    '<span class="pp-social-text"><strong>Instagram</strong><small>@camiloohh</small></span></a>' +
    '<a class="pp-social-item" href="https://www.behance.net/camiloh" target="_blank" rel="noopener">' +
    '<span class="pp-social-icon" aria-hidden="true">Be</span>' +
    '<span class="pp-social-text"><strong>Behance</strong><small>/camiloh</small></span></a></div>' +
    '<div class="pp-love-center">' +
    '<button class="pp-heart" type="button" aria-label="Like">' + HEART_SVG + "</button>" +
    '<span class="pp-love-text">' + t("madeWith") + "</span></div>" +
    '<div class="pp-social-group pp-love-right">' +
    '<a class="pp-social-item" href="mailto:contact@camiloh.co">' +
    '<span class="pp-social-icon" aria-hidden="true">' + MAIL_SVG + "</span>" +
    '<span class="pp-social-text"><strong>E-mail</strong><small>contact@camiloh.co</small></span></a>' +
    '<a class="pp-social-item" href="https://www.linkedin.com/in/camilooh" target="_blank" rel="noopener">' +
    '<span class="pp-social-icon" aria-hidden="true">in</span>' +
    '<span class="pp-social-text"><strong>LinkedIn</strong><small>/camilooh</small></span></a></div>' +
    "</div></div></div>";

  document.body.appendChild(panel);
  return panel;
}

function createRainFX(canvas, accentRgb) {
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0, h = 0, rafId = null, drops = [], bokehs = [], t0 = 0;
  const base = accentRgb || "226,59,34";
  const lighten = (rgb, amt) =>
    rgb.split(",").map((v) => Math.round(+v + (255 - +v) * amt)).join(",");
  const colors = [base, lighten(base, 0.28), lighten(base, 0.55)];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width; h = rect.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function spawnDrop(anyY) {
    return {
      x: Math.random() * w, y: anyY ? Math.random() * h : -30,
      len: 16 + Math.random() * 30, speed: 300 + Math.random() * 280,
      drift: 24 + Math.random() * 16, alpha: 0.22 + Math.random() * 0.4,
      lw: 0.7 + Math.random() * 1.1
    };
  }
  function seed() {
    const count = Math.min(Math.max(Math.round((w * h) / 8500), 60), 150);
    drops = Array.from({ length: count }, () => spawnDrop(true));
    bokehs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 70 + Math.random() * 100, base: 0.09 + Math.random() * 0.09,
      c: colors[i % colors.length],
      vx: (Math.random() - 0.5) * 7, vy: (Math.random() - 0.5) * 5,
      phase: Math.random() * Math.PI * 2
    }));
  }
  function frame() {
    t0++;
    ctx.clearRect(0, 0, w, h);
    bokehs.forEach((b) => {
      b.x += b.vx * 0.016; b.y += b.vy * 0.016;
      if (b.x < -b.r) b.x = w + b.r; if (b.x > w + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = h + b.r; if (b.y > h + b.r) b.y = -b.r;
      const a = b.base * (0.7 + Math.sin(t0 * 0.01 + b.phase) * 0.3);
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, "rgba(" + b.c + "," + a + ")");
      g.addColorStop(1, "rgba(" + b.c + ",0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.lineCap = "round";
    drops.forEach((d) => {
      d.y += d.speed * 0.016; d.x += d.drift * 0.016;
      if (d.y - d.len > h) Object.assign(d, spawnDrop(false));
      const g = ctx.createLinearGradient(d.x, d.y - d.len, d.x + d.drift * 0.05, d.y);
      g.addColorStop(0, "rgba(247,241,225,0)");
      g.addColorStop(1, "rgba(247,241,225," + d.alpha + ")");
      ctx.strokeStyle = g; ctx.lineWidth = d.lw;
      ctx.beginPath(); ctx.moveTo(d.x, d.y - d.len); ctx.lineTo(d.x + d.drift * 0.05, d.y); ctx.stroke();
    });
    rafId = requestAnimationFrame(frame);
  }
  function onResize() { if (rafId) { resize(); seed(); } }
  window.addEventListener("resize", onResize);
  return {
    start() { if (rafId || reduceMotion) return; resize(); seed(); frame(); },
    stop() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
  };
}

const projectPanels = {};

function initPanelController(panelEl, idx) {
  const video = panelEl.querySelector(".pp-video");
  const rainCanvas = panelEl.querySelector(".pp-rain-canvas");
  const accentRgb = getComputedStyle(panelEl).getPropertyValue("--accent-rgb").trim() || null;
  const rainFX = rainCanvas ? createRainFX(rainCanvas, accentRgb) : null;
  const closeBtn = panelEl.querySelector(".pp-close");
  const inner = panelEl.querySelector(".proj-panel-inner");
  const heart = panelEl.querySelector(".pp-heart");
  let heartLiked = false;

  projectPanels[idx] = { panelEl, video, player: null, rainFX, loaded: false };

  if (inner) {
    inner.addEventListener("mousemove", (e) => {
      const rect = inner.getBoundingClientRect();
      inner.style.setProperty("--sx", e.clientX - rect.left + "px");
      inner.style.setProperty("--sy", e.clientY - rect.top + "px");
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", () => closeProjectPanel(idx));
  panelEl.addEventListener("click", (e) => { if (e.target === panelEl) closeProjectPanel(idx); });

  if (heart) {
    heart.addEventListener("click", () => {
      heartLiked = !heartLiked;
      heart.classList.toggle("liked", heartLiked);
      heart.classList.remove("pop");
      void heart.offsetWidth;
      heart.classList.add("pop");
      // easter egg: 7 heart clicks → matrix
      bumpEaster("heart");
    });
    heart.addEventListener("animationend", () => heart.classList.remove("pop"));
  }

  const creditsBtn = panelEl.querySelector(".pp-credits-toggle");
  const creditsList = panelEl.querySelector(".pp-credits-list");
  if (creditsBtn && creditsList) {
    creditsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = creditsBtn.getAttribute("aria-expanded") === "true";
      const willOpen = !open;
      creditsBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (willOpen) {
        // restart staggered fade-in each time the list opens
        creditsList.classList.remove("open");
        void creditsList.offsetWidth;
        creditsList.classList.add("open");
      } else {
        creditsList.classList.remove("open");
      }
    });
  }

  panelEl.querySelectorAll(".pp-shot").forEach((shot, i) => {
    shot.addEventListener("click", (e) => {
      e.stopPropagation();
      const img = shot.querySelector("img");
      lightbox.querySelector("img").src = img.src;
      lightbox.querySelector(".lb-caption").textContent = t("frame") + " " + pad(i + 1);
      lightbox.classList.add("open");
    });
  });
}

function loadPanelMedia(p) {
  if (p.loaded) return;
  p.loaded = true;
  if (p.video) {
    p.video.querySelectorAll("source[data-src]").forEach((src) => {
      src.src = src.dataset.src;
      delete src.dataset.src;
    });
    p.video.load();
    if (typeof videojs !== "undefined") {
      p.player = videojs(p.video, {
        // fill the .pp-media box; aspect-ratio is controlled on the container
        fill: true,
        fluid: false,
        controls: true,
        preload: "metadata",
      });
      const applyRatio = () => {
        try {
          const el = p.player.tech(true) && p.player.tech(true).el();
          const w = (el && el.videoWidth) || p.player.videoWidth();
          const h = (el && el.videoHeight) || p.player.videoHeight();
          if (w && h) {
            const wrap = p.panelEl.querySelector(".pp-media");
            if (wrap) {
              wrap.style.aspectRatio = w + " / " + h;
              const isPortrait = h >= w;
              wrap.classList.toggle("is-portrait", isPortrait);
              const mediaWrap = p.panelEl.querySelector(".pp-media-wrap");
              if (mediaWrap) mediaWrap.classList.toggle("is-portrait", isPortrait);
            }
          }
        } catch (err) { /* ignore */ }
      };
      p.player.ready(() => {
        p.player.on("loadedmetadata", applyRatio);
        applyRatio();
      });
    } else {
      p.player = null;
      p.video.addEventListener("loadedmetadata", () => {
        if (p.video.videoWidth && p.video.videoHeight) {
          const w = p.video.videoWidth, h = p.video.videoHeight;
          const wrap = p.panelEl.querySelector(".pp-media");
          if (wrap) {
            wrap.style.aspectRatio = w + " / " + h;
            const isPortrait = h >= w;
            wrap.classList.toggle("is-portrait", isPortrait);
            const mediaWrap = p.panelEl.querySelector(".pp-media-wrap");
            if (mediaWrap) mediaWrap.classList.toggle("is-portrait", isPortrait);
          }
        }
      });
    }
  }
  p.panelEl.querySelectorAll(".pp-shot img[data-src]").forEach((img) => {
    img.src = img.dataset.src;
    delete img.dataset.src;
  });
}

function openProjectPanel(idx) {
  let p = projectPanels[idx];
  if (!p) {
    const el = buildPanel(idx);
    if (!el) return;
    initPanelController(el, idx);
    p = projectPanels[idx];
  }
  loadPanelMedia(p);
  p.panelEl.classList.add("open");
  document.body.style.overflow = "hidden";
  if (p.player) { p.player.currentTime(0); p.player.play(); }
  else if (p.video) { p.video.currentTime = 0; p.video.play().catch(() => {}); }
  if (p.rainFX) p.rainFX.start();
}

function closeProjectPanel(idx) {
  const p = projectPanels[idx];
  if (!p) return;
  p.panelEl.classList.remove("open");
  document.body.style.overflow = "";
  if (p.player) p.player.pause();
  else if (p.video) p.video.pause();
  if (p.rainFX) p.rainFX.stop();
}

/* Custom cursor */
const cursor = document.getElementById("cursor");
let mx = 0, my = 0, cx = 0, cy = 0;
window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; cursor.classList.remove("hide"); });
window.addEventListener("mouseleave", () => cursor.classList.add("hide"));

const mouseGlow = document.getElementById("mouseGlow");
let gx = window.innerWidth / 2, gy = window.innerHeight / 2, glowStarted = false;

function loop() {
  if (!document.hidden) {
    cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22;
    cursor.style.left = cx + "px"; cursor.style.top = cy + "px";
    gx += (mx - gx) * 0.06; gy += (my - gy) * 0.06;
    mouseGlow.style.setProperty("--mx", gx + "px");
    mouseGlow.style.setProperty("--my", gy + "px");
    if (!glowStarted && (mx || my)) { glowStarted = true; mouseGlow.classList.add("ready"); }
  }
  requestAnimationFrame(loop);
}
loop();

document.addEventListener("visibilitychange", () => {
  document.body.classList.toggle("tab-hidden", document.hidden);
});

function bindCursorHover(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
}

function magnetize(selector, strength) {
  if (typeof gsap === "undefined") return;
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)", overwrite: "auto" });
    });
  });
}

/* Star field */
(function starField() {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0, h = 0, stars = [], constellation = [], shootStars = [], shootTimer = 120, tick = 0;

  function seed() {
    const count = Math.min(Math.max(Math.round((w * h) / 9500), 70), 150);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 0.5 + Math.random() * 1.1, base: 0.22 + Math.random() * 0.4,
      speed: 0.006 + Math.random() * 0.016, phase: Math.random() * Math.PI * 2
    }));
    const cx0 = w * (0.7 + Math.random() * 0.1), cy0 = h * (0.14 + Math.random() * 0.1);
    constellation = Array.from({ length: 6 }, (_, i) => ({
      x: cx0 + Math.cos(i * 1.15) * (38 + i * 20) + (Math.random() - 0.5) * 26,
      y: cy0 + Math.sin(i * 1.75) * (22 + i * 13) + (Math.random() - 0.5) * 20,
      r: 1.2 + Math.random() * 0.6, base: 0.5 + Math.random() * 0.25,
      speed: 0.008 + Math.random() * 0.01, phase: Math.random() * Math.PI * 2
    }));
  }
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }
  function drawConstellation(alphaFn) {
    ctx.strokeStyle = "rgba(247,241,225,.12)"; ctx.lineWidth = 1;
    ctx.beginPath();
    constellation.forEach((pt, i) => { if (i === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
    ctx.stroke();
    constellation.forEach((s) => {
      ctx.fillStyle = "rgba(247,241,225," + alphaFn(s).toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });
  }
  function spawnShootingStar() {
    const fromLeft = Math.random() < 0.5;
    const x0 = fromLeft ? Math.random() * w * 0.4 : w * 0.6 + Math.random() * w * 0.4;
    const y0 = Math.random() * h * 0.35;
    const angle = Math.PI * 0.22 + Math.random() * 0.12;
    const speed = 9 + Math.random() * 5;
    shootStars.push({
      x: x0, y: y0, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      life: 1, decay: 0.012 + Math.random() * 0.006, len: 60 + Math.random() * 40
    });
  }
  function frame() {
    if (document.hidden) { requestAnimationFrame(frame); return; }
    tick++;
    ctx.clearRect(0, 0, w, h);
    drawConstellation((s) => s.base * (0.6 + 0.4 * Math.sin(tick * s.speed + s.phase)));
    stars.forEach((s) => {
      const a = s.base * (0.5 + 0.5 * Math.sin(tick * s.speed + s.phase));
      ctx.fillStyle = "rgba(247,241,225," + a.toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });
    shootTimer--;
    if (shootTimer <= 0) { shootTimer = 260 + Math.random() * 320; spawnShootingStar(); }
    shootStars.forEach((s) => {
      s.x += s.vx; s.y += s.vy; s.life -= s.decay;
      const m = Math.hypot(s.vx, s.vy) || 1;
      const tailX = s.x - s.vx * (s.len / m), tailY = s.y - s.vy * (s.len / m);
      const g = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      g.addColorStop(0, "rgba(247,241,225,0)");
      g.addColorStop(1, "rgba(247,241,225," + Math.max(s.life, 0) * 0.85 + ")");
      ctx.strokeStyle = g; ctx.lineWidth = 1.3; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(s.x, s.y); ctx.stroke();
    });
    shootStars = shootStars.filter((s) => s.life > 0 && s.x < w + 60 && s.y < h + 60);
    requestAnimationFrame(frame);
  }
  function drawStatic() {
    ctx.clearRect(0, 0, w, h);
    drawConstellation((s) => s.base);
    stars.forEach((s) => {
      ctx.fillStyle = "rgba(247,241,225," + s.base.toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });
  }
  window.addEventListener("resize", () => { resize(); if (reduceMotion) drawStatic(); });
  resize();
  requestAnimationFrame(() => canvas.classList.add("ready"));
  if (reduceMotion) drawStatic(); else frame();
})();

(function () {
  const hero = document.querySelector(".tw-hero");
  if (!hero || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(([entry]) => {
    hero.classList.toggle("io-paused", !entry.isIntersecting);
  }, { threshold: 0 });
  io.observe(hero);
})();

const lightbox = document.getElementById("lightbox");
const frame = document.getElementById("previewFrame");
const cap = document.getElementById("pvCap");
const previewCol = document.querySelector(".tw-col-preview");
let current = null;
let appliedTranslate = 0;

function ensurePreviewSrc(img) {
  if (!img) return;
  if (!img.src && img.dataset.src) {
    img.src = img.dataset.src;
  }
}

function showPreview(index, row) {
  current = index;
  frame.querySelectorAll("img").forEach((img) => {
    const active = +img.dataset.index === index;
    if (active) ensurePreviewSrc(img);
    img.classList.toggle("active", active);
  });
  frame.classList.add("on");
  cap.innerHTML = row.dataset.title + "<small>" + row.dataset.role + " — " + row.dataset.year + "</small>";
  followRow(row);
}
function hidePreview() { current = null; frame.classList.remove("on"); }

function followRow(row) {
  if (window.innerWidth <= 900) {
    previewCol.style.transform = "";
    appliedTranslate = 0;
    return;
  }

  const rowRect = row.getBoundingClientRect();
  const rowCenter = rowRect.top + rowRect.height / 2;

  // getBoundingClientRect already includes the current translate.
  // Subtract appliedTranslate to recover the sticky base — no need to
  // clear the transform (that was causing the visible jump).
  const frameRect = frame.getBoundingClientRect();
  const baseTop = frameRect.top - appliedTranslate;
  const frameH = frameRect.height;

  let translateY = rowCenter - (baseTop + frameH / 2);

  const margin = 20;
  const minTranslate = margin - baseTop;
  const maxTranslate = window.innerHeight - margin - frameH - baseTop;
  if (Number.isFinite(minTranslate) && Number.isFinite(maxTranslate)) {
    if (maxTranslate < minTranslate) translateY = minTranslate;
    else translateY = Math.max(minTranslate, Math.min(maxTranslate, translateY));
  }

  appliedTranslate = translateY;
  previewCol.style.transform = "translateY(" + translateY + "px)";
}

window.addEventListener("resize", () => {
  if (current !== null) {
    const rows = document.querySelectorAll(".proj-row");
    if (rows[current]) followRow(rows[current]);
  }
});

function bindRowEvents() {
  document.querySelectorAll(".proj-row").forEach((row) => {
    const idx = +row.dataset.index;
    row.addEventListener("mouseenter", () => {
      // prefetch preview image on hover
      const img = frame.querySelector('img[data-index="' + idx + '"]');
      ensurePreviewSrc(img);
      showPreview(idx, row);
    });
    row.addEventListener("mouseleave", hidePreview);
    row.addEventListener("click", () => {
      row.classList.remove("clicked");
      void row.offsetWidth;
      row.classList.add("clicked");
      showPreview(idx, row);
      openProjectPanel(idx);
      track("project_open", {
        project_title: row.dataset.title,
        project_index: idx,
        project_cat: row.dataset.cat || "3d",
      });
    });
  });
  bindCursorHover("a, .proj-row, .preview-frame, .pp-close, .pp-shot, .filter-pill, .lang-toggle");
}

frame.addEventListener("click", () => { if (current !== null) openProjectPanel(current); });
lightbox.addEventListener("click", () => lightbox.classList.remove("open"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("open");
    Object.keys(projectPanels).forEach((idx) => {
      if (projectPanels[idx].panelEl.classList.contains("open")) closeProjectPanel(+idx);
    });
  }
});

/* ── Filter ── */
let activeFilter = "all";

function applyFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll(".filter-pill").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  document.querySelectorAll(".proj-row").forEach((row) => {
    const cat = row.dataset.cat || "3d";
    const show = filter === "all" || cat === filter;
    row.classList.toggle("is-hidden", !show);
    // re-trigger reveal for newly shown rows
    if (show) {
      row.classList.remove("is-visible");
    }
  });
  if (current !== null) {
    const rows = document.querySelectorAll(".proj-row");
    const row = rows[current];
    if (row && row.classList.contains("is-hidden")) hidePreview();
  }
  observeRows();
  track("filter_change", { filter_value: filter });
}

function bindFilter() {
  document.querySelectorAll(".filter-pill").forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
  });
}

/* ── i18n UI refresh ── */
function applyLanguage() {
  document.documentElement.lang = lang;
  localStorage.setItem("camiloh-lang", lang);

  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.textContent = lang === "es" ? "EN" : "ES";
    langBtn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
  }

  // nav
  const navLinks = document.querySelectorAll("nav ul a");
  const navKeys = ["navAbout", "navWork", "navGallery", "navContact", "navArt"];
  navLinks.forEach((a, i) => { if (navKeys[i]) a.textContent = t(navKeys[i]); });

  // hero
  const tag = document.querySelector(".tw-hero .tag");
  if (tag) {
    const svg = tag.querySelector("svg");
    tag.innerHTML = "";
    if (svg) tag.appendChild(svg);
    tag.appendChild(document.createTextNode(" " + t("heroTag")));
  }
  const h1 = document.querySelector(".tw-hero h1");
  if (h1) {
    const spark = h1.querySelector(".h1-spark") || document.getElementById("heroSpark");
    h1.innerHTML = t("heroTitle");
    if (spark) {
      spark.classList.add("h1-spark");
      spark.id = "heroSpark";
      h1.appendChild(spark);
      // re-bind easter egg after DOM rebuild
      spark.style.pointerEvents = "auto";
      spark.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = MATRIX_URL;
      };
    }
  }
  const heroP = document.querySelector(".tw-hero p");
  if (heroP) heroP.textContent = t("heroSub");

  // column heads
  const heads = document.querySelectorAll(".tw-col-head > span");
  if (heads[0]) heads[0].textContent = t("colName");
  if (heads[1]) {
    // keep filter pills
    const pills = heads[1].querySelector(".filter-pills");
    heads[1].childNodes.forEach((n) => {
      if (n.nodeType === 3) n.textContent = "";
    });
    // rebuild label + keep pills
    const label = document.createTextNode(t("colRole") + " ");
    heads[1].insertBefore(label, pills);
    if (pills) {
      const btns = pills.querySelectorAll(".filter-pill");
      if (btns[0]) btns[0].textContent = t("filterAll");
      if (btns[1]) btns[1].textContent = t("filter3d");
      if (btns[2]) btns[2].textContent = t("filterIa");
    }
  }
  if (heads[2]) heads[2].textContent = t("colYear");

  // note
  const noteSpan = document.querySelector(".tw-note span:not(.tw-note-line)");
  if (noteSpan) noteSpan.textContent = t("note");

  // zoom hint
  const zh = document.querySelector(".zoom-hint");
  if (zh) zh.textContent = t("zoomHint");

  // lightbox close
  const lbClose = document.querySelector(".lb-close");
  if (lbClose) lbClose.textContent = t("close");

  // footer (keep © easter-egg node intact)
  const fl = document.getElementById("footerLeftText");
  const fr = document.getElementById("footerRightText");
  if (fl) {
    // strip leading © from string if present
    fl.textContent = t("footerLeft").replace(/^©\s*/, "");
  }
  if (fr) fr.textContent = t("footerRight");

  // rebuild list with translated roles
  const keepFilter = activeFilter;
  buildList();
  bindRowEvents();
  applyFilter(keepFilter);

  // update open panels if any
  Object.keys(projectPanels).forEach((idx) => {
    const p = projectPanels[idx];
    const data = PROJECTS[+idx];
    if (!p || !data) return;
    const desc = p.panelEl.querySelector(".pp-desc");
    const role = p.panelEl.querySelector(".pp-role");
    const reel = p.panelEl.querySelector(".pp-reel");
    const love = p.panelEl.querySelector(".pp-love-text");
    const yearLbl = p.panelEl.querySelectorAll(".pp-meta-label");
    const post = p.panelEl.querySelector(".pp-post");
    if (desc) desc.textContent = tr(data.desc);
    if (role) role.textContent = tr(data.role);
    if (reel) reel.textContent = t("reel");
    if (love) love.textContent = t("madeWith");
    if (yearLbl[0]) yearLbl[0].textContent = t("yearLabel");
    if (yearLbl[1]) yearLbl[1].textContent = t("roleLabel");
    if (post && data.post) post.textContent = tr(data.post);
    p.panelEl.querySelectorAll(".pp-shot-zoom").forEach((el) => { el.textContent = t("expand"); });
    const credLabel = p.panelEl.querySelector(".pp-credits-label");
    if (credLabel) credLabel.textContent = t("credits");
    const credEmpty = p.panelEl.querySelector(".pp-credits-empty");
    if (credEmpty) credEmpty.textContent = t("creditsEmpty");
  });
}

/* ── Easter eggs → matrix.html ── */
const MATRIX_URL = "matrix.html";
const easterCounts = { heart: 0, lang: 0 };

function bumpEaster(key, need) {
  need = need || 7;
  easterCounts[key] = (easterCounts[key] || 0) + 1;
  if (easterCounts[key] >= need) {
    easterCounts[key] = 0;
    window.location.href = MATRIX_URL;
  }
}

function bindEasterEggs() {
  // © in footer
  const copy = document.querySelector(".easter-copy");
  if (copy) {
    copy.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = MATRIX_URL;
    });
  }

  // star on "Proyectos" title
  const spark = document.getElementById("heroSpark");
  if (spark) {
    spark.style.pointerEvents = "auto";
    spark.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = MATRIX_URL;
    });
  }

  // stars beside the footer note text
  document.querySelectorAll(".easter-note-star").forEach((el) => {
    el.style.pointerEvents = "auto";
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = MATRIX_URL;
    });
  });
}

function bindLangToggle() {
  const btn = document.getElementById("langToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    bumpEaster("lang");
    lang = lang === "es" ? "en" : "es";
    applyLanguage();
    track("language_toggle", { language: lang });
  });
}

/* ── Analytics helper ── */
function track(name, params) {
  params = params || {};
  try {
    if (typeof gtag === "function") {
      gtag("event", name, params);
    }
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: name }, params));
    }
  } catch (e) { /* no-op */ }
}

/* ── Scroll reveal for project rows ── */
let rowObserver = null;
function observeRows() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".proj-row:not(.is-hidden)").forEach((r) => r.classList.add("is-visible"));
    return;
  }
  if (rowObserver) rowObserver.disconnect();
  rowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // prefetch nearby preview image
          const idx = entry.target.dataset.index;
          const img = frame && frame.querySelector('img[data-index="' + idx + '"]');
          ensurePreviewSrc(img);
          rowObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  document.querySelectorAll(".proj-row:not(.is-hidden)").forEach((row) => {
    if (!row.classList.contains("is-visible")) rowObserver.observe(row);
  });
}

buildList();
bindRowEvents();
bindFilter();
bindLangToggle();
bindEasterEggs();
applyLanguage();
magnetize("nav ul a", 0.35);
bindCursorHover("a, .proj-row, .preview-frame, .filter-pill, .lang-toggle, .pp-credits-toggle");
track("page_view", { page: "trabajos" });
