import TextField from "@mui/material/TextField";

function PhoneNumberInput({ register, errors, trigger, clearErrors }) {
  return (
    <TextField
      error={!!errors.phoneNumber}
      helperText={errors.phoneNumber?.message}
      {...register("phoneNumber", {
        required: "Phone number is required",
        pattern: {
          value: /^[789]\d{9}$/,
          message: "Phone number must be 10 digits and start with 7, 8, or 9",
        },
      })}
      type="text"
      placeholder="Phone Number*"
      fullWidth
      onBlur={() => trigger("phoneNumber")}
      onFocus={() => clearErrors("phoneNumber")}
      variant="standard"
      color="secondary"
    />
  );
}

export default PhoneNumberInput;
