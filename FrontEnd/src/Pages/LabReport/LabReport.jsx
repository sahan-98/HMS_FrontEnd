import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CustomModal from "../../components/CustomModal/CustomModal";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import PatientService from "../../app/services/patient-service";
import LabAssistantService from "../../app/services/lab-assistant-service";

const LabReport = ({ open, setOpen, data }) => {
  const [patient, setPatient] = useState({});
  const [labAssistants, setLabAssistants] = useState([]);
  const [selectedLabAssistant, setSelectedLabAssistant] =
    useState("NO_SELECTION");

  const fetchPatient = useCallback(async () => {
    const patient = await PatientService.gePatientById({
      patientId: data.patientid,
    });
    setPatient(patient?.data);
  }, [data]);

  const fetchLabAssistants = useCallback(async () => {
    const labAssistants = await LabAssistantService.getAllLabAssistants();
    setLabAssistants(labAssistants?.data);
  }, []);

  useEffect(() => {
    fetchPatient();
    fetchLabAssistants();
  }, [fetchPatient, fetchLabAssistants]);

  const handleLabAssistantChange = useCallback((e) => {
    setSelectedLabAssistant(e.target.value);
  }, []);

  return (
    <CustomModal open={open}>
      <h2>Assign Lab Task</h2>

      <Grid container my={1}>
        <Grid item xs={12} sm={4}>
          Doctor
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            value={data.doctorName}
            fullWidth
            size="small"
            disabled
          />
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          Lab assistant
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ textAlign: "start" }}>
            <Select
              value={selectedLabAssistant ? selectedLabAssistant : ""}
              onChange={handleLabAssistantChange}
              size="small"
            >
              <MenuItem value={"NO_SELECTION"}>Please select</MenuItem>
              {labAssistants.map((labAssistant, index) => {
                return (
                  <MenuItem value={labAssistant?._id} key={index}>
                    {labAssistant?.firstname} {labAssistant?.lastname}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          Patient name
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            value={patient?.firstname + " " + patient?.lastname}
            disabled
          />
        </Grid>
      </Grid>

      <Grid container my={1.5}>
        <Grid item xs={12} sm={4}>
          Contact Email
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            value={patient?.email}
            disabled
          />
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
