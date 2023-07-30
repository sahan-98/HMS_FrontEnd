import { Grid } from "@mui/material";
import proptype from "prop-types";

const ProgressLine = ({ isCompleted = false }) => {
  return (
    <Grid
      item
      xs
      sx={{
        height: "10px",
        backgroundColor: isCompleted ? "#59C169" : "#E0E0E0",
        borderRadius: "5px",
      }}
    ></Grid>
  );
};

export default ProgressLine;

ProgressLine.propTypes = {
  isCompleted: proptype.bool,
};
