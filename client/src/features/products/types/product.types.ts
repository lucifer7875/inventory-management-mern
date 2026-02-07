export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    categories: Category[];
}

export interface ProductListResponse {
    data: Product[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

export interface CreateProductRequest {
    name: string;
    description: string;
    quantity: number;
    categoryIds: string[];
}

export interface ProductFilters {
    page: number;
    limit: number;
    search: string;
    categories: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
