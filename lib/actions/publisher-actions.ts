"use server";

import Publisher, { IPublisher } from "@/database/publisher.model";
import { PublisherFormValues, publisherSchema } from "@/validations/publisher";
import { revalidatePath } from "next/cache";
import dbConnect from "../mongoose";
import mongoose from "mongoose";
import action from "../handlers/action";
import handleError from "../handlers/error";

// const publishers = [
//   {
//     id: "penguin-random-house",
//     name: "Penguin Random House",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Penguin Random House is the international home to nearly 250 editorially and creatively independent publishing imprints.",
//     founded: 2013,
//     headquarters: "New York, NY",
//     booksCount: 1245,
//     featuredAuthors: ["Stephen King", "Michelle Obama", "John Grisham"],
//     featured: true,
//   },
//   {
//     id: "hachette-book-group",
//     name: "Hachette Book Group",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Hachette Book Group (HBG) is a leading U.S. trade publisher and a division of the third largest trade and educational book publisher in the world.",
//     founded: 2006,
//     headquarters: "New York, NY",
//     booksCount: 876,
//     featuredAuthors: ["James Patterson", "David Baldacci", "Nicholas Sparks"],
//     featured: true,
//   },
//   {
//     id: "harper-collins",
//     name: "HarperCollins",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "HarperCollins Publishers is the second-largest consumer book publisher in the world.",
//     founded: 1817,
//     headquarters: "New York, NY",
//     booksCount: 943,
//     featuredAuthors: ["Agatha Christie", "Neil Gaiman", "Veronica Roth"],
//     featured: true,
//   },
//   {
//     id: "simon-schuster",
//     name: "Simon & Schuster",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Simon & Schuster is a global leader in general interest publishing.",
//     founded: 1924,
//     headquarters: "New York, NY",
//     booksCount: 754,
//     featuredAuthors: ["Stephen King", "Colleen Hoover", "Bob Woodward"],
//     featured: true,
//   },
//   {
//     id: "macmillan-publishers",
//     name: "Macmillan Publishers",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Macmillan Publishers is a global trade book publishing company with prominent imprints around the world.",
//     founded: 1843,
//     headquarters: "New York, NY",
//     booksCount: 632,
//     featuredAuthors: ["Nora Roberts", "Jeffrey Archer", "Ken Follett"],
//     featured: true,
//   },
//   {
//     id: "scholastic",
//     name: "Scholastic",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Scholastic is the world's largest publisher and distributor of children's books.",
//     founded: 1920,
//     headquarters: "New York, NY",
//     booksCount: 521,
//     featuredAuthors: ["J.K. Rowling", "Suzanne Collins", "Dav Pilkey"],
//     featured: true,
//   },
//   {
//     id: "bloomsbury",
//     name: "Bloomsbury Publishing",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Bloomsbury Publishing is a leading independent publishing house established in 1986.",
//     founded: 1986,
//     headquarters: "London, UK",
//     booksCount: 387,
//     featuredAuthors: ["J.K. Rowling", "Sarah J. Maas", "Khaled Hosseini"],
//     featured: false,
//   },
//   {
//     id: "wiley",
//     name: "John Wiley & Sons",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Wiley is a global leader in research and education, specializing in academic publishing.",
//     founded: 1807,
//     headquarters: "Hoboken, NJ",
//     booksCount: 432,
//     featuredAuthors: ["Various Academic Authors"],
//     featured: false,
//   },
//   {
//     id: "oxford-university-press",
//     name: "Oxford University Press",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Oxford University Press is the largest university press in the world.",
//     founded: 1586,
//     headquarters: "Oxford, UK",
//     booksCount: 654,
//     featuredAuthors: ["Various Academic Authors"],
//     featured: false,
//   },
//   {
//     id: "cambridge-university-press",
//     name: "Cambridge University Press",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Cambridge University Press is the publishing business of the University of Cambridge.",
//     founded: 1534,
//     headquarters: "Cambridge, UK",
//     booksCount: 543,
//     featuredAuthors: ["Various Academic Authors"],
//     featured: false,
//   },
//   {
//     id: "harlequin",
//     name: "Harlequin",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Harlequin is one of the world's leading publishers of romance fiction.",
//     founded: 1949,
//     headquarters: "Toronto, Canada",
//     booksCount: 765,
//     featuredAuthors: ["Nora Roberts", "Debbie Macomber", "Diana Palmer"],
//     featured: false,
//   },
//   {
//     id: "tor-books",
//     name: "Tor Books",
//     logo: "https://placehold.co/400x300?text=Publishers",
//     description:
//       "Tor Books is the primary imprint of Tom Doherty Associates, publishing science fiction and fantasy.",
//     founded: 1980,
//     headquarters: "New York, NY",
//     booksCount: 321,
//     featuredAuthors: ["Brandon Sanderson", "John Scalzi", "V.E. Schwab"],
//     featured: false,
//   },
// ];

export const getPublishers = async (): Promise<
  ActionResponse<{ publishers: IPublisher[]; total: number }>
> => {
  try {
    await dbConnect();
    const publishers = await Publisher.find().sort({ createdAt: -1 });
    const totalPublishers = await Publisher.countDocuments();
    return {
      success: true,
      data: {
        publishers: JSON.parse(JSON.stringify(publishers)),
        total: totalPublishers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getPublisherById = async (
  id: string
): Promise<ActionResponse<{ publisher: IPublisher }>> => {
  try {
    await dbConnect();
    const publisher = await Publisher.findById(id);
    if (!publisher) {
      throw new Error("Publisher not found");
    }
    return {
      success: true,
      data: { publisher: JSON.parse(JSON.stringify(publisher)) },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const createPublisher = async (
  params: PublisherFormValues
): Promise<ActionResponse<IPublisher>> => {
  const validationResult = await action({
    params,
    schema: publisherSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // start creating a new author
    await dbConnect();
    const [publisher] = await Publisher.create([params], { session });
    if (!publisher) {
      throw new Error("Failed to create publisher");
    }
    await session.commitTransaction();
    revalidatePath("/admin/publishers");
    revalidatePath("/publishers");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(publisher)),
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const updatePublisher = async (
  params: Partial<IPublisher>
): Promise<ActionResponse<{ publisher: IPublisher }>> => {
  const validationResult = await action({
    params,
    schema: publisherSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await dbConnect();
    const { _id, ...updateData } = params;

    const publisher = await Publisher.findByIdAndUpdate(_id, updateData, {
      new: true,
      session,
      runValidators: true,
    });

    if (!publisher) {
      throw new Error("Publisher not found or update failed");
    }

    await session.commitTransaction();

    revalidatePath("/admin/publishers");
    revalidatePath("/publishers");

    return {
      success: true,
      data: { publisher: JSON.parse(JSON.stringify(publisher)) },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const deletePublisher = async (
  id: string
): Promise<ActionResponse<{ publisher: IPublisher }>> => {
  const validationResult = await action({
    params: { id },
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await dbConnect();
    const publisher = await Publisher.findByIdAndDelete(id, { session });
    if (!publisher) {
      throw new Error("Publisher not found or deletion failed");
    }
    await session.commitTransaction();
    revalidatePath("/admin/publishers");
    revalidatePath("/publishers");
    return {
      success: true,
      data: { publisher: JSON.parse(JSON.stringify(publisher)) },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};
