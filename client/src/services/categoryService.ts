import { baseApi } from './baseApi';
import type { Category } from '../features/products/types/product.types';

export const categoryService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => 'products/categories',
            providesTags: ['Category'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCategoriesQuery,
} = categoryService;
