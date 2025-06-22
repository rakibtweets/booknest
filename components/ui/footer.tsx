import type React from "react";
import { cn } from "@/lib/utils";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface FooterContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface FooterColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface FooterBottomProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Footer({ children, className, ...props }: FooterProps) {
  return (
    <footer className={cn("border-t bg-background", className)} {...props}>
      <div className="container mx-auto px-4 py-8">{children}</div>
    </footer>
  );
}

export function FooterContent({
  children,
  className,
  ...props
}: FooterContentProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function FooterColumn({
  children,
  className,
  ...props
}: FooterColumnProps) {
  return (
    <div className={cn("flex flex-col space-y-3", className)} {...props}>
      {children}
    </div>
  );
}

export function FooterBottom({
  children,
  className,
  ...props
}: FooterBottomProps) {
  return (
    <div
      className={cn(
        "mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
