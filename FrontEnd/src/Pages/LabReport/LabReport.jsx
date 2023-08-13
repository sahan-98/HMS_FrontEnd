import { Box, Button, Grid, TextField } from "@mui/material";
import CustomModal from "../../components/CustomModal/CustomModal";
import PropTypes from "prop-types";

const LabReport = ({ open, setOpen, data }) => {
  return (
    <CustomModal open={open}>
      <h2>Assign Lab Task</h2>

      <Grid container my={1}>
        <Grid item xs={12} sm={4}>
          Doctor name
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField variant="outlined" fullWidth size="small" />
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          Lab assistant
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField variant="outlined" fullWidth size="small" />
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          Patient name
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField variant="outlined" fullWidth size="small" />
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          Contact Email
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField variant="outlined" fullWidth size="small" />
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          LDL
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField variant="outlined" fullWidth size="small" />
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          HDL
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField variant="outlined" fullWidth size="small" />
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          TotalCholesterol
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField variant="outlined" fullWidth size="small" />
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          Triglycerides
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField variant="outlined" fullWidth size="small" />
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          VLDLlevels
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField variant="outlined" fullWidth size="small" />
        </Grid>
      </Grid>
      <Box display={"flex"} gap={2} justifyContent={"start"} my={2}>
        <Button variant="outlined" fullWidth onClick={() => setOpen(false)}>
          Back
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            boxShadow: "none",
          }}
        >
          Save
        </Button>
      </Box>
    </CustomModal>
  );
};

export default LabReport;

LabReport.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
