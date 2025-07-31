"use server";

import Author from "@/database/author.model";
import Book from "@/database/book.model";
import Publisher from "@/database/publisher.model";

import dbConnect from "../mongoose";

const searchableTypes = ["book", "author", "publisher"];

interface GlobalSearchParams {
  query?: string;
  type?: string;
}

export const globalSearch = async (params: GlobalSearchParams) => {
  try {
    await dbConnect();
    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };
    let results: {
      title: string;
      type: string;
      id: string;
    }[] = [];

    const modelsAndTypes = [
      {
        model: Book,
        searchField: "title",
        type: "book",
      },
      {
        model: Author,
        searchField: "name",
        type: "author",
      },
      {
        model: Publisher,
        searchField: "name",
        type: "publisher",
      },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !searchableTypes.includes(typeLower)) {
      // Search across all models
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(3);

        results.push(
          ...queryResults.map((item) => ({
            title: item[searchField],
            type,
            id: item._id,
          }))
        );
      }
    } else {
      // Search only within specified type
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);

      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(10);

      results = queryResults.map((item) => ({
        title: item[modelInfo.searchField],
        type: typeLower,
        id: item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.error(`Error in globalSearch: ${error}`);
    throw error;
  }
};
