import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function AddressInput({ register, errors, trigger, clearErrors }) {
  return (
    <Box mb={2} mt={3}>
      <Typography variant="h6" sx={{ textAlign: "start" }} gutterBottom>
        Address
      </Typography>
      <TextField
        error={!!errors.street}
        helperText={errors.street?.message}
        {...register("street", { required: "Street is required" })}
        type="text"
        placeholder="Street*"
        fullWidth
        onBlur={() => trigger("street")}
        onFocus={() => clearErrors("street")}
        variant="standard"
        margin="normal"
        color="secondary"
      />
      <Box display="flex" justifyContent="space-between" gap={3}>
        <TextField
          error={!!errors.city}
          helperText={errors.city?.message}
          {...register("city", { required: "City is required" })}
          type="text"
          placeholder="City*"
          fullWidth
          onBlur={() => trigger("city")}
          onFocus={() => clearErrors("city")}
          variant="standard"
          color="secondary"
        />
        <TextField
          error={!!errors.state}
          helperText={errors.state?.message}
          {...register("state", { required: "State is required" })}
          type="text"
          placeholder="State*"
          fullWidth
          onBlur={() => trigger("state")}
          onFocus={() => clearErrors("state")}
          variant="standard"
          color="secondary"
        />
      </Box>
      <TextField
        error={!!errors.zipCode}
        helperText={errors.zipCode?.message}
        {...register("zipCode", {
          required: "Zip Code is required",
          pattern: {
            value: /^\d{6}$/,
            message: "Valid zip code should be 6 digits",
          },
        })}
        type="text"
        placeholder="Zip Code*"
        fullWidth
        onBlur={() => trigger("zipCode")}
        onFocus={() => clearErrors("zipCode")}
        variant="standard"
        margin="normal"
        color="secondary"
      />
    </Box>
  );
}

export default AddressInput;
