import { Controller, useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Radio,
  FormLabel,
  RadioGroup,
  TextareaAutosize,
  FormHelperText,
} from "@mui/material";
import VehicleDataValidation from "../validation/VehicleValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VehicleForm = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [formDataArray, setFormDataArray] = useState([]);
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [severity, setSeverity] = useState(null);
  const {
    control,
    watch,
    reset,
    handleSubmit,
    register,
    setValue, // Add setValue function from react-hook-form
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VehicleDataValidation),
  });
  const manufacturedYear = watch("manufacturedYear");
  const vehicleBodyType = watch("vehicleBodyType");
  const transmission = watch("transmission");
  const wheeler = watch("wheeler");
  const isAgree = watch("isAgree");
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setFormDataArray(storedData);
    // Check if ID is provided in the URL (edit case)
    if (id) {
      const editFormData = storedData.find(
        (data, index) => index === parseInt(id - 1, 10)
      );
      if (!editFormData) {
        // Show an alert if ID is greater than available data
        if (parseInt(id, 10) > storedData.length) {
          showSnackbar("Invalid ID !, ID exceeds available data.", "error");
          const snackbarDuration = 2000;
          setTimeout(() => {
            navigate("/addvehicle");
          }, snackbarDuration);
        }
        // Redirect to error page if ID is negative
        if (parseInt(id, 10) <= 0) {
          navigate("/error"); // Update this path based on your error page route
        }
      }
      if (editFormData) {
        setEditData(editFormData);
        // Use setValue to set the form values
        Object.keys(editFormData).forEach((key) => {
          if (
            key === "wheeler_4" ||
            key === "wheeler_3" ||
            key === "wheeler_2"
          ) {
            setValue(key, editFormData[key]);
          } else if (key === "radioButtonsGroup") {
            setValue(key, editFormData[key]);
          } else {
            setValue(key, editFormData[key]);
          }
        });
      } else {
        // If the ID doesn't match any data, you might want to handle it here
        console.log(`No data found for ID: ${id}`);
      }
    }
  }, [id, setValue]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSuccessMessage(message);
    setSnackbarOpen(true);
    setSeverity(severity);
    setTimeout(() => {
      // Navigate to the listing page after 2000 milliseconds (2 seconds)
      navigate("/listing");
    }, 2000);
  };

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      if (editData) {
        const updatedDataArray = formDataArray.map((item, index) =>
          index === parseInt(id - 1, 10) ? { ...item, ...data } : item
        );
        localStorage.setItem("formData", JSON.stringify(updatedDataArray));
        setFormDataArray(updatedDataArray);
        showSnackbar("Form is successfully updated !", "info");
      } else {
        const newDataArray = [
          ...formDataArray,
          {...data },
        ];
        localStorage.setItem("formData", JSON.stringify(newDataArray));
        setFormDataArray(newDataArray);
        showSnackbar("Form is successfully submitted !", "success");
      }
    } else {
      alert("Please fix the errors in the form before submitting.");
    }
  };

  const handleClear = () => {
    // Use the reset function to clear the form values and errors
    reset();
  };

  return (
    <>
      <Container component="main" style={{ marginTop: 20 }}>
        <Paper
          elevation={3}
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            fontWeight="700"
            fontSize="30px"
            textAlign="center"
            mb={3}
          >
            Add Vehicle
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ fontWeight: "600" }} htmlFor="Make">
                  Make
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </InputLabel>
                <TextField
                  fullWidth
                  id="Make"
                  type="text"
                  {...register("make")}
                  error={errors.make ? true : false}
                />
                {errors.make && (
                  <FormHelperText error>{errors.make.message}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  sx={{ fontWeight: "600" }}
                  id="model-label"
                  htmlFor="Model"
                >
                  Model
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </InputLabel>
                <TextField
                  labelid="model-label"
                  fullWidth
                  id="Model"
                  {...register("model")}
                  type="text"
                  error={errors.model ? true : false}
                />
                {errors.model && (
                  <FormHelperText error>{errors.model.message}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  sx={{ fontWeight: "600" }}
                  htmlFor="vehicle-identification-no"
                >
                  Vehicle Identification No
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </InputLabel>
                <TextField
                  fullWidth
                  id="vehicle-identification-no"
                  {...register("vehicleIdentificationNo")}
                  type="text"
                  error={errors.vehicleIdentificationNo ? true : false}
                />
                {errors.vehicleIdentificationNo && (
                  <FormHelperText error>
                    {errors.vehicleIdentificationNo.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ fontWeight: "600" }} htmlFor="engine-no">
                  Engine No
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </InputLabel>
                <TextField
                  fullWidth
                  id="engine-no"
                  type="text"
                  {...register("engineNo")}
                  error={errors.engineNo ? true : false}
                />
                {errors.engineNo && (
                  <FormHelperText error>
                    {errors.engineNo.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  sx={{ fontWeight: "600" }}
                  id="vehicle-body-type-label"
                >
                  Vehicle Body Type
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </InputLabel>
                <Select
                  fullWidth
                  defaultValue={0}
                  value={vehicleBodyType ? vehicleBodyType : 0}
                  id="vehicle-body-type"
                  {...register("vehicleBodyType")}
                  error={errors.vehicleBodyType ? true : false}
                >
                  <MenuItem value="0" disabled>
                    Select the vehicle body type
                  </MenuItem>
                  <MenuItem value={"Van/Minivan"}>Van/Minivan</MenuItem>
                  <MenuItem value={"Wagon"}>Wagon</MenuItem>
                  <MenuItem value={"Hybrid Vehicle"}>Hybrid Vehicle</MenuItem>
                  <MenuItem value={"Sedan"}>Sedan</MenuItem>
                </Select>
                {errors.vehicleBodyType && (
                  <FormHelperText error>
                    {errors.vehicleBodyType.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  sx={{ fontWeight: "600" }}
                  id="manufactured-year-label"
                >
                  Manufactured Year
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </InputLabel>
                <Select
                  fullWidth
                  labelid="manufactured-year-label"
                  id="manufactured-year"
                  defaultValue={0}
                  value={manufacturedYear ? manufacturedYear : 0}
                  {...register("manufacturedYear")}
                  error={errors.manufacturedYear ? true : false}
                >
                  <MenuItem value="0" disabled>
                    Select the manufactured year
                  </MenuItem>
                  <MenuItem value={"1997"}>1997</MenuItem>
                  <MenuItem value={"1998"}>1998</MenuItem>
                  <MenuItem value={"1999"}>1999</MenuItem>
                  <MenuItem value={"2000"}>2000</MenuItem>
                  <MenuItem value={"2001"}>2001</MenuItem>
                </Select>
                {errors.manufacturedYear && (
                  <FormHelperText error>
                    {errors.manufacturedYear.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ fontWeight: "600" }} id="transmission-label">
                  Transmission
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </InputLabel>
                <Select
                  fullWidth
                  defaultValue={0}
                  value={transmission ? transmission : 0}
                  labelid="transmission-label"
                  id="transmission"
                  {...register("transmission")}
                  error={errors.transmission ? true : false}
                >
                  <MenuItem value="0" disabled>
                    Select the transmission
                  </MenuItem>
                  <MenuItem value={"Automatic"}>Automatic</MenuItem>
                  <MenuItem value={"Manual"}>Manual</MenuItem>
                </Select>{" "}
                {errors.transmission && (
                  <FormHelperText error>
                    {errors.transmission.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ fontWeight: "600" }}>
                  Odometer Reading
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="odometer-reading"
                  {...register("odometerReading")}
                  type="text"
                  error={errors.odometerReading ? true : false}
                />
                {errors.odometerReading && (
                  <FormHelperText error>
                    {errors.odometerReading.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ fontWeight: "600" }} htmlFor="reg-expiry">
                  Reg Expiry
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </InputLabel>
                <TextField
                  fullWidth
                  id="reg-expiry"
                  {...register("regExpiry")}
                  type="date"
                  error={errors.regExpiry ? true : false}
                  inputProps={{
                    shrink: true,
                    min: new Date().toISOString().split("T")[0], // Set min to current date
                  }}
                />
                {errors.regExpiry && (
                  <FormHelperText error>
                    {errors.regExpiry.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={{ fontWeight: "600" }} htmlFor="license-plate">
                  License Plate
                  <Typography component="span" color="red">
                    *
                  </Typography>
                </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="license-plate"
                  {...register("licensePlate")}
                  type="text"
                  error={errors.licensePlate ? true : false}
                />
                {errors.licensePlate && (
                  <FormHelperText error>
                    {errors.licensePlate.message}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} style={{ paddingTop: 0 }}>
                <FormGroup row>
                  <Typography
                    variant="body1"
                    sx={{
                      m: 2,
                      ml: 0,
                      fontWeight: "600",
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Types of vehicles :
                  </Typography>
                  <FormControlLabel
                    value="4 Wheeler"
                    control={<Checkbox {...register("wheeler")} />}
                    label="4 Wheeler"
                    checked={wheeler ? wheeler.includes("4 Wheeler") : false}
                  />
                  <FormControlLabel
                    value="3 Wheeler"
                    control={<Checkbox {...register("wheeler")} />}
                    label="3 Wheeler"
                    checked={wheeler ? wheeler.includes("3 Wheeler") : false}
                  />
                  <FormControlLabel
                    value="2 Wheeler"
                    control={<Checkbox {...register("wheeler")} />}
                    label="2 Wheeler"
                    checked={wheeler ? wheeler.includes("2 Wheeler") : false}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} display="flex" direction="column">
                <FormControl
                  component="fieldset"
                  error={Boolean(errors.radioButtonsGroup)}
                >
                  <Typography variant="h6" color="black">
                    Odometer Reading
                  </Typography>
                  <Controller
                    name="radioButtonsGroup"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="Reflects the actual mileage"
                          control={<Radio />}
                          label="Reflects the actual mileage"
                        />
                        <FormControlLabel
                          value="Does not reflect the actual mileage"
                          control={<Radio />}
                          label="Does not reflect the actual mileage"
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.radioButtonsGroup && (
                    <FormHelperText>
                      {errors.radioButtonsGroup.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  style={{ marginTop: 16 }}
                  error={Boolean(errors.textArea)}
                >
                  <Typography>
                    If it does not reflect the actual mileage, please explain
                    here:
                  </Typography>
                  <Controller
                    name="textArea"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextareaAutosize
                        {...field}
                        rows={4}
                        style={{
                          width: "100%",
                          resize: "none",
                          minHeight: "100px",
                        }}
                      />
                    )}
                  />
                  {errors.textArea && (
                    <FormHelperText>{errors.textArea.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("isAgree")}
                        checked={isAgree === true}
                        // Remove error prop from Checkbox
                      />
                    }
                    label={
                      <span>
                        I agree to the terms & condition
                        <Typography component="span" style={{ color: "red" }}>
                          *
                        </Typography>
                      </span>
                    }
                  />
                  {errors.isAgree && (
                    <Typography variant="body2" color="error">
                      {errors.isAgree.message}
                    </Typography>
                  )}
                </FormGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 20, float: "right" }}
            >
              Submit
            </Button>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSnackbarClose}
                severity={severity} // Use the severity from the state
              >
                {successMessage}
              </MuiAlert>
            </Snackbar>
            <Button
              type="button"
              variant="contained"
              color="warning"
              style={{ marginTop: 20, float: "right", marginRight: "20px" }}
              onClick={handleClear} // Add onClick handler for clear button
            >
              Clear
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};
export default VehicleForm;
