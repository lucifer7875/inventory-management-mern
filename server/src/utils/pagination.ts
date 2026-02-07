export interface PaginationResult<T> {
    data: T[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

export const getPagination = (page: number, limit: number) => {
    const offset = (page - 1) * limit;
    return { limit, offset };
};

export const getPagingData = <T>(
    data: { count: number; rows: T[] },
    page: number,
    limit: number
): PaginationResult<T> => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        data: items,
        pagination: {
            totalItems,
            totalPages,
            currentPage,
            limit,
        },
    };
};
