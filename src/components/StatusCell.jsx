import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { STATUSES } from "../data";

//providing color icon for status
export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {}; //getting the name and color of status
  const { updateData } = table.options.meta; //getting updateData fn from table
  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      {/* DISPLAYING CELL CONTENT  */}
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
        bg={color || "transparent"}
        color="gray.900"
      >
        {name}
      </MenuButton>
      <MenuList>
        {/* CLEARING STATUS */}
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
         {/* passing null and making color as red for null */}
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {/*using our custom statuses */}
        {STATUSES.map((status) => (  
          <MenuItem
            onClick={() => updateData(row.index, column.id, status)}
            key={status.id}
          >
            {/* Using color Icon */}
            <ColorIcon color={status.color} mr={3} />
            {status.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default StatusCell;
