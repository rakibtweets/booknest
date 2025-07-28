import { BookOpen } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "../ui/theme-toggle";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <BookOpen className="h-6 w-6" />,
  name = "Book-Next",
  columns = [
    {
      title: "Links",
      links: [
        { text: "Books", href: "/books" },
        { text: "Authors", href: "/authors" },
        { text: "Publishers", href: "/publishers" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "/about" },
        { text: "Faq", href: "/faq" },
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Service", href: "/terms" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "FAQ", href: "/faq" },
        { text: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Connect",
      links: [
        { text: "Twitter", href: siteConfig.links.twitter },
        { text: "Instagram", href: siteConfig.links.instagram },
        { text: "Facebook", href: siteConfig.links.facebook },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Book-Next. All rights reserved.`,
  policies = [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full", className)}>
      <div className="max-w-7xl mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                {logo}
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Your premier destination for books, knowledge, and literary
                adventures. Discover your next great read.
              </p>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div className="text-sm text-muted-foreground">{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <Link
                  key={index}
                  href={policy.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {policy.text}
                </Link>
              ))}
              {showModeToggle && <ThemeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
