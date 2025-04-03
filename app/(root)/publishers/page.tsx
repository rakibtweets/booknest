import type { Metadata } from "next";

import Filter from "@/components/shared/Filter";
import { publishersFilters } from "@/constants";
import PublisherCard from "@/components/cards/PublisherCard";
import LocalSearchBar from "@/components/shared/LocalSearchBar";

export const metadata: Metadata = {
  title: "Publishers - BookNext",
  description: "Browse books by publisher on BookNext",
};

// This would typically come from a database or API
const publishers = [
  {
    id: "penguin-random-house",
    name: "Penguin Random House",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Penguin Random House is the international home to nearly 250 editorially and creatively independent publishing imprints.",
    founded: 2013,
    headquarters: "New York, NY",
    booksCount: 1245,
    featuredAuthors: ["Stephen King", "Michelle Obama", "John Grisham"],
    featured: true,
  },
  {
    id: "hachette-book-group",
    name: "Hachette Book Group",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Hachette Book Group (HBG) is a leading U.S. trade publisher and a division of the third largest trade and educational book publisher in the world.",
    founded: 2006,
    headquarters: "New York, NY",
    booksCount: 876,
    featuredAuthors: ["James Patterson", "David Baldacci", "Nicholas Sparks"],
    featured: true,
  },
  {
    id: "harper-collins",
    name: "HarperCollins",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "HarperCollins Publishers is the second-largest consumer book publisher in the world.",
    founded: 1817,
    headquarters: "New York, NY",
    booksCount: 943,
    featuredAuthors: ["Agatha Christie", "Neil Gaiman", "Veronica Roth"],
    featured: true,
  },
  {
    id: "simon-schuster",
    name: "Simon & Schuster",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Simon & Schuster is a global leader in general interest publishing.",
    founded: 1924,
    headquarters: "New York, NY",
    booksCount: 754,
    featuredAuthors: ["Stephen King", "Colleen Hoover", "Bob Woodward"],
    featured: true,
  },
  {
    id: "macmillan-publishers",
    name: "Macmillan Publishers",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Macmillan Publishers is a global trade book publishing company with prominent imprints around the world.",
    founded: 1843,
    headquarters: "New York, NY",
    booksCount: 632,
    featuredAuthors: ["Nora Roberts", "Jeffrey Archer", "Ken Follett"],
    featured: true,
  },
  {
    id: "scholastic",
    name: "Scholastic",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Scholastic is the world's largest publisher and distributor of children's books.",
    founded: 1920,
    headquarters: "New York, NY",
    booksCount: 521,
    featuredAuthors: ["J.K. Rowling", "Suzanne Collins", "Dav Pilkey"],
    featured: true,
  },
  {
    id: "bloomsbury",
    name: "Bloomsbury Publishing",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Bloomsbury Publishing is a leading independent publishing house established in 1986.",
    founded: 1986,
    headquarters: "London, UK",
    booksCount: 387,
    featuredAuthors: ["J.K. Rowling", "Sarah J. Maas", "Khaled Hosseini"],
    featured: false,
  },
  {
    id: "wiley",
    name: "John Wiley & Sons",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Wiley is a global leader in research and education, specializing in academic publishing.",
    founded: 1807,
    headquarters: "Hoboken, NJ",
    booksCount: 432,
    featuredAuthors: ["Various Academic Authors"],
    featured: false,
  },
  {
    id: "oxford-university-press",
    name: "Oxford University Press",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Oxford University Press is the largest university press in the world.",
    founded: 1586,
    headquarters: "Oxford, UK",
    booksCount: 654,
    featuredAuthors: ["Various Academic Authors"],
    featured: false,
  },
  {
    id: "cambridge-university-press",
    name: "Cambridge University Press",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Cambridge University Press is the publishing business of the University of Cambridge.",
    founded: 1534,
    headquarters: "Cambridge, UK",
    booksCount: 543,
    featuredAuthors: ["Various Academic Authors"],
    featured: false,
  },
  {
    id: "harlequin",
    name: "Harlequin",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Harlequin is one of the world's leading publishers of romance fiction.",
    founded: 1949,
    headquarters: "Toronto, Canada",
    booksCount: 765,
    featuredAuthors: ["Nora Roberts", "Debbie Macomber", "Diana Palmer"],
    featured: false,
  },
  {
    id: "tor-books",
    name: "Tor Books",
    logo: "https://placehold.co/400x300?text=Publishers",
    description:
      "Tor Books is the primary imprint of Tom Doherty Associates, publishing science fiction and fantasy.",
    founded: 1980,
    headquarters: "New York, NY",
    booksCount: 321,
    featuredAuthors: ["Brandon Sanderson", "John Scalzi", "V.E. Schwab"],
    featured: false,
  },
];

// Alphabetically sort publishers
const sortedPublishers = [...publishers].sort((a, b) =>
  a.name.localeCompare(b.name)
);
// Get featured publishers

export default function PublishersPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Publishers</h1>
        <p className="text-muted-foreground">
          Browse books by publisher and discover new titles from your favorite
          publishing houses
        </p>
      </div>

      {/* Search options */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/publishers"
          iconPosition="left"
          placeholder="Search for publishers..."
          otherClasses="flex-1"
        />

        <Filter
          filters={publishersFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {/* All Publishers */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          All Publishers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedPublishers.map((publisher) => (
            <PublisherCard key={publisher.id} publisher={publisher} />
          ))}
        </div>
      </section>
    </div>
  );
}
