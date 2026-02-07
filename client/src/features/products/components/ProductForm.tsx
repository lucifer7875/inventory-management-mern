import { useState } from 'react';
import type { Category, CreateProductRequest } from '../types/product.types';

interface ProductFormProps {
    allCategories: Category[];
    onSubmit: (data: CreateProductRequest) => void;
    isLoading: boolean;
    onClose: () => void;
}

export const ProductForm = ({ allCategories, onSubmit, isLoading, onClose }: ProductFormProps) => {
    const [formData, setFormData] = useState<CreateProductRequest>({
        name: '',
        description: '',
        quantity: 0,
        categoryIds: [],
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
        if (formData.quantity < 0) newErrors.quantity = 'Quantity cannot be negative';
        if (formData.categoryIds.length === 0) newErrors.categoryIds = 'Select at least one category';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const toggleCategory = (id: string) => {
        const newIds = formData.categoryIds.includes(id)
            ? formData.categoryIds.filter((cid) => cid !== id)
            : [...formData.categoryIds, id];
        setFormData({ ...formData, categoryIds: newIds });
    };

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="glass-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/10">
                <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <h2 className="text-2xl font-black tracking-tight underline-offset-8 decoration-accent underline">Record New Asset</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors text-xl">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-primary/80 mb-2">Asset Identity</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full bg-background/50 border ${errors.name ? 'border-destructive' : 'border-white/10'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-muted-foreground/30`}
                            placeholder="e.g. Imperial Watch"
                        />
                        {errors.name && <p className="text-destructive text-xs mt-2 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-primary/80 mb-2">Specifications</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-sm h-28 resize-none focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-muted-foreground/30"
                            placeholder="Detailed asset specifications..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-primary/80 mb-2">Inventory Count</label>
                            <input
                                type="number"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                                className={`w-full bg-background/50 border ${errors.quantity ? 'border-destructive' : 'border-white/10'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                                min="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-accent/80 mb-3">Distinguished Categories</label>
                        <div className="flex flex-wrap gap-2 p-4 bg-background/30 rounded-xl border border-white/5 max-h-40 overflow-y-auto">
                            {allCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => toggleCategory(cat.id)}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all border ${formData.categoryIds.includes(cat.id)
                                        ? 'bg-accent text-accent-foreground border-accent shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                                        : 'bg-white/5 text-muted-foreground border-white/10 hover:border-accent/50'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                        {errors.categoryIds && <p className="text-destructive text-xs mt-2 font-medium">{errors.categoryIds}</p>}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-foreground py-3 rounded-xl font-bold transition-all border border-white/5"
                        >
                            Dismiss
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 noble-button-primary py-3 rounded-xl"
                        >
                            {isLoading ? 'Authorizing...' : 'Save Asset'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
