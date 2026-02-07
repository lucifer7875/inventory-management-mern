import { useState } from 'react';

export const useProductFilters = () => {
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: '',
        categories: [] as string[],
        sortBy: undefined as string | undefined,
        sortOrder: undefined as 'asc' | 'desc' | undefined,
    });

    const setSearch = (search: string) => {
        setFilters((prev) => ({ ...prev, search, page: 1 }));
    };

    const setPage = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    const setCategories = (categories: string[]) => {
        setFilters((prev) => ({ ...prev, categories, page: 1 }));
    };

    const setSorting = (sortBy: string | undefined, sortOrder: 'asc' | 'desc' | undefined) => {
        setFilters((prev) => ({ ...prev, sortBy, sortOrder, page: 1 }));
    };

    const resetFilters = () => {
        setFilters({
            page: 1,
            limit: 10,
            search: '',
            categories: [],
            sortBy: undefined,
            sortOrder: undefined,
        });
    };

    return {
        filters,
        setSearch,
        setPage,
        setCategories,
        setSorting,
        resetFilters,
    };
};
