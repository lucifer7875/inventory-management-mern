import { useState, useMemo, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    type SortingState,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import type { Product } from '../types/product.types';

interface ProductTableProps {
    products: Product[];
    onDelete: (product: Product) => void;
    isDeleting: boolean;
    onSortChange: (sortBy: string | undefined, sortOrder: 'asc' | 'desc' | undefined) => void;
    currentSortBy?: string;
    currentSortOrder?: 'asc' | 'desc';
}

const columnHelper = createColumnHelper<Product>();

// Map column IDs to API sortBy values
const columnToSortByMap: Record<string, string> = {
    name: 'name',
    quantity: 'quantity',
    createdAt: 'createdAt',
};

export const ProductTable = ({
    products,
    onDelete,
    isDeleting,
    onSortChange,
    currentSortBy,
    currentSortOrder
}: ProductTableProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    // Sync local sorting state with props
    useEffect(() => {
        if (currentSortBy && currentSortOrder) {
            setSorting([{ id: currentSortBy, desc: currentSortOrder === 'desc' }]);
        } else {
            setSorting([]);
        }
    }, [currentSortBy, currentSortOrder]);

    const columns = useMemo(
        () => [
            columnHelper.accessor('name', {
                header: 'Product Name',
                cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
                enableSorting: true,
            }),
            columnHelper.accessor('categories', {
                header: 'Categories',
                cell: (info) => (
                    <div className="flex flex-wrap gap-1">
                        {info.getValue().map((cat) => (
                            <span
                                key={cat.id}
                                className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                            >
                                {cat.name}
                            </span>
                        ))}
                    </div>
                ),
                enableSorting: false,
            }),
            columnHelper.accessor('quantity', {
                header: 'Quantity',
                cell: (info) => info.getValue(),
                enableSorting: true,
            }),
            columnHelper.accessor('createdAt', {
                header: 'Created Date',
                cell: (info) => {
                    const date = new Date(info.getValue());
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return <span className="text-muted-foreground">{`${day}/${month}/${year}`}</span>;
                },
                enableSorting: true,
            }),
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <button
                        onClick={() => onDelete(row.original)}
                        disabled={isDeleting}
                        className="text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
                    >
                        Delete
                    </button>
                ),
            }),
        ],
        [onDelete, isDeleting]
    );

    const table = useReactTable({
        data: products,
        columns,
        state: {
            sorting,
        },
        onSortingChange: (updater) => {
            const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
            setSorting(newSorting);

            // Call parent callback with API-compatible values
            if (newSorting.length > 0) {
                const sortState = newSorting[0];
                const apiSortBy = columnToSortByMap[sortState.id] || sortState.id;
                const apiSortOrder = sortState.desc ? 'desc' : 'asc';
                onSortChange(apiSortBy, apiSortOrder);
            } else {
                onSortChange(undefined, undefined);
            }
        },
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true, // Disable client-side sorting
    });

    return (
        <div className="overflow-x-auto rounded-xl border border-white/5 glass-card">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 text-slate-500 uppercase text-xs tracking-wider font-bold border-b border-slate-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={`px-6 py-4 ${header.id === 'actions' ? 'text-right' : ''} ${header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-slate-100/50 transition-colors' : ''
                                        }`}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div className={`flex items-center gap-2 ${header.id === 'actions' ? 'justify-end' : ''}`}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getCanSort() && (
                                            <span className="inline-flex">
                                                {header.column.getIsSorted() === 'asc' ? (
                                                    <ChevronUp className="w-4 h-4 text-primary" />
                                                ) : header.column.getIsSorted() === 'desc' ? (
                                                    <ChevronDown className="w-4 h-4 text-primary" />
                                                ) : (
                                                    <ChevronsUpDown className="w-4 h-4 opacity-40" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-border">
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                                No products found.
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-muted/50 transition-colors">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={`px-4 py-4 ${cell.column.id === 'actions' ? 'text-right' : ''}`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
