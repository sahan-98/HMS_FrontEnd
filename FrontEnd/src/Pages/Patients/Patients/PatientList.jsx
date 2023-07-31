import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import useRequest from "../../../hooks/use-request";
import { useCallback } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { showSystemAlert } from "../../../app/services/alertServices";
import PatientService from "../../../app/services/patient-service";

export default function PatientList() {
  const getAllPatients = useCallback(async () => {
    const response = await PatientService.getAllPatients();
    return response.data;
  }, []);

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
              <TableCell align="center">{patientData?.age}</TableCell>
              <TableCell align="center">
                <IconButton title="Edit patient">
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
