import {
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
  } from "@chakra-ui/react";
  import SearchIcon from "./icons/SearchIcon";
  import FilterPopover from "./FilterPopover";
  
  const Filters = ({ columnFilters, setColumnFilters }) => {
    //filter by task column
    const taskName = columnFilters.find((f) => f.id === "task")?.value || "";
  
    const onFilterChange = (id, value) =>
        //removing previous task filters and concant new filter object with current state
      setColumnFilters((prev) =>
        prev
          .filter((f) => f.id !== id)
          .concat({
            id,
            value,
          })
      );
  
    return (
      <HStack mb={6} spacing={3}>
        <InputGroup size="sm" maxW="12rem">
          <InputLeftElement pointerEvents="none">  {/* placing icon to left of input element */}
            <Icon as={SearchIcon} />
          </InputLeftElement>
          <Input   //actual input element
            type="text"
            variant="filled"
            placeholder="Task name"
            borderRadius={5}
            value={taskName}
            onChange={(e) => onFilterChange("task", e.target.value)}
          />
        </InputGroup>
        <FilterPopover
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </HStack>
    );
  };
  export default Filters;
  