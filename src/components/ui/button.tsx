import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse" | "dark" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold uppercase tracking-[0.08em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent-600 text-white shadow-glow hover:bg-accent-500 active:bg-accent-700",
  secondary: "border border-paper/30 text-paper hover:border-paper hover:bg-paper/10",
  inverse: "border border-paper/30 text-paper hover:border-paper hover:bg-paper/10",
  dark: "bg-night-900 text-paper hover:bg-night-800",
  ghost: "text-accent-400 hover:text-accent-300",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-[12px]",
  lg: "h-13 px-8 text-[13px]",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], variant === "ghost" ? "h-auto px-0 text-[12px]" : sizes[size], className);
}

function Arrow() {
  return <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />;
}

type SharedProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: SharedProps & Omit<ComponentProps<typeof Link>, "className">) {
  return (
    <Link className={classes(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  type = "button",
  ...props
}: SharedProps & Omit<ComponentProps<"button">, "className">) {
  return (
    <button type={type} className={classes(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
