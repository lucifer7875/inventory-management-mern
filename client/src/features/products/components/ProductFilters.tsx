import type { Category } from '../types/product.types';

interface ProductFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    selectedCategories: string[];
    onCategoriesChange: (ids: string[]) => void;
    allCategories: Category[];
}

export const ProductFilters = ({
    search,
    onSearchChange,
    selectedCategories,
    onCategoriesChange,
    allCategories,
}: ProductFiltersProps) => {
    const toggleCategory = (id: string) => {
        if (selectedCategories.includes(id)) {
            onCategoriesChange(selectedCategories.filter((catId) => catId !== id));
        } else {
            onCategoriesChange([...selectedCategories, id]);
        }
    };

    return (
        <div className="space-y-6 mb-8 p-6 glass-card rounded-2xl border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-widest text-primary/80">Search Collection</label>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-muted-foreground/50"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-widest text-accent/80">Elite Categories</label>
                    <div className="flex flex-wrap gap-2">
                        {allCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => toggleCategory(cat.id)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedCategories.includes(cat.id)
                                    ? 'bg-accent text-accent-foreground border-accent shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                                    : 'bg-white/5 text-muted-foreground border-white/10 hover:border-accent/50 hover:text-foreground'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
