import YellowMonster, { YELLOW_MONSTER_VIEWBOX } from './YellowMonster';

export default function SidebarMonster() {
  return (
    <svg viewBox={YELLOW_MONSTER_VIEWBOX} className="sidebar-monster" aria-hidden="true">
      <YellowMonster />
    </svg>
  );
}
