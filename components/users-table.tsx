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
import { UserType } from "@/types/user-types";
import Label from "./Label";
import { Switch } from "./ui/switch";



export default function UsersTable({ users }: { users: UserType }) {
    const columns: ColumnDef<typeof users>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={table.getIsAllPageRowsSelected()}
        //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },

        {
            accessorKey: "username",
            header: "Username",
            cell: ({ row }) => <div>{row.getValue("username")}</div>,
        },
        {
            accessorKey: "full_name",
            header: "Full Name",
            cell: ({ row }) => <div>{row.getValue("full_name")}</div>,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <div>{row.getValue("email")}</div>,
        },
        {
            accessorKey: "phone_number",
            header: "Phone Number",
            cell: ({ row }) => <div>{row.getValue("phone_number")}</div>,
        },
        {
            accessorKey: "user_type",
            header: "User Role",
            cell: ({ row }) => <div>{row.getValue("user_type")}</div>,
        },

        {
            accessorKey: "is_suspended",
            header: "Suspended",
            cell: ({ row }) => (
                <div>{row.getValue("is_suspended") ? "Yes" : "No"}</div>
            ),
        },

        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ row }) => (
                <div>{`${row.getValue("created_at")}`.split("T")[0]}</div>
            ),
        },
    ];

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [selectedUser, setSelectedUser] = useState<typeof users | null>(null);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: users,
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
                    className={`rounded-md border ${selectedUser ? "w-4/6" : "w-full"}`}
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
                                                className="text-slate-800 text-[16px] dark:text-slate-300"
                                                key={cell.id}
                                                onClick={() =>
                                                    cell.column.id !== "select" &&
                                                    setSelectedUser(row.original)
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
                {selectedUser && (
                    <div className="w-2/6 ml-4 p-4 border rounded-md bg-white dark:bg-black">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">User Details</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedUser(null)}
                                className="hover:bg-gray-200 transition duration-200 dark:hover:bg-gray-600"
                            >
                                <X className="h-4 w-4 text-gray-600 dark:text-gray-200" />
                            </Button>
                        </div>
                        <div className="border-b-[0.5px]">
                            {selectedUser.wallet?.balance ? <p className="text-gray-700 dark:text-gray-300 my-2 font-semibold justify-center">
                                Wallet Balance:  ₦ {selectedUser.wallet?.balance}
                                <div className="flex gap-2 ">
                                    <p className="text-gray-700 dark:text-gray-300">Account Status: </p>
                                    <p className={`${selectedUser.account_status === 'pending' ? 'text-red-400' : 'text-green-400'}`}>
                                        {selectedUser.account_status}
                                    </p>
                                </div>
                            </p> : <div className="flex gap-2 ">
                                <p className="text-gray-700 dark:text-gray-300 font-semibold">Account Status: </p>
                                <p className={`${selectedUser.account_status === 'pending' ? 'text-red-400' : 'text-green-400'} font-semibold`}>
                                    {selectedUser.account_status}
                                </p>
                            </div>}
                        </div>
                        <div className="">

                            <Label label="Name:" value={selectedUser.full_name || selectedUser.username} />
                            <Label label="Email:" value={selectedUser.email} />
                            <Label label="Phone Number:" value={selectedUser.phone_number} />
                            <Label label="Role:" value={selectedUser.user_type} />
                            <Label label="Date Joined:" value={selectedUser.created_at} />

                        </div>
                        <Switch />

                    </div>
                )}
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
