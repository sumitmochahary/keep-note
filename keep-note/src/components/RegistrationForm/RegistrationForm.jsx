import RequiredInput from "./RequiredInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import PhoneNumberInput from "./PhoneNumberInput";
import GenderInput from "./GenderInput";
import AgeInput from "./AgeInput";
import AddressInput from "./AddressInput";
import { useForm } from "react-hook-form";
import { useErrorBoundary } from "react-error-boundary";
import axios from "axios";
import { Container, Button, Box, Paper, Typography } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";

function RegistrationForm() {
  const { showBoundary } = useErrorBoundary();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (regData) => {
    try {
      const response = await axios.post("http://localhost:3001/users", regData);
      console.log("Form Submitted Successfully", response.data);
      enqueueSnackbar("Registration successful!", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      reset();
    } catch (error) {
      console.error("Error submitting form", error);
      enqueueSnackbar("Error submitting form. Please try again.", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      showBoundary(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 3, marginTop: 3, marginBottom: 3 }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Registration Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <RequiredInput
            register={register}
            errors={errors}
            trigger={trigger}
            clearErrors={clearErrors}
          />
          <EmailInput
            register={register}
            errors={errors}
            trigger={trigger}
            clearErrors={clearErrors}
          />
          <PasswordInput
            register={register}
            errors={errors}
            trigger={trigger}
            clearErrors={clearErrors}
          />
          <ConfirmPasswordInput
            register={register}
            errors={errors}
            watch={watch}
            trigger={trigger}
            clearErrors={clearErrors}
          />
          <GenderInput />
          <Box display="flex" justifyContent="space-between" gap={3}>
            <AgeInput
              register={register}
              errors={errors}
              trigger={trigger}
              clearErrors={clearErrors}
            />
            <PhoneNumberInput
              register={register}
              errors={errors}
              trigger={trigger}
              clearErrors={clearErrors}
            />
          </Box>
          <AddressInput
            register={register}
            errors={errors}
            trigger={trigger}
            clearErrors={clearErrors}
          />
          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button variant="contained" color="secondary" onClick={() => reset()}>
              Reset
            </Button>
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default function RegistrationFormWithSnackbar() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <RegistrationForm />
    </SnackbarProvider>
  );
}
