import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function PasswordInput({ register, errors, trigger, clearErrors }) {
  return (
    <Box mb={2}>
      <TextField
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Must be at least 8 characters" },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: "Must include upper & lowercase, number, and symbol",
          },
        })}
        type="password"
        placeholder="Password*"
        fullWidth
        onBlur={() => trigger("password")}
        onFocus={() => clearErrors("password")}
        variant="standard"
        color="secondary"
      />
    </Box>
  );
}

export default PasswordInput;
