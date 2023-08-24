import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import BedService from "../../app/services/bed-service";
import { showSystemAlert } from "../../app/services/alertServices";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AddBed = () => {
  const navigate = useNavigate();
  const [bedAvailability, setBedAvailability] = useState("NO_SELECTION");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      gender: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await BedService.newBed({
        ...data,
        availability: bedAvailability,
        bedFee: Number(data.bedFee),
      });
      console.log(response);
      showSystemAlert("Bed added", "success");
      navigate("/beds");
    } catch (error) {
      showSystemAlert("An error occured while creating bed", "error");
      console.log(error);
    }
  };

  return (
    <Box
      style={{
        border: "2px solid #ccc",
        padding: "1rem 1rem",
        background: "#fff",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {"Add Bed"}
        </Typography>
      </Box>
      <hr></hr>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: ".5rem 2rem",
          textAlign: "start",
        }}
      >
        {/* Add bedNo */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Bed No</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            placeholder="Enter bed number"
            required
            fullWidth
            {...register("bedNo", {})}
          />
        </Grid>
        {/* Email */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Ward No</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            id="standard-basic"
            placeholder="Enter ward number"
            required
            fullWidth
            {...register("wardNo", {})}
          />
        </Grid>
        {/* Phone */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Availability</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <Select
            placeholder="Select admission type"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={bedAvailability}
            onChange={(e) => {
              setBedAvailability(e.target.value);
            }}
          >
            <MenuItem value={"NO_SELECTION"}>Select bed availability</MenuItem>
            <MenuItem value={true}>Available</MenuItem>
            <MenuItem value={false}>Not available</MenuItem>
          </Select>
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={4}>
          <Typography variant="OVERLINE TEXT">Bed Fee</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <TextField
            placeholder="Enter bed fee"
            required
            fullWidth
            {...register("bedFee", {})}
          />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
          <Box sx={{ display: "flex", margin: "1rem 0" }}>
            <Button
              variant="outlined"
              color="error"
              type="reset"
              onClick={() => {
                setValue("bedNo", "");
                setValue("wardNo", "");
                setValue("bedFee", "");
                setBedAvailability("NO_SELECTION");
              }}
            >
              RESET
            </Button>
            <Chip
              label="OR"
              color="secondary"
              style={{
                marginLeft: "-.8rem",
                marginRight: "-.8rem",
                marginTop: ".1rem",
              }}
            />
            <Button
              variant="outlined"
              color="success"
              onClick={handleSubmit(onSubmit)}
            >
              SAVE
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
