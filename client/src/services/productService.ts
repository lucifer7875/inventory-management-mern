import { baseApi } from './baseApi';
import type {
    ProductListResponse,
    ProductFilters,
    Product,
    CreateProductRequest
} from '../features/products/types/product.types';

export const productService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductListResponse, Partial<ProductFilters>>({
            query: (filters) => {
                const params = new URLSearchParams();
                if (filters.page) params.append('page', filters.page.toString());
                if (filters.limit) params.append('limit', filters.limit.toString());
                if (filters.search) params.append('search', filters.search);
                if (filters.categories?.length) {
                    params.append('categories', filters.categories.join(','));
                }
                return `products?${params.toString()}`;
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Product' as const, id })),
                        { type: 'Product', id: 'LIST' },
                    ]
                    : [{ type: 'Product', id: 'LIST' }],
        }),
        createProduct: builder.mutation<Product, CreateProductRequest>({
            query: (body) => ({
                url: 'products',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }],
        }),
        deleteProduct: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} = productService;
