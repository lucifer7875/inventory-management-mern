import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    quantity: number;
    categories: mongoose.Types.ObjectId[];
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        quantity: { type: Number, required: true, default: 0 },
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
