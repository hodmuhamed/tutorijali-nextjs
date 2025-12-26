export const categoryColors: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  'povrat-poreza': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-500',
    accent: 'bg-emerald-600',
  },
  'dolazak-u-njemacku': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-500',
    accent: 'bg-blue-600',
  },
  'zdravstvo': {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-500',
    accent: 'bg-rose-600',
  },
  'posao': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-500',
    accent: 'bg-amber-600',
  },
  'savjeti': {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-500',
    accent: 'bg-purple-600',
  },
  'spajanje-porodice': {
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    border: 'border-pink-500',
    accent: 'bg-pink-600',
  },
  'auto': {
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-500',
    accent: 'bg-slate-600',
  },
  'default': {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-500',
    accent: 'bg-gray-600',
  },
};

export function getCategoryColor(slug: string | undefined) {
  if (!slug) return categoryColors.default;
  return categoryColors[slug] || categoryColors.default;
}
