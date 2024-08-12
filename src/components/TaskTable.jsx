import { Box } from "@chakra-ui/react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DATA from "../data";
import { useState } from "react";
import { EditableCell } from "./EditableCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";

//column definitions
const columns = [
    {
      accessorKey: 'task', //access key for column 
      header: "Task",
      size:225,
      cell: EditableCell    
    },
    {
        accessorKey: 'status',
        header: "Status",
        cell: StatusCell
      },
      {
        accessorKey: 'due',
        header: "Due Date",
        cell: (props) => DateCell
      },
      {
        accessorKey: 'notes',
        header: "Comments",
        cell: (props) => <p>{props.getValue()}</p>
      },
  ]
const TaskTable = () =>{
    const [data,setData] = useState(DATA);
    //Creating table using useReactTable hook
   const table = useReactTable({
    data,  //display data
    columns,   //column definition
    getCoreRowModel:getCoreRowModel(), //returns basic core row model for the table
    columnResizeMode:"onChange",   //defining the resizin mode as onChange (while dragging)
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
   console.log(data);
   
    return <Box>
        <Box className="table" w={table.getTotalSize()}>
            {     /*{      within header groups picking headers and display it as columns }*/
                table.getHeaderGroups().map(headerGroup => (
                    <Box className="tr" key={headerGroup.id}> 
                    {
                        headerGroup.headers.map(header => (
                            <Box className="th" w={header.getSize()} key={header.id}>
                                {header.column.columnDef.header}
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
    </Box>
}

export default TaskTable;