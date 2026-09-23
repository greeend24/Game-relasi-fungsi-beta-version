/**
 * DIAGRAM PANAH ROPE COLOR PALETTES
 * Provides vibrant, rich, detective-board styled distinct rope colors for arrow diagrams.
 * Prevents monochromatic clutter by giving each connection thread its own distinct hue,
 * complete with matching arrowheads, drop-shadows, and 3D woven core highlights.
 */

export const DIAGRAM_ROPE_PALETTES = [
  { id: 'crimson', stroke: '#E11D48', shadow: 'rgba(225,29,72,0.48)', sheen: '#FECDD3', name: 'Merah Kirmizi' },
  { id: 'blue',    stroke: '#2563EB', shadow: 'rgba(37,99,235,0.48)', sheen: '#BFDBFE', name: 'Biru Samudra' },
  { id: 'emerald', stroke: '#059669', shadow: 'rgba(5,150,105,0.48)', sheen: '#A7F3D0', name: 'Hijau Zamrud' },
  { id: 'amber',   stroke: '#D97706', shadow: 'rgba(217,119,6,0.48)', sheen: '#FDE68A', name: 'Kuning Amber' },
  { id: 'purple',  stroke: '#7C3AED', shadow: 'rgba(124,58,237,0.48)', sheen: '#DDD6FE', name: 'Ungu Violet' },
  { id: 'cyan',    stroke: '#0891B2', shadow: 'rgba(8,145,178,0.48)', sheen: '#A5F3FC', name: 'Biru Cyan' },
  { id: 'pink',    stroke: '#DB2777', shadow: 'rgba(219,39,119,0.48)', sheen: '#FBCFE8', name: 'Merah Muda' },
  { id: 'indigo',  stroke: '#4F46E5', shadow: 'rgba(79,70,229,0.48)', sheen: '#C7D2FE', name: 'Biru Indigo' },
];

/**
 * Returns a distinct palette based on source index and branching occurrence
 * @param {number} idx - Source index (e.g. node index in Set A) or pair index
 * @param {number} branchOffset - Counter if the same source node has multiple outgoing arrows
 */
export const getDiagramRopePalette = (idx = 0, branchOffset = 0) => {
  const safeIdx = typeof idx === 'number' && !isNaN(idx) ? Math.max(0, idx) : 0;
  const colorIndex = (safeIdx + branchOffset * 3) % DIAGRAM_ROPE_PALETTES.length;
  return DIAGRAM_ROPE_PALETTES[colorIndex];
};
