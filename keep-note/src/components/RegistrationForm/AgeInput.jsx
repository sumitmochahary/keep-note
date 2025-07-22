import TextField from "@mui/material/TextField";

function AgeInput({ register, errors, trigger, clearErrors }) {
  return (
    <TextField
      error={!!errors.age}
      helperText={errors.age?.message}
      {...register("age", {
        required: "Age is required",
        min: { value: 18, message: "Age should not be less than 18" },
        pattern: { value: /^[0-9]*$/, message: "Invalid input" },
      })}
      type="text"
      placeholder="Age*"
      fullWidth
      onBlur={() => trigger("age")}
      onFocus={() => clearErrors("age")}
      variant="standard"
      color="secondary"
    />
  );
}

export default AgeInput;
