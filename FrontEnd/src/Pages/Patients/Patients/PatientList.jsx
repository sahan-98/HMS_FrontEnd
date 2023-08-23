import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Fade,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useRequest from "../../../hooks/use-request";
import { useCallback, useState } from "react";
import {
  AirlineSeatFlat,
  AirlineSeatFlatAngled,
  AvTimer,
  Backspace,
  Delete,
  Edit,
} from "@mui/icons-material";
import { showSystemAlert } from "../../../app/services/alertServices";
import PatientService from "../../../app/services/patient-service";
import { useNavigate } from "react-router-dom";
import calculateAge from "../../../utils/calculate-age";
import BedService from "../../../app/services/bed-service";

export default function PatientList() {
  const navigate = useNavigate();
  const [showBedModal, setShowBedModal] = useState(false);
  const [predctTimeModal, setPredctTimeModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});

  const [allocateBedObj, setAllocateBedObj] = useState({});
  const [predictionData, setPredictionData] = useState({});

  const getAllPatients = useCallback(async () => {
    const response = await PatientService.getAllPatients();
    return response.data;
  }, []);

  const { loading, error, data, setRefresh } = useRequest({
    requestFn: getAllPatients,
  });

  const handleEditPatientClick = useCallback(
    (patient) => {
      navigate("/addPatient", { state: { patient: patient } });
    },
    [navigate]
  );

  const handleAllocateBedClick = useCallback((patient) => {
    setSelectedPatient(patient);
    setShowBedModal(true);
  }, []);

  const allocateBedToPatient = useCallback(async () => {
    try {
      const response = await BedService.allocateBed({
        patientid: selectedPatient?._id,
        ...allocateBedObj,
      });
      console.log(response);
      showSystemAlert("bed allocated", "success");
      setRefresh((prev) => !prev);
      setShowBedModal(false);
    } catch (error) {
      showSystemAlert("Unable to allocate bed", "error");
      console.log(error);
    }
  }, [allocateBedObj, selectedPatient, setRefresh]);

  const handleReleaseBedClick = useCallback(
    async (bedId) => {
      try {
        const response = await BedService.releaseBed({ bedId });
        console.log(response);
        showSystemAlert("bed released", "success");
        setRefresh((prev) => !prev);
      } catch (error) {
        showSystemAlert("Unable to release bed", "error");
        console.log(error);
      }
    },
    [setRefresh]
  );

  const handlePredictTimeClick = useCallback((patient) => {
    setSelectedPatient(patient);
    setPredctTimeModal(true);
  }, []);

  const handlePredictClick = useCallback(async () => {
    try {
      const response = await BedService.predictTime({
        patientId: selectedPatient?._id,
        wardNo: selectedPatient?.bed[0]?.wardNo,
        age: calculateAge(new Date(selectedPatient?.dateOfBirth)),
        gender: selectedPatient?.gender,
        ...predictionData,
      });
      console.log(response);
      setRefresh((prev) => !prev);
      setPredctTimeModal(false);
    } catch (error) {
      showSystemAlert("Unable to predict time", "error");
      console.log(error);
    }
  }, [predictionData, selectedPatient, setRefresh]);

  if (loading) {
    return <span>Loading patients</span>;
  }

  if (error) {
    return <span>Failed to load data. Internal server error</span>;
  }

  const deletePatient = async (patientId) => {
    try {
      const response = await PatientService.deletePatient({ patientId });
      console.log(response);
      showSystemAlert("patient deleted", "success");
      setRefresh((prev) => !prev);
    } catch (error) {
      showSystemAlert("Unable to delete patient", "error");
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Modal open={showBedModal} closeAfterTransition>
        <Fade in={showBedModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 450, md: 350 },
              bgcolor: "background.paper",
              border: "none",
              borderRadius: 2,
              boxShadow: 24,
              px: 2,
            }}
          >
            <h3>Allocate Bed</h3>
            <TextField
              id="standard-basic"
              placeholder="Enter bed number"
              name="bedNo"
              required
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              onChange={(e) => {
                setAllocateBedObj({
                  ...allocateBedObj,
                  bedNo: e.target.value,
                });
              }}
            />
            <TextField
              id="standard-basic"
              placeholder="Enter ward number"
              name="wardNo"
              required
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              onChange={(e) => {
                setAllocateBedObj({
                  ...allocateBedObj,
                  wardNo: e.target.value,
                });
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setSelectedPatient({});
                  setShowBedModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  boxShadow: 0,
                }}
                onClick={allocateBedToPatient}
              >
                Allocate
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={predctTimeModal}
        closeAfterTransition
        disableAutoFocus={true}
      >
        <Fade in={predctTimeModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 450, md: 350 },
              bgcolor: "background.paper",
              border: "none",
              borderRadius: 2,
              boxShadow: 24,
              px: 2,
            }}
          >
            <h3>Predict time to release</h3>
            <TextField
              placeholder="Enter extra rooms "
              required
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={predictionData?.extraRooms}
              onChange={(e) => {
                setPredictionData({
                  ...predictionData,
                  extraRooms: e.target.value,
                });
              }}
            />
            <TextField
              placeholder="Enter staff available"
              required
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={predictionData?.staffAvailable}
              onChange={(e) => {
                setPredictionData({
                  ...predictionData,
                  staffAvailable: e.target.value,
                });
              }}
            />
            <TextField
              placeholder="Enter no of visitors"
              required
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={predictionData?.visitors}
              onChange={(e) => {
                setPredictionData({
                  ...predictionData,
                  visitors: e.target.value,
                });
              }}
            />

            <Select
              placeholder="Select admission type"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={
                predictionData?.admissionType
                  ? predictionData?.admissionType
                  : "NO_SELECTION"
              }
              onChange={(e) => {
                setPredictionData({
                  ...predictionData,
                  admissionType: e.target.value,
                });
              }}
            >
              <MenuItem value={"NO_SELECTION"}>Select admission type</MenuItem>
              <MenuItem value={"TRAUMA"}>Trauma</MenuItem>
              <MenuItem value={"URGENT"}>Urgent</MenuItem>
            </Select>

            <Select
              placeholder="Select illness severity"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={
                predictionData?.illnessSeverity
                  ? predictionData?.illnessSeverity
                  : "NO_SELECTION"
              }
              onChange={(e) => {
                setPredictionData({
                  ...predictionData,
                  illnessSeverity: e.target.value,
                });
              }}
            >
              <MenuItem value={"NO_SELECTION"}>
                Select illness severity
              </MenuItem>
              <MenuItem value={"MINOR"}>Minor</MenuItem>
              <MenuItem value={"MODERATE"}>Moderate</MenuItem>
            </Select>

            <Select
              placeholder="Select insurance type"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={
                predictionData?.insurance
                  ? predictionData?.insurance
                  : "NO_SELECTION"
              }
              onChange={(e) => {
                setPredictionData({
                  ...predictionData,
                  insurance: e.target.value,
                });
              }}
            >
              <MenuItem value={"NO_SELECTION"}>Select insurance type</MenuItem>
              <MenuItem value={"YES"}>Has insurance</MenuItem>
              <MenuItem value={"NO"}>No insurance</MenuItem>
            </Select>

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setSelectedPatient({});
                  setPredctTimeModal(false);
                  setPredictionData({});
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  boxShadow: 0,
                }}
                onClick={handlePredictClick}
              >
                Predict
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Typography variant="h6" sx={{ my: 3 }}>
        Total available patients: {data?.length}
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#eee",
            }}
          >
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Mobile</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((patientData) => (
            <TableRow
              key={patientData?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{patientData?.firstname}</TableCell>
              <TableCell align="center">{patientData?.lastname}</TableCell>
              <TableCell align="center">{patientData?.mobile}</TableCell>
              <TableCell align="center">{patientData?.gender}</TableCell>
              <TableCell align="center">
                {calculateAge(new Date(patientData?.dateOfBirth))}
              </TableCell>
              <TableCell align="center">
                {patientData?.bed?.length === 0 ? (
                  <IconButton
                    title="Assign bed"
                    onClick={() => {
                      handleAllocateBedClick(patientData);
                    }}
                  >
                    <AirlineSeatFlat />
                  </IconButton>
                ) : (
                  <IconButton
                    title="Releasse bed"
                    onClick={() => {
                      handleReleaseBedClick(patientData?.bed[0]?._id);
                    }}
                  >
                    <AirlineSeatFlatAngled />
                  </IconButton>
                )}

                <IconButton
                  title="Predict time"
                  onClick={() => {
                    handlePredictTimeClick(patientData);
                  }}
                >
                  <AvTimer />
                </IconButton>
                <IconButton
                  title="Edit patient"
                  onClick={() => {
                    handleEditPatientClick(patientData);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  title="Delete patient"
                  onClick={() => {
                    deletePatient(patientData?._id);
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
