import { useState } from 'react';
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation
} from '../services/productService';
import { useGetCategoriesQuery } from '../services/categoryService';
import { useProductFilters } from '../features/products/hooks/useProductFilters';
import { ProductTable } from '../features/products/components/ProductTable';
import { ProductFilters } from '../features/products/components/ProductFilters';
import { ProductForm } from '../features/products/components/ProductForm';
import { DeleteConfirmationModal } from '../features/products/components/DeleteConfirmationModal';

const ProductsPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState<{ id: string, name: string } | null>(null);
    const { filters, setSearch, setPage, setCategories } = useProductFilters();

    const { data: productsData, isLoading: productsLoading, error: productsError } = useGetProductsQuery(filters);
    const { data: categories = [] } = useGetCategoriesQuery();
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    const handleCreateProduct = async (data: any) => {
        try {
            await createProduct(data).unwrap();
            setIsFormOpen(false);
        } catch (err: any) {
            alert(err.data?.message || 'Failed to create product');
        }
    };

    const handleDeleteProduct = async () => {
        if (!deletingProduct) return;
        try {
            await deleteProduct(deletingProduct.id).unwrap();
            setDeletingProduct(null);
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">Product Inventory</h1>
                    <p className="text-muted-foreground mt-2 text-lg">Manage your elite stock and collections with precision.</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="noble-button-primary scale-110 md:scale-100"
                >
                    + Add New Asset
                </button>
            </div>

            <ProductFilters
                search={filters.search}
                onSearchChange={setSearch}
                selectedCategories={filters.categories}
                onCategoriesChange={setCategories}
                allCategories={categories}
            />

            {productsLoading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : productsError ? (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-center">
                    Error loading products. Please try again later.
                </div>
            ) : (
                <div className="space-y-6">
                    <ProductTable
                        products={productsData?.data || []}
                        onDelete={(product) => setDeletingProduct({ id: product.id, name: product.name })}
                        isDeleting={isDeleting}
                    />

                    {/* Pagination */}
                    {productsData && productsData.pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-10">
                            {Array.from({ length: productsData.pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold transition-all ${filters.page === pageNum
                                        ? 'bg-gradient-to-br from-primary to-primary/80 text-white border-primary shadow-[0_0_15px_rgba(124,58,237,0.3)] scale-110'
                                        : 'bg-white/5 hover:bg-white/10 text-muted-foreground border-white/10 hover:border-primary/50'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {isFormOpen && (
                <ProductForm
                    allCategories={categories}
                    onSubmit={handleCreateProduct}
                    isLoading={isCreating}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            <DeleteConfirmationModal
                isOpen={!!deletingProduct}
                itemName={deletingProduct?.name || ''}
                onConfirm={handleDeleteProduct}
                onCancel={() => setDeletingProduct(null)}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default ProductsPage;
