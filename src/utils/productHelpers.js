import { MONSTER_COLORS, LIGHT_PINK, YELLOW } from '../theme/colors';

export function textColorForBg(color) {
  return color === LIGHT_PINK || color === YELLOW ? '#111' : '#fff';
}

export function sortProducts(list, sortBy) {
  const sorted = [...list];
  switch (sortBy) {
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name, 'tr'));
    case 'stock-desc':
      return sorted.sort((a, b) => b.stock - a.stock);
    case 'stock-asc':
      return sorted.sort((a, b) => a.stock - b.stock);
    case 'category-asc':
      return sorted.sort((a, b) => a.category.localeCompare(b.category, 'tr'));
    case 'name-asc':
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
  }
}

export function withMonsterColors(products) {
  return products.map((product, index) => ({
    ...product,
    color: MONSTER_COLORS[index % MONSTER_COLORS.length],
  }));
}
