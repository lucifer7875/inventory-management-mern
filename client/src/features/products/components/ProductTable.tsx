import type { Product } from '../types/product.types';

interface ProductTableProps {
    products: Product[];
    onDelete: (product: Product) => void;
    isDeleting: boolean;
}

export const ProductTable = ({ products, onDelete, isDeleting }: ProductTableProps) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-white/5 glass-card">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 text-slate-500 uppercase text-xs tracking-wider font-bold border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-4">Product Name</th>
                        <th className="px-6 py-4">Categories</th>
                        <th className="px-6 py-4">Quantity</th>
                        <th className="px-6 py-4">Created Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                No products found.
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-4 py-4 font-semibold">{product.name}</td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {product.categories.map((cat) => (
                                            <span
                                                key={cat.id}
                                                className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                                            >
                                                {cat.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-4">{product.quantity}</td>
                                <td className="px-4 py-4 text-muted-foreground">
                                    {(() => {
                                        const date = new Date(product.createdAt);
                                        const day = String(date.getDate()).padStart(2, '0');
                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                        const year = date.getFullYear();
                                        return `${day}/${month}/${year}`;
                                    })()}
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <button
                                        onClick={() => onDelete(product)}
                                        disabled={isDeleting}
                                        className="text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
