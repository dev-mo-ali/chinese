// Shared part-of-speech color map used across all HSK pages.
// Compound POS tags (e.g. "v./n.") fall back to the base color of the first tag.
export const POS_COLORS = {
  'pron.':     '#7c3aed',
  'v.':        '#9b2226',
  'n.':        '#2d6a4f',
  'adj.':      '#c2410c',
  'adv.':      '#0369a1',
  'num.':      '#1f1d1a',
  'm.':        '#7c5a1e',
  'm./n.':     '#7c5a1e',
  'qty.':      '#7c5a1e',
  'part.':     '#6b7280',
  'expr.':     '#9333ea',
  'prep.':     '#0d9488',
  'conj.':     '#7c3aed',
  'aux.':      '#9b2226',
  'v./n.':     '#9b2226',
  'v./prep.':  '#9b2226',
  'v./aux.':   '#9b2226',
  'v./adj.':   '#9b2226',
  'n./v.':     '#2d6a4f',
  'adj./n.':   '#c2410c',
  'adj./adv.': '#c2410c',
  'adv./adj.': '#0369a1',
  'adv./n.':   '#0369a1',
}

export const posColor = (pos) => POS_COLORS[pos] || '#6b7280'
