"use server";

import Publisher from "@/database/publisher.model";
import { PublisherFormValues, publisherSchema } from "@/validations/publisher";
import { revalidatePath } from "next/cache";
import dbConnect from "../mongoose";
import mongoose from "mongoose";

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

export const getPublishers = async (page: number, limit: number) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const total = publishers.length;

  return {
    publishers: publishers.slice(start, end),
    total,
  };
};

export const getPublisherById = async (id: string) => {
  const publisher = publishers.find((publisher) => publisher.id === id);

  if (!publisher) {
    throw new Error("Publisher not found");
  }

  return publisher;
};

export async function createPublisher(data: PublisherFormValues) {
  try {
    await dbConnect();

    // Validate form data
    const validatedData = publisherSchema.parse(data);

    // Create new publisher
    const newPublisher = new Publisher(validatedData);

    await newPublisher.save();

    revalidatePath("/admin/publishers");
    revalidatePath("/publishers");

    return { success: true, publisher: newPublisher };
  } catch (error) {
    console.error("Error creating publisher:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create publisher" };
  }
}

export async function updatePublisher(id: string, data: PublisherFormValues) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid publisher ID");
    }

    // Validate form data
    const validatedData = publisherSchema.parse(data);

    // Update publisher
    const updatedPublisher = await Publisher.findByIdAndUpdate(
      id,
      {
        ...validatedData,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedPublisher) {
      throw new Error("Publisher not found");
    }

    revalidatePath(`/admin/publishers/${id}`);
    revalidatePath(`/admin/publishers`);
    revalidatePath(`/publishers/${id}`);
    revalidatePath("/publishers");

    return { success: true, publisher: updatedPublisher };
  } catch (error) {
    console.error("Error updating publisher:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update publisher" };
  }
}
