import { Schema, Document } from "mongoose";

interface IBaseSchema extends Document {
  createdAt: Date;
  updatedAt: Date;
}

const baseSchema = new Schema<IBaseSchema>({
  createdAt: {
    type: Date,
    default: () => new Date(),
    index: true,
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
    index: true,
  },
});

export default baseSchema;
