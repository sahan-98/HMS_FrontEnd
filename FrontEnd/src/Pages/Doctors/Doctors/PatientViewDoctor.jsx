import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import useRequest from "../../../hooks/use-request";
import DoctorService from "../../../app/services/doctor-service";
import { useCallback } from "react";

export default function PatientViewDoctor() {
  const getAllDoctors = useCallback(async () => {
    const response = await DoctorService.getAllDoctors();
    return response.data;
  }, []);

  const { loading, error, data } = useRequest({
    requestFn: getAllDoctors,
  });

  if (loading) {
    return <span>Loading doctors</span>;
  }

  if (error) {
    return <span>Failed to load data. Internal server error</span>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ my: 3 }}>
        Total available doctors: {data?.length}
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ padding: "20px 0" }}>
              Name
            </TableCell>
            <TableCell align="center">Specialist</TableCell>
            <TableCell align="center">Available</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Make Appoinment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((doctorData) => (
            <TableRow
              key={doctorData?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ borderRight: "1px solid #ccc" }}
              >
                {doctorData?.name}
              </TableCell>
              <TableCell
                align="center"
                style={{ borderRight: "1px solid #ccc" }}
              >
                {doctorData?.speciality}
              </TableCell>
              <TableCell align="center">{doctorData?.availbleTime}</TableCell>
              <TableCell align="center">{doctorData?.fee}</TableCell>
              <TableCell align="center">{doctorData?.phone}</TableCell>
              <TableCell align="center">{doctorData?.gender}</TableCell>
              <TableCell align="center">
                <NavLink to={`/addPatient/${doctorData?.email}`}>
                  <input
                    style={{
                      color: "#fff",
                      background: "#000",
                      padding: "5px 10px",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#224B0C",
                    }}
                    id="submit"
                    type="submit"
                    name="appointment"
                    value="Appointment"
                  />
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
