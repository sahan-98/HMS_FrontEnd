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
import LabReportService from "../../app/services/lab-report-service";
import { showSystemAlert } from "../../app/services/alertServices";
import { useForm } from "react-hook-form";

const LabAssistantReport = ({ open, setOpen, data }) => {
  const [patient, setPatient] = useState({});
  const [labAssistants, setLabAssistants] = useState([]);
  const [selectedLabAssistant, setSelectedLabAssistant] =
    useState("NO_SELECTION");
  const [labReportType, setLabReportType] = useState("");

  const fetchLabAssistants = useCallback(async () => {
    const labAssistants = await LabAssistantService.getAllLabAssistants();
    setLabAssistants(labAssistants?.data);
    setSelectedLabAssistant(data?.labAssistantid);
  }, [data]);

  const handleLabReportTypeChange = useCallback((e) => {
    setLabReportType(e.target.value);
  }, []);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (submittedData) => {
    try {
      const response = await LabReportService.updateLabReport({
        reportId: data._id,
        data: {
          ...submittedData,
          appointmentId: data._id,
          type: labReportType,
          doctorid: data.doctorid,
          labAssistantid: selectedLabAssistant,
          patientid: patient?._id,
          contactEmail: patient?.email,
        },
      });
      console.log(response);
      setOpen(false);
      showSystemAlert("Lab task completed", "success");
    } catch (error) {
      console.log(error);
      showSystemAlert("An error occured while assigning lab task", "error");
    }
  };

  useEffect(() => {
    fetchLabAssistants();

    if (data._id) {
      setPatient(data?.patient);
      setLabReportType(data?.type);
    }
    if (data.status === "completed") {
      setValue("LDL", data?.LDL ? data?.LDL : "");
      setValue("HDL", data?.HDL ? data?.HDL : "");
      setValue(
        "TotalCholesterol",
        data?.TotalCholesterol ? data?.TotalCholesterol : ""
      );
      setValue("Triglycerides", data?.Triglycerides ? data?.Triglycerides : "");
      setValue("VLDLlevels", data?.VLDLlevels ? data?.VLDLlevels : "");
      setValue("WBCcount", data?.WBCcount ? data?.WBCcount : "");
      setValue("RBCcount", data?.RBCcount ? data?.RBCcount : "");
      setValue("platelets", data?.platelets ? data?.platelets : "");
      setValue("hemoglobin", data?.hemoglobin ? data?.hemoglobin : "");
      setValue("hematocrit", data?.hematocrit ? data?.hematocrit : "");
    } else {
      setValue("LDL", "");
      setValue("HDL", "");
      setValue("TotalCholesterol", "");
      setValue("Triglycerides", "");
      setValue("VLDLlevels", "");
      setValue("WBCcount", "");
      setValue("RBCcount", "");
      setValue("platelets", "");
      setValue("hemoglobin", "");
      setValue("hematocrit", "");
    }
  }, [fetchLabAssistants, data, setValue]);

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
            value={data?.doctor ? data?.doctor?.name : ""}
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
              value={
                selectedLabAssistant ? selectedLabAssistant : "NO_SELECTION"
              }
              size="small"
              disabled
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
          Report type
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ textAlign: "start" }}>
            <Select value={labReportType} size="small" disabled>
              <MenuItem value={"Full Blood Count report"}>
                Full Blood Count report
              </MenuItem>
              <MenuItem value={"Cholesterol report"}>
                Cholesterol report
              </MenuItem>
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
            value={
              patient?.firstname
                ? patient?.firstname + " " + patient?.lastname
                : ""
            }
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
            value={patient?.email ? patient?.email : ""}
            disabled
          />
        </Grid>
      </Grid>
      {labReportType === "Cholesterol report" ? (
        <>
          <Grid container my={1.5}>
            <Grid item xs={12} sm={4}>
              LDL
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                {...register("LDL", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
            </Grid>
          </Grid>

          <Grid container my={1.5}>
            <Grid item xs={12} sm={4}>
              HDL
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                {...register("HDL", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
            </Grid>
          </Grid>

          <Grid container my={1.5}>
            <Grid item xs={12} sm={4}>
              TotalCholesterol
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                {...register("TotalCholesterol", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
            </Grid>
          </Grid>

          <Grid container my={1.5}>
            <Grid item xs={12} sm={4}>
              Triglycerides
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                {...register("Triglycerides", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
            </Grid>
          </Grid>

          <Grid container my={1.5}>
            <Grid item xs={12} sm={4}>
              VLDLlevels
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                {...register("VLDLlevels", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container my={1.5}>
            <Grid item xs={12} sm={4}>
              WBCcount
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                {...register("WBCcount", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
            </Grid>
          </Grid>
          <Grid container my={1.5}>
            <Grid item xs={12} sm={4}>
              RBCcount
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                {...register("RBCcount", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
            </Grid>
          </Grid>
          <Grid container my={1.5}>
            <Grid item xs={12} sm={4}>
              Platelets
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                {...register("platelets", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
            </Grid>
          </Grid>
          <Grid container my={1.5}>
            <Grid item xs={12} sm={4}>
              Hemoglobin
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                {...register("hemoglobin", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
            </Grid>
          </Grid>
          <Grid container my={1.5}>
            <Grid item xs={12} sm={4}>
              Hematocrit
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                {...register("hematocrit", {
                  // required: {
                  //   value: true,
                  //   message: "*Name is required",
                  // },
                })}
              />
            </Grid>
          </Grid>
        </>
      )}

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
          disabled={data.status === "completed"}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Box>
    </CustomModal>
  );
};

export default LabAssistantReport;

LabAssistantReport.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
