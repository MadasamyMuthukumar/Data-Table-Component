import { forwardRef } from "react";
import { Box, Center, Icon } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "./icons/CalendarIcon";

//forwarding ref of Datepicker to Center
const DateCustomInput = forwardRef(({ value, onClick, clearDate }, ref) => (
  <Center ref={ref} onClick={onClick} cursor="pointer">
    {/* If current date ? return the format : return the icon */}
    {value ? (
      <>
        {value}
        <Box
          pos="absolute"
          right={3}
          fontSize="md"
          color="red.300"
          onClick={(e) => {
            e.stopPropagation();  //stoping parent events
            clearDate();
          }}
        >
          &times;
        </Box>
      </>
    ) : (
      <Icon as={CalendarIcon} fontSize="xl" />
    )}
  </Center>
));
//Component for Date cell
const DateCell = ({ getValue, row, column, table }) => {
  const date = getValue();  //getting date from data
  const { updateData } = table.options.meta;
  return (
    <DatePicker
      wrapperClassName="date-wrapper"
      dateFormat="MMM d"
      selected={date}
      onChange={(date) => updateData(row.index, column.id, date)}
      customInput={ //custom component for render date
        <DateCustomInput //function to clear date
          clearDate={() => updateData(row.index, column.id, null)}
        />
      }
    />
  );
};
export default DateCell;
