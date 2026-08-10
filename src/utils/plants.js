import raw from '../data/culture-nc-merged.json'

export const STEPS = [
  { key: 'semis', label: 'Semer', emoji: '🌱', color: 'semis' },
  { key: 'en_terre', label: 'Mettre en terre', emoji: '🌿', color: 'enterre' },
  { key: 'recolte', label: 'Récolter', emoji: '🍅', color: 'recolte' },
  { key: 'bouture_rejet', label: 'Bouture/Rejet', emoji: '✂️', color: 'bouture' }
]

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function buildPlantsIndex() {
  const plantes = {}

  for (const [nom, p] of Object.entries(raw.plantes)) {
    plantes[nom] = {
      ...p,
      nom,
      semis: p.semis || [],
      en_terre: p.en_terre || [],
      recolte: p.recolte || [],
      bouture_rejet: p.bouture_rejet || [],
      compagnons: p.compagnons || [],
      mauvais_compagnons: p.mauvais_compagnons || [],
      touteAnnee: false
    }
  }

  for (const ta of raw.toute_annee) {
    const matchKey = Object.keys(plantes).find(
      (k) => k.toLowerCase() === ta.toLowerCase()
    )
    if (matchKey) {
      plantes[matchKey].touteAnnee = true
    } else {
      const nom = capitalize(ta)
      plantes[nom] = {
        nom,
        nom_scientifique: '',
        wikipedia: '',
        semis: [],
        en_terre: [],
        recolte: [],
        bouture_rejet: [],
        compagnons: [],
        mauvais_compagnons: [],
        source: 'toute_annee',
        photo: '',
        touteAnnee: true
      }
    }
  }

  return plantes
}

export const PLANTS_INDEX = buildPlantsIndex()

export const PLANTS_LIST = Object.values(PLANTS_INDEX).sort((a, b) =>
  a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' })
)

export function getPlant(nom) {
  return PLANTS_INDEX[nom]
}

// Étapes actives pour une plante donnée à un mois donné
export function getActiveSteps(plant, month) {
  const active = []
  if (plant.semis.includes(month)) active.push('semis')
  if (plant.en_terre.includes(month)) active.push('en_terre')
  if (plant.recolte.includes(month) || plant.touteAnnee) active.push('recolte')
  if (plant.bouture_rejet.includes(month)) active.push('bouture_rejet')
  return active
}

export function getPlantsForMonthStep(month, stepKey) {
  return PLANTS_LIST.filter((plant) => getActiveSteps(plant, month).includes(stepKey))
}

export function wikipediaUrl(slugOrUrl) {
  if (!slugOrUrl) return null
  if (slugOrUrl.startsWith('http')) return slugOrUrl
  return `https://fr.wikipedia.org/wiki/${slugOrUrl}`
}
