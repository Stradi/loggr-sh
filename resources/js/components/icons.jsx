import clsx from "clsx";

function BaseIcon({
  size = "md",
  stroke = "medium",
  fillColor,
  svgClassName,
  children,
  ...props
}) {
  return (
    <i {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor || "none"}
        viewBox="0 0 24 24"
        strokeWidth={clsx(
          stroke == "thinner" && 0.5,
          stroke == "thin" && 1,
          stroke == "medium" && 1.5,
          stroke == "thick" && 2,
          stroke == "thicker" && 4
        )}
        stroke="currentColor"
        className={clsx(
          size == "sm" && "h-4 w-4",
          size == "md" && "h-6 w-6",
          size == "lg" && "h-8 w-8",
          size == "2xl" && "h-16 w-16",
          svgClassName
        )}
      >
        {children}
      </svg>
    </i>
  );
}

export function CloseSidebarIcon(props) {
  return (
    <BaseIcon {...props} svgClassName="-rotate-90">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <path d="m9 16 3-3 3 3" />
    </BaseIcon>
  );
}

export function OpenSidebarIcon(props) {
  return (
    <BaseIcon {...props} svgClassName="-rotate-90">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <path d="m15 14-3 3-3-3" />
    </BaseIcon>
  );
}

export function XIcon(props) {
  return (
    <BaseIcon {...props}>
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </BaseIcon>
  );
}
