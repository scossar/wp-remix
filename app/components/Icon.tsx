interface IconProps {
  id: "hamburger" | "arrow-left" | "arrow-right";
  className: string | undefined;
}

export function Icon({ id, className }: IconProps): JSX.Element {
  return (
    <svg className={className}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
