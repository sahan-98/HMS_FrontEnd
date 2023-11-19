import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import { useCallback } from "react";
import useRequest from "../../hooks/use-request.js";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { showSystemAlert } from "../../app/services/alertServices.js";
import MedOfficerService from "../../app/services/med-officer-service.js";

export default function AllMedOfficers() {
  const navigate = useNavigate();
  const getAllLabAssistants = useCallback(async () => {
    const response = await MedOfficerService.getAllMedOfficers();
    return response.data;
  }, []);

  const handleEditMedOfficerClick = useCallback(
    (medOfficer) => {
      navigate("/add-med-officer", { state: { medOfficer: medOfficer } });
    },
    [navigate]
  );

  const { loading, error, data, setRefresh } = useRequest({
    requestFn: getAllLabAssistants,
  });

  if (loading) {
    return <span>Loading Medical Officers</span>;
  }

  if (error) {
    return <span>Failed to load data. Internal server error</span>;
  }

  const deleteMedOfficer = async (medOfficerId) => {
    try {
      const response = await MedOfficerService.deleteMedOfficer({
        medOfficerId,
      });
      console.log(response);
      showSystemAlert("Med Officer deleted", "success");
      setRefresh((prev) => !prev);
    } catch (error) {
      showSystemAlert("Unable to delete med Officer", "error");
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ my: 3 }}>
        Total Available Medical Officers: {data?.length}
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
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((medOfficer) => (
            <TableRow
              key={medOfficer?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {medOfficer?.firstname + " " + medOfficer?.lastname}
              </TableCell>
              <TableCell align="center">{medOfficer?.address}</TableCell>
              <TableCell align="center">{medOfficer?.mobile}</TableCell>
              <TableCell align="center">{medOfficer?.email}</TableCell>
              <TableCell align="center">
                <IconButton
                  title="Edit med officer"
                  onClick={() => {
                    handleEditMedOfficerClick(medOfficer);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  title="Delete med officer"
                  onClick={() => {
                    deleteMedOfficer(medOfficer?._id);
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
