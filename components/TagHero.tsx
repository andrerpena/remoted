import { getIconForTag } from "../lib/tag-icons";

export interface TagHeroProps {
  tag: string;
}

export function TagHero(props: TagHeroProps) {
  const { tag } = props;
  const icon = getIconForTag(tag);
  const tagElement = icon ? <i className={`fab fa-${icon.icon}`} /> : null;
  return (
    <div className="banner">
      <div className="banner-header">
        {tagElement}
        <span className="banner-title">Remote {tag} jobs</span>
      </div>
    </div>
  );
}
