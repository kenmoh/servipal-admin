"use client";

import React, { useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, X } from "lucide-react";

import { DeliveryOrderType } from "@/types/order-types";

export default function DeliveryOrderTable({
    orders,
}: {
    orders: DeliveryOrderType;
}) {
    const columns: ColumnDef<typeof orders>[] = [
        {
            accessorKey: "order_number",
            header: "#",
            cell: ({ row }) => <div>{row.getValue("order_number")}</div>,
        },
        {
            accessorKey: "package_name",
            header: "Item Name",
            cell: ({ row }) => <div>{row.getValue("package_name")}</div>,
        },
        {
            accessorKey: "order_status",
            header: "Status",
            cell: ({ row }) => (
                <div
                    className={`${row.getValue("order_status") === "pending"
                        ? "bg-red-200 text-red-600"
                        : row.getValue("order_status") === "received"
                            ? "bg-teal-200 text-teal-600"
                            : row.getValue("order_status") === "in transit"
                                ? "bg-orange-200 text-orange-600"
                                : "bg-purple-200 text-purple-600"
                        } flex justify-center p-2 rounded-full capitalize w-2/3`}
                >
                    {row.getValue("order_status")}
                </div>
            ),
        },
        {
            accessorKey: "order_owner_username",
            header: "Owner",
            cell: ({ row }) => <div>{row.getValue("order_owner_username")}</div>,
        },

        {
            accessorKey: "dispatch_company_name",
            header: "Dispatch",
            cell: ({ row }) => <div>{row.getValue("dispatch_company_name")}</div>,
        },
        {
            accessorKey: "rider_phone_number",
            header: "Rider Phone",
            cell: ({ row }) => <div>{row.getValue("rider_phone_number")}</div>,
        },
        {
            accessorKey: "rider_name",
            header: "Rider Name",
            cell: ({ row }) => <div>{row.getValue("rider_name")}</div>,
        },
    ];

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [selectedOrder, setSelectedOrder] = useState<typeof orders | null>(
        null
    );


    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: orders,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString",
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
            pagination: {
                pageIndex: 0,
                pageSize: 25
            }

        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search all columns..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex">
                <div
                    className={`rounded-md border w-full`}
                >
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="cursor-pointer text-lg font-semibold"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            {{
                                                asc: " 🔼",
                                                desc: " 🔽",
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="cursor-pointer"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                className="text-slate-800 text-[16px]  dark:text-slate-300"
                                                key={cell.id}
                                                onClick={() =>
                                                    cell.column.id !== "select" &&
                                                    setSelectedOrder(row.original)
                                                }
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
