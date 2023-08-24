import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useCallback } from "react";
import BedService from "../../app/services/bed-service.js";
import useRequest from "../../hooks/use-request.js";

export default function AllBeds() {
  const getAllBeds = useCallback(async () => {
    const response = await BedService.getAllBeds();
    return response.data;
  }, []);

  const { loading, error, data, setRefresh } = useRequest({
    requestFn: getAllBeds,
  });

  if (loading) {
    return <span>Loading Beds</span>;
  }

  if (error) {
    return <span>Failed to load data. Internal server error</span>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ my: 3 }}>
        Total available beds: {data?.length}
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#eee",
            }}
          >
            <TableCell align="center">Bed No</TableCell>
            <TableCell align="center">Ward No</TableCell>
            <TableCell align="center">Availability</TableCell>
            <TableCell align="center">Allocated Date</TableCell>
            <TableCell align="center">Release In</TableCell>
            <TableCell align="center">Bed Fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((bed) => (
            <TableRow
              key={bed?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {bed?.bedNo ?? ""}
              </TableCell>
              <TableCell align="center">{bed?.wardNo ?? ""}</TableCell>
              <TableCell align="center">
                {bed?.availability ? "Available" : "Not available"}
              </TableCell>
              <TableCell align="center">
                {bed?.allocatedDate
                  ? new Date(bed?.allocatedDate).toISOString().split("T")[0]
                  : "N/A"}
              </TableCell>
              <TableCell align="center">
                {bed?.estimation?.split(".")[0]
                  ? `${bed?.estimation?.split(".")[0]} days`
                  : "N/A"}
              </TableCell>
              <TableCell align="center">{bed?.bedFee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
