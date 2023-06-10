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

export function HeartIcon(props) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </BaseIcon>
  );
}

export function ChatBubbleIcon(props) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </BaseIcon>
  );
}

export function CheckIcon(props) {
  return (
    <BaseIcon {...props}>
      <polyline points="20 6 9 17 4 12" />
    </BaseIcon>
  );
}

export function ChevronDownIcon(props) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </BaseIcon>
  );
}
