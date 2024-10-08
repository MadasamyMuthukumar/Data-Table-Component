const styles = {
  global: {
    "html, body": {
      backgroundColor: "#233142",
      color: "whiteAlpha.800",
    },
    svg: {
      cursor: "pointer",
    },
    ".table": {
      border: "1px solid #424242",
    },
    ".tr": {
      display: "flex",
      width: "fit-content",
    },
    ".th, .td": { boxShadow: "inset 0 0 0 1px #424242" },
    ".th": {
  //rows should be relative and flex to display horizontally
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "gray.400",
      padding: "0.5rem",
      fontWeight: "bold",
      fontSize: "xs",
      textTransform: "uppercase",
      textAlign: "center",
    },
    //styling for input fields
    ".td > input": {
      m: "1",
      padding: "0.2rem",
      bg: "transparent",
      maxW: "100%",
    },
    ".date-wrapper": {
      display: "flex",
      alignItems: "center",
      w: "100%",
      h: "100%",
    },
    //making absolute to its parent and opacity of 0
    ".resizer": {
      position: "absolute",
      opacity: 0,
      top: 0,
      right: 0,
      h: "100%",
      w: "5px",
      bg: "#27bbff",
      cursor: "col-resize",
      userSelect: "none",
      touchAction: "none",
      borderRadius: "6px",
    },
    //when the column was resized add isResizing class
    ".resizer.isResizing": {
      bg: "#2eff31",
      opacity: 1,
    },
    //any element which has child resizer was hovered
    "*:hover > .resizer": {
      opacity: 1,
    },
  },
};

export default styles;
