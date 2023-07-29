import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import img from "../../../utils/no-patient.png";

export default function Patients() {
  const [patientsData, setpatientsData] = React.useState([
    {
      patientName: "Rahim",
      doctorName: "Dr. Karim",
      doctorFee: "500",
      phone: "01700000000",
      date: "12/12/2021",
      gender: "male",
      _id: "1",
    },
    {
      patientName: "Rahim",
      doctorName: "Dr. Karim",
      doctorFee: "500",
      phone: "01700000000",
      date: "12/12/2021",
      gender: "male",
      _id: "1",
    },
    {
      patientName: "Rahim",
      doctorName: "Dr. Karim",
      doctorFee: "500",
      phone: "01700000000",
      date: "12/12/2021",
      gender: "male",
      _id: "1",
    },
    {
      patientName: "Rahim",
      doctorName: "Dr. Karim",
      doctorFee: "500",
      phone: "01700000000",
      date: "12/12/2021",
      gender: "male",
      _id: "1",
    },
    {
      patientName: "Rahim",
      doctorName: "Dr. Karim",
      doctorFee: "500",
      phone: "01700000000",
      date: "12/12/2021",
      gender: "male",
      _id: "1",
    },
    {
      patientName: "Rahim",
      doctorName: "Dr. Karim",
      doctorFee: "500",
      phone: "01700000000",
      date: "12/12/2021",
      gender: "male",
      _id: "1",
    },
  ]);
  const [loading, setLoading] = React.useState(false);

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <Typography variant="h6" sx={{ py: 6 }}>
          Loading...
        </Typography>
      ) : (
        <>
          {patientsData.length === 0 ? (
            <Typography variant="h6" className="no-req">
              <img className="icon" src={img} alt="no-approval-icon" />
              NO PATIENT FOUND YET
            </Typography>
          ) : (
            <>
              <Typography variant="h6" sx={{ my: 3 }}>
                TOTAL AVAILABLE PATIENT: {patientsData.length}
              </Typography>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ padding: "20px 0" }}>
                      Patient Name
                    </TableCell>
                    <TableCell align="center">Doctor Name</TableCell>
                    <TableCell align="center">Fee</TableCell>
                    <TableCell align="center">Patient's Phone</TableCell>
                    <TableCell align="center">Appointment Date</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Action</TableCell>
                    <TableCell align="center">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patientsData.map((patientsData, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ borderRight: "1px solid #ccc" }}
                      >
                        {patientsData.patientName}
                      </TableCell>
                      <TableCell align="center">
                        {patientsData.doctorName}
                      </TableCell>
                      <TableCell align="center">
                        {patientsData.doctorFee}
                      </TableCell>
                      <TableCell align="center">{patientsData.phone}</TableCell>
                      <TableCell align="center">{patientsData.date}</TableCell>
                      <TableCell align="center">
                        {patientsData.gender.toUpperCase()}
                      </TableCell>
                      <TableCell align="center">
                        <AiOutlineEdit
                          onClick={() => {
                            // deletePatient(patientsData._id);
                          }}
                          style={{
                            cursor: "pointer",
                            fontSize: "1.5rem",
                            marginRight: "20px",
                          }}
                        />
                        <AiOutlineDelete
                          onClick={() => {
                            // deletePatient(patientsData._id);
                          }}
                          style={{
                            cursor: "pointer",
                            fontSize: "1.5rem",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <form name="button">
                          <NavLink to={`/patientDetails/${patientsData._id}`}>
                            <input
                              style={{
                                color: "#fff",
                                background: "#000",
                                padding: "10px 20px",
                                cursor: "pointer",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "#224B0C",
                              }}
                              id="submit"
                              type="submit"
                              name="appointment"
                              value="View"
                            />
                          </NavLink>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      )}
    </TableContainer>
  );
}
