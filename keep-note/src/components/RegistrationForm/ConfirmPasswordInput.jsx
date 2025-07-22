import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function ConfirmPasswordInput({
  register,
  errors,
  watch,
  trigger,
  clearErrors,
}) {
  return (
    <Box mb={1}>
      <TextField
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Confirm Password is required",
          validate: (value) =>
            value === watch("password") || "Your password does not match",
          minLength: { value: 8, message: "Must be at least 8 characters" },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: "Must include upper & lowercase, number, and symbol",
          },
        })}
        type="password"
        placeholder="Confirm Password*"
        fullWidth
        onBlur={() => trigger("confirmPassword")}
        onFocus={() => clearErrors("confirmPassword")}
        variant="standard"
        color="secondary"
      />
    </Box>
  );
}

export default ConfirmPasswordInput;
