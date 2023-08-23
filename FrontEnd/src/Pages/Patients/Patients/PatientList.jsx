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
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import useRequest from "../../../hooks/use-request";
import { useCallback, useState } from "react";
import {
  AirlineSeatFlat,
  AvTimer,
  Backspace,
  Delete,
  Edit,
} from "@mui/icons-material";
import { showSystemAlert } from "../../../app/services/alertServices";
import PatientService from "../../../app/services/patient-service";
import { useNavigate } from "react-router-dom";
import calculateAge from "../../../utils/calculate-age";

export default function PatientList() {
  const navigate = useNavigate();
  const [showBedModal, setShowBedModal] = useState(true);

  const getAllPatients = useCallback(async () => {
    const response = await PatientService.getAllPatients();
    return response.data;
  }, []);

  const handleEditPatientClick = useCallback(
    (patient) => {
      navigate("/addPatient", { state: { patient: patient } });
    },
    [navigate]
  );

  const { loading, error, data, setRefresh } = useRequest({
    requestFn: getAllPatients,
  });

  if (loading) {
    return <span>Loading patients</span>;
  }

  if (error) {
    return <span>Failed to load data. Internal server error</span>;
  }

  const deleteDoctor = async (patientId) => {
    try {
      const response = await PatientService.deletePatient({ patientId });
      console.log(response);
      showSystemAlert("patient deleted", "success");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Modal open={showBedModal} closeAfterTransition disableAutoFocus={true}>
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
              placeholder="Enter first name"
              name="firstname"
              required
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              id="standard-basic"
              placeholder="Enter first name"
              name="firstname"
              required
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              id="standard-basic"
              placeholder="Enter first name"
              name="firstname"
              required
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              id="standard-basic"
              placeholder="Enter first name"
              name="firstname"
              required
              fullWidth
              size="small"
              sx={{ mb: 2 }}
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
              <Button variant="outlined" size="small">
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  boxShadow: 0,
                }}
              >
                Allocate
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
                <IconButton
                  title="Assign bed"
                  onClick={() => {
                    handleEditPatientClick(patientData);
                  }}
                >
                  <AirlineSeatFlat />
                </IconButton>
                <IconButton
                  title="Releasse bed"
                  onClick={() => {
                    handleEditPatientClick(patientData);
                  }}
                >
                  <Backspace />
                </IconButton>
                <IconButton
                  title="Predict time"
                  onClick={() => {
                    handleEditPatientClick(patientData);
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
                    deleteDoctor(patientData?._id);
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
