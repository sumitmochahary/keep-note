import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

function GenderInput() {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <FormControl component="fieldset" margin="normal">
        <FormLabel sx={{ textAlign: "start" }} color="black" component="legend">
          Gender
        </FormLabel>
        <RadioGroup row>
          <FormControlLabel
            value="male"
            control={<Radio color="black" />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={<Radio color="black" />}
            label="Female"
          />
          <FormControlLabel
            value="non-binary"
            control={<Radio color="black" />}
            label="Non-Binary"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default GenderInput;
