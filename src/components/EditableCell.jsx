import { Input } from "@chakra-ui/react"
import { useEffect, useState } from "react";

//Component for hadling each editable cells of a column
export const EditableCell = ({getValue , row, column , table })=>{
    const initialValue = getValue();
    const [value , setValue] = useState(initialValue); //taking initial value from .json
 

//when the input blurred call the table updateData fn
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };
    //making data up to date with data array
    useEffect(()=>{
        setValue(initialValue)
    },[initialValue]);

    return (
        <Input 
         value={value}
         onChange={(e)=>setValue(e.target.value)}
         onBlur={onBlur}
         variant="filled"
         size="sm"
         w="85%"
         overflow="hidden"
         textOverflow="ellipsis"
         whiteSpace="nowrap"
        />
    )
}