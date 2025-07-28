"use server";

import mongoose, { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import Publisher, { IPublisher } from "@/database/publisher.model";
import { IGetPublisherParams } from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";
import { PublisherFormValues, publisherSchema } from "@/validations/publisher";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";

export const getPublishers = async (
  params: IGetPublisherParams
): Promise<
  ActionResponse<{
    publishers: IPublisher[];
    total: number;
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
  }>
> => {
  try {
    await dbConnect();
    const { page = 1, pageSize = 10, query, filter } = params;
    const skip = (Number(page) - 1) * pageSize;
    const limit = pageSize;
    let sortCriteria = {};
    const filterQuery: FilterQuery<IPublisher> = {};

    // Search by name or headquarters (optional)
    if (query) {
      filterQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { headquarters: { $regex: query, $options: "i" } },
      ];
    }

    // Filters
    switch (filter) {
      case "alphabetical(a-z)":
        sortCriteria = { name: 1 };
        break;
      case "booksCount":
        sortCriteria = { booksCount: -1 };
        break;
      case "ascending":
        sortCriteria = { price: 1 };
        break;
      case "descending":
        sortCriteria = { price: -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
        break;
    }
    const totalPublishers = await Publisher.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalPublishers / limit);

    const publishers = await Publisher.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
    return {
      success: true,
      data: {
        publishers: JSON.parse(JSON.stringify(publishers)),
        total: totalPublishers,
        totalPages,
        currentPage: page,
        nextPage,
        prevPage,
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
    authorizeRole: "admin",
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
    authorizeRole: "admin",
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
    authorizeRole: "admin",
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
