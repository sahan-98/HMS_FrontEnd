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
import DoctorService from "../../app/services/doctor-service";

const LabReport = ({ open, setOpen, data }) => {
  const [patient, setPatient] = useState({});
  const [labAssistants, setLabAssistants] = useState([]);
  const { register, setValue } = useForm({
    defaultValues: {},
  });

  console.log(data);
  const [doctorName, setDoctorName] = useState("");

  const [selectedLabAssistant, setSelectedLabAssistant] =
    useState("NO_SELECTION");
  const [labReportType, setLabReportType] = useState("Full Blood Count report");

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

  const fetchLabReport = useCallback(async () => {
    let labReport = await LabReportService.getLabReport({
      reportId: data.labReportid,
    });
    labReport = labReport?.data;
    if (labReport.status === "completed") {
      setValue("LDL", labReport?.LDL ? labReport?.LDL : "");
      setValue("HDL", labReport?.HDL ? labReport?.HDL : "");
      setValue(
        "TotalCholesterol",
        labReport?.TotalCholesterol ? labReport?.TotalCholesterol : ""
      );
      setValue(
        "Triglycerides",
        labReport?.Triglycerides ? labReport?.Triglycerides : ""
      );
      setValue(
        "VLDLlevels",
        labReport?.VLDLlevels ? labReport?.VLDLlevels : ""
      );
      setValue("WBCcount", labReport?.WBCcount ? labReport?.WBCcount : "");
      setValue("RBCcount", labReport?.RBCcount ? labReport?.RBCcount : "");
      setValue("platelets", labReport?.platelets ? labReport?.platelets : "");
      setValue(
        "hemoglobin",
        labReport?.hemoglobin ? labReport?.hemoglobin : ""
      );
      setValue(
        "hematocrit",
        labReport?.hematocrit ? labReport?.hematocrit : ""
      );
      setSelectedLabAssistant(labReport?.labAssistantid);
      setLabReportType(labReport?.type);
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
    let doctor = await DoctorService.getDoctorById({
      doctorId: data.doctorid,
    });
    doctor = doctor?.data;
    setDoctorName(doctor?.name);
  }, [data, setValue]);

  const handleLabReportTypeChange = useCallback((e) => {
    setLabReportType(e.target.value);
  }, []);

  const saveLabReport = useCallback(async () => {
    try {
      const response = await LabReportService.newLabReport({
        data: {
          appointmentId: data._id,
          type: labReportType,
          doctorid: data.doctorid,
          labAssistantid: selectedLabAssistant,
          patientid: patient?._id,
          contactEmail: patient?.email,
          LDL: "",
          HDL: "",
          TotalCholesterol: "",
          Triglycerides: "",
          VLDLlevels: "",
          WBCcount: "",
          RBCcount: "",
          platelets: "",
          hemoglobin: "",
          hematocrit: "",
        },
      });
      console.log(response);
      setOpen(false);
      showSystemAlert("Lab task assigned", "success");
    } catch (error) {
      console.log(error);
      showSystemAlert("An error occured while assigning lab task", "error");
    }
  }, [patient, data, labReportType, selectedLabAssistant, setOpen]);

  useEffect(() => {
    fetchPatient();
    fetchLabAssistants();
    if (data?.labReportid) {
      fetchLabReport();
    }
  }, [fetchPatient, fetchLabAssistants, data, setValue, fetchLabReport]);

  const handleLabAssistantChange = useCallback((e) => {
    setSelectedLabAssistant(e.target.value);
  }, []);

  return (
    <CustomModal open={open}>
      <h2>{data?.labReportid ? "View" : "Assign"} Lab Task</h2>

      <Grid container my={1}>
        <Grid item xs={12} sm={4}>
          Doctor
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            value={data.doctorName ? data.doctorName : doctorName}
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
              disabled={data?.labReportid}
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
          Report type
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ textAlign: "start" }}>
            <Select
              value={labReportType}
              onChange={handleLabReportTypeChange}
              size="small"
              disabled={data?.labReportid}
            >
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
            value={`${patient?.firstname ?? ""} ${patient?.lastname ?? ""}`}
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
            value={patient ? patient?.email : ""}
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
          onClick={saveLabReport}
          disabled={data?.labReportid}
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
