import { Grid } from "@mui/material";
import ProgressLine from "../../../components/ProgressLine/ProgressLine";
import proptype from "prop-types";

const Progress = ({ currentStep }) => {
  return (
    <Grid container gap={2} my={2}>
      {[1, 2, 3, 4].map((oneStep) => (
        <ProgressLine key={oneStep} isCompleted={oneStep <= currentStep} />
      ))}
    </Grid>
  );
};

export default Progress;
Progress.propTypes = {
  currentStep: proptype.number.isRequired,
};
