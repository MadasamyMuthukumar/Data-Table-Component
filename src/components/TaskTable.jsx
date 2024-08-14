import { Box } from "@chakra-ui/react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import DATA from "../data";
import { useState } from "react";
import { EditableCell } from "./EditableCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";
import Filters from "./Filters";
import { Icon, Text , ButtonGroup , Button } from "@chakra-ui/react";
import SortIcon from "./icons/SortIcon";

//column definitions
const columns = [
    {
        accessorKey: 'task', //access key for column 
        header: "Task",
        size: 225,
        cell: EditableCell,
        enableColumnFilter: true,   //enable column filter using string vlaues
        filterFn: "includesString",
    },
    {
        accessorKey: 'status',
        header: "Status",
        cell: StatusCell,
        enableColumnFilter: true,   //enabling the filter based on fn
        enableSorting: false,
        filterFn: (row, columnId, filterStatuses) => {
            //if no filter selected returns true to display all rows
            if (filterStatuses.length === 0) return true;
            const status = row.getValue(columnId);
            /**Checking filterStatus array includes the currrent status id
             * if it true it will be display otherwise removed
             */
            return filterStatuses.includes(status?.id);
        }
    },
    {
        accessorKey: 'due',
        header: "Due Date",
        cell: DateCell
    },
    {
        accessorKey: 'notes',
        header: "Comments",
        cell: EditableCell,
        enableSorting: false
    },
]
const TaskTable = () => {
    const [data, setData] = useState(DATA); //storing data
    const [columnFilters, setColumnFilters] = useState([]); //filtered array

    //Creating table using useReactTable hook
    const table = useReactTable({
        data,  //display data
        columns,   //column definition
        state: {
            columnFilters    //accessibale via table.getState
        },
        getCoreRowModel: getCoreRowModel(), //returns basic core row model for the table
        getFilteredRowModel: getFilteredRowModel(), //returns core filter behavior
        getSortedRowModel: getSortedRowModel(), //core sorting behavior
        getPaginationRowModel: getPaginationRowModel(), //getting pagination
        columnResizeMode: "onChange",   //defining the resizin mode as onChange (while dragging)
        meta: {
            updateData: (rowIndex, columnId, value) =>
                setData((prev) =>
                    /**
                     * mapping through prev data and current row equals to rowIndex passed from cell
                     * then spread old value override new value
                     */
                    prev.map((row, index) =>
                        index === rowIndex
                            ? {
                                ...prev[rowIndex],
                                [columnId]: value,
                            }
                            : row
                    )
                ),
        },
    });
    //    console.log(table.getHeaderGroups()); will provide the group of headers
    //   console.log(table.getRowModel());  //will provide the row records
    // console.log(data);

    return <Box>
        {/* FILTER SECTION */}
        <Filters
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
        />
        <Box className="table" w={table.getTotalSize()}>
            {     /*{      within header groups picking headers and display it as columns }*/
                table.getHeaderGroups().map(headerGroup => (
                    <Box className="tr" key={headerGroup.id}>
                        {
                            headerGroup.headers.map(header => (
                                <Box className="th" w={header.getSize()} key={header.id}>
                                    {header.column.columnDef.header}
                                    {header.column.getCanSort() && (
                                        //if the column can be sortable then sort using ICon clicked
                                        <Icon
                                            as={SortIcon}
                                            mx={3}
                                            fontSize={14}
                                            //providing  core sorting behavior
                                            onClick={header.column.getToggleSortingHandler()}
                                        />
                                    )}
                                    {
                                        {
                                            //getSorted will either return asc or desc. based on use icons
                                            asc: " 🔼",
                                            desc: " 🔽",
                                        }[header.column.getIsSorted()]
                                    }

                                    {/* setting resizer for resizing column */}
                                    <Box
                                        //setting resize handlers
                                        onMouseDown={
                                            header.getResizeHandler()
                                        }
                                        onTouchStart={
                                            header.getResizeHandler()
                                        }
                                        className={`resizer 
                                ${  //if the column resizing add the class
                                            header.column.getIsResizing() ? 'isResizing' : ""
                                            }`}></Box>
                                </Box>
                            ))
                        }

                    </Box>
                ))
            }

            {/* DISPLAYING ROW RECORDS */}

            {
                table.getRowModel().rows.map(row => (
                    <Box className="tr" key={row.id}>
                        {
                            row.getVisibleCells().map(cell => (
                                <Box className="td" w={cell.column.getSize()} key={cell.id}>
                                    {    //first parameter will be react comp & second will be props
                                        flexRender(
                                            //getting cell fn of corresponding column
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
                                    }
                                </Box>
                            ))
                        }
                    </Box>
                ))
            }

        </Box>
        <br />
        {/* GETTING PAGINATION DETAILS AND BUTTONS USING UTILITY FNS */}
        <Text mb={2}>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
        </Text>
        {/* PREV AND NEXT PAGE BUTTONS */}
        <ButtonGroup size="sm" isAttached variant="outline">
            <Button
                onClick={() => table.previousPage()}
                isDisabled={!table.getCanPreviousPage()} //chekcing whether previous page is possible
            >
                {"<"}
            </Button>
            <Button
                onClick={() => table.nextPage()}
                isDisabled={!table.getCanNextPage()}
            >
                {">"}
            </Button>
        </ButtonGroup>
    </Box>
}

export default TaskTable;