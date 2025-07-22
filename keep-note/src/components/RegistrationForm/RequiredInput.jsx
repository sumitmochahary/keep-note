import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function RequiredInput({ register, errors, trigger, clearErrors }) {
  return (
    <Box display="flex" justifyContent="space-between" mb={2} gap={3}>
      <TextField
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        {...register("firstName", {
          required: "First Name is required",
        })}
        type="text"
        placeholder="First Name*"
        name="firstName"
        fullWidth
        onBlur={() => trigger("firstName")}
        onFocus={() => clearErrors("firstName")}
        variant="standard"
        color="secondary"
      />
      <TextField
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        {...register("lastName", {
          required: "Last Name is required",
        })}
        type="text"
        placeholder="Last Name*"
        fullWidth
        onBlur={() => trigger("lastName")}
        onFocus={() => clearErrors("lastName")}
        variant="standard"
        color="secondary"
      />
    </Box>
  );
}

export default RequiredInput;
