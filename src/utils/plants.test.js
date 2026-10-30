import { describe, it, expect } from 'vitest'
import raw from '../data/culture-nc-merged.json'
import { MONTHS } from './months'
import { STEPS, PLANTS_LIST, getActiveSteps, getPlantsForMonthStep } from './plants'

const STEP_KEYS = STEPS.map((s) => s.key)

describe('données culture-nc-merged.json', () => {
  // Un mois mal écrit fait disparaître la plante du calendrier sans erreur.
  it('n\'utilise que des noms de mois valides', () => {
    const invalid = []
    for (const [nom, p] of Object.entries(raw.plantes)) {
      for (const step of STEP_KEYS) {
        for (const m of p[step] || []) {
          if (!MONTHS.includes(m)) invalid.push(`${nom}.${step} = "${m}"`)
        }
      }
    }
    expect(invalid).toEqual([])
  })

  // Une plante sans aucune étape n'apparaît dans aucun mois.
  it('donne au moins une étape ou « toute l\'année » à chaque plante', () => {
    const orphans = PLANTS_LIST.filter(
      (p) => !p.touteAnnee && STEP_KEYS.every((k) => p[k].length === 0)
    ).map((p) => p.nom)
    expect(orphans).toEqual([])
  })
})

describe('index des plantes', () => {
  it('fusionne toute_annee sans doublon ni perte des étapes existantes (casse ignorée)', () => {
    const names = PLANTS_LIST.map((p) => p.nom.toLowerCase())
    expect(names.length).toBe(new Set(names).size)

    for (const ta of raw.toute_annee) {
      const plant = PLANTS_LIST.find((p) => p.nom.toLowerCase() === ta.toLowerCase())
      expect(plant, ta).toBeDefined()
      expect(plant.touteAnnee, ta).toBe(true)

      const source = Object.entries(raw.plantes).find(([k]) => k.toLowerCase() === ta.toLowerCase())
      if (source) {
        for (const k of STEP_KEYS) expect(plant[k], `${ta}.${k}`).toEqual(source[1][k] || [])
      }
    }
  })
})

describe('getActiveSteps', () => {
  const plant = {
    semis: ['Mars'], en_terre: ['Avril'], recolte: ['Juillet'], bouture_rejet: [],
    touteAnnee: false
  }

  it('renvoie les étapes du mois, et la récolte chaque mois pour « toute l\'année »', () => {
    expect(getActiveSteps(plant, 'Mars')).toEqual(['semis'])
    expect(getActiveSteps(plant, 'Juillet')).toEqual(['recolte'])
    expect(getActiveSteps(plant, 'Janvier')).toEqual([])

    const allYear = { ...plant, touteAnnee: true }
    for (const m of MONTHS) expect(getActiveSteps(allYear, m)).toContain('recolte')
  })

  it('liste les plantes « toute l\'année » dans les récoltes de chaque mois', () => {
    const allYear = PLANTS_LIST.filter((p) => p.touteAnnee).map((p) => p.nom)
    for (const m of MONTHS) {
      const harvest = getPlantsForMonthStep(m, 'recolte').map((p) => p.nom)
      expect(harvest).toEqual(expect.arrayContaining(allYear))
    }
  })
})
