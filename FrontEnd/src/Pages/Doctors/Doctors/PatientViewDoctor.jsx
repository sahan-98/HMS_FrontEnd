import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import useRequest from "../../../hooks/use-request";
import DoctorService from "../../../app/services/doctor-service";
import { useCallback } from "react";
import { CalendarMonth, Delete, Edit } from "@mui/icons-material";
import { showSystemAlert } from "../../../app/services/alertServices";

export default function PatientViewDoctor() {
  const getAllDoctors = useCallback(async () => {
    const response = await DoctorService.getAllDoctors();
    return response.data;
  }, []);

  const { loading, error, data, setRefresh } = useRequest({
    requestFn: getAllDoctors,
  });

  if (loading) {
    return <span>Loading doctors</span>;
  }

  if (error) {
    return <span>Failed to load data. Internal server error</span>;
  }

  const deleteDoctor = async (doctorId) => {
    try {
      const response = await DoctorService.deleteDoctor({ doctorId });
      console.log(response);
      showSystemAlert("Doctor deleted", "success");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ my: 3 }}>
        Total available doctors: {data?.length}
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#eee",
            }}
          >
            <TableCell align="center" style={{ padding: "20px 0" }}>
              Name
            </TableCell>
            <TableCell align="center">Speciality</TableCell>
            <TableCell align="center">Available</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((doctorData) => (
            <TableRow
              key={doctorData?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {doctorData?.name}
              </TableCell>
              <TableCell align="center">{doctorData?.speciality}</TableCell>
              <TableCell align="center">{doctorData?.availbleTime}</TableCell>
              <TableCell align="center">{doctorData?.fee}</TableCell>
              <TableCell align="center">{doctorData?.phone}</TableCell>
              <TableCell align="center">{doctorData?.gender}</TableCell>
              <TableCell align="center">
                <IconButton title="Edit doctor">
                  <Edit />
                </IconButton>
                <IconButton
                  title="Delete doctor"
                  onClick={() => {
                    deleteDoctor(doctorData?._id);
                  }}
                >
                  <Delete />
                </IconButton>
                <IconButton title="Place appointment">
                  <CalendarMonth />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
