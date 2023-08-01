import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import { useCallback } from "react";
import LabAssistantService from "../../app/services/lab-assistant-service.js";
import useRequest from "../../hooks/use-request.js";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";

export default function AllLabAssistants() {
  const getAllLabAssistants = useCallback(async () => {
    const response = await LabAssistantService.getAllLabAssistants();
    return response.data;
  }, []);

  const { loading, error, data } = useRequest({
    requestFn: getAllLabAssistants,
  });

  if (loading) {
    return <span>Loading Assistants</span>;
  }

  if (error) {
    return <span>Failed to load data. Internal server error</span>;
  }

  // const deleteLabAssistant = async (doctorId) => {
  //   try {
  //     const response = await LabAssistantService.deleteDoctor({ doctorId });
  //     console.log(response);
  //     showSystemAlert("Doctor deleted", "success");
  //     setRefresh((prev) => !prev);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ my: 3 }}>
        Total available assistants: {data?.length}
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
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Mobile No</TableCell>
            <TableCell align="center">Date of Birth</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((labAssistant) => (
            <TableRow
              key={labAssistant?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {labAssistant?.firstname + " " + labAssistant?.lastname}
              </TableCell>
              <TableCell align="center">{labAssistant?.address}</TableCell>
              <TableCell align="center">{labAssistant?.mobile}</TableCell>
              <TableCell align="center">{labAssistant?.dateOfBirth}</TableCell>
              <TableCell align="center">{labAssistant?.email}</TableCell>
              <TableCell align="center">
                <IconButton title="Edit doctor">
                  <AiOutlineEdit />
                </IconButton>
                <IconButton
                  title="Delete doctor"
                  onClick={() => {
                    // deleteLabAssistant(doctorData?._id);
                  }}
                >
                  <AiOutlineDelete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
