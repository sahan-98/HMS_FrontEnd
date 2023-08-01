import {
    Box,
    Button,
    Chip,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import Calender from "../Shared/Calender/Calender.jsx";
import { useForm} from "react-hook-form";
import {useState} from "react";
import {showSystemAlert} from "../../app/services/alertServices.js";
import LabAssistantService from "../../app/services/lab-assistant-service.js";
import calculateAge from "../../utils/calculate-age.js";

export const AddLabAssistant = () => {
    const [date, setDate] = useState(new Date().toDateString());

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
        const formData = {
            ...data,
            dateOfBirth: new Date(date).toLocaleDateString(),
            age: calculateAge(new Date(date))
        };
        console.log(formData);

        try {
            const response = await LabAssistantService.newLabAssistant({
                labAssistant: formData,
            });
            console.log(response);
            showSystemAlert("Lab assistant profile created", "success");
        } catch (error) {
            showSystemAlert("An error occurred while creating lab assistant profile", "error");
        }
    };

    return <Box
            style={{
                border: "2px solid #ccc",
                padding: "1rem 1rem",
                background: "#fff",
            }}
        >
            <Box sx={{ display: "flex", justifyContent:"center" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Add Lab Assistant
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
                {/* Add Name */}
                <Grid item xs={12} md={4}>
                    <Typography variant="OVERLINE TEXT">First name</Typography>
                </Grid>
                <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
                    <TextField
                        id="standard-basic"
                        placeholder="Enter first name"
                        name="firstname"
                        required
                        fullWidth
                        {...register("firstname", {
                            // required: {
                            //   value: true,
                            //   message: "*Name is required",
                            // },
                        })}
                    />
                </Grid>
                {/* Email */}
                <Grid item xs={12} md={4}>
                    <Typography variant="OVERLINE TEXT">Last name</Typography>
                </Grid>
                <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
                    <TextField
                        id="standard-basic"
                        placeholder="Enter last name"
                        name="lastname"
                        required
                        fullWidth
                        {...register("lastname", {
                            // required: {
                            //   value: true,
                            //   message: "*Email is required",
                            // },
                        })}
                    />
                </Grid>
                {/* Phone */}
                <Grid item xs={12} md={4}>
                    <Typography variant="OVERLINE TEXT">Mobile no</Typography>
                </Grid>
                <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
                    <TextField
                        id="standard-basic"
                        placeholder="Enter mobile number"
                        name="mobile"
                        required
                        fullWidth
                        {...register("mobile", {
                            // required: {
                            //   value: true,
                            //   message: "*Email is required",
                            // },
                        })}
                    />
                </Grid>


                {/* Email */}
                <Grid item xs={12} md={4}>
                    <Typography variant="OVERLINE TEXT">Email</Typography>
                </Grid>
                <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
                    <TextField
                        id="standard-basic"
                        placeholder="Enter email"
                        name="email"
                        required
                        fullWidth
                        {...register("email", {
                            // required: {
                            //   value: true,
                            //   message: "*Speciality is required",
                            // },
                        })}
                    />
                </Grid>
                {/* Address */}
                <Grid item xs={12} md={4}>
                    <Typography variant="OVERLINE TEXT">Address</Typography>
                </Grid>
                <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
                    <TextField
                        id="standard-basic"
                        placeholder="Enter Address"
                        variant="outlined"
                        name="address"
                        multiline
                        rows={5}
                        fullWidth
                        {...register("address", {
                            // required: {
                            //   value: true,
                            //   message: "*Address is required",
                            // },
                        })}
                    />
                </Grid>
                {/*Date of birth */}
                <Grid item xs={12} md={4}>
                    <Typography variant="OVERLINE TEXT">Date Of Birth</Typography>
                </Grid>
                <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-6.5rem" } }}>
                    <Calender value={date} setValue={setDate} />
                </Grid>
                {/* UserName */}
                <Grid item xs={12} md={4}>
                    <Typography variant="OVERLINE TEXT">UserName</Typography>
                </Grid>
                <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
                    <TextField
                        id="standard-basic"
                        placeholder="Enter userName"
                        name="userName"
                        required
                        fullWidth
                        {...register("userName", {
                            // required: {
                            //   value: true,
                            //   message: "*Email is required",
                            // },
                        })}
                    />
                </Grid>
                {/* Password */}
                <Grid item xs={12} md={4}>
                    <Typography variant="OVERLINE TEXT">Password</Typography>
                </Grid>
                <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
                    <TextField
                        id="standard-basic"
                        placeholder="Enter password"
                        name="password"
                        required
                        fullWidth
                        {...register("password", {
                            // required: {
                            //   value: true,
                            //   message: "*Email is required",
                            // },
                        })}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="OVERLINE TEXT">Decision</Typography>
                </Grid>
                <Grid item xs={12} md={8} sx={{ marginLeft: { md: "-5rem" } }}>
                    <Box sx={{ display: "flex", margin: "1rem 0" }}>
                        <Button variant="outlined" color="error" type="reset">
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
}