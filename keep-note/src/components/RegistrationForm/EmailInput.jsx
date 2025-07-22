import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function EmailInput({ register, errors, trigger, clearErrors }) {
  return (
    <Box mb={2}>
      <TextField
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/,
            message: "Enter a valid email address",
          },
        })}
        type="email"
        placeholder="Email*"
        fullWidth
        onBlur={() => trigger("email")}
        onFocus={() => clearErrors("email")}
        variant="standard"
        color="secondary"
      />
    </Box>
  );
}

export default EmailInput;
