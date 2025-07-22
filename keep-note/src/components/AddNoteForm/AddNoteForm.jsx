import { useState, useRef } from "react";
import {
  Container,
  Card,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
  Box,
  CardContent,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AddNoteForm({ onAddNote }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    reminderDate: "",
    category: "",
    priority: "low",
    status: "yet-to-start",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const validate = (name, value) => {
    let tempErrors = { ...errors };

    if (name === "title")
      tempErrors.title = value.trim() ? "" : "Title is required";

    if (name === "content")
      tempErrors.content =
        value.trim().length >= 5 ? "" : "Content must have at least 5 characters";

    if (name === "reminderDate") {
      if (!value) {
        tempErrors.reminderDate = "Reminder date is required";
      } else {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        tempErrors.reminderDate =
          selectedDate >= today ? "" : "Reminder date cannot be in the past";
      }
    }

    setErrors(tempErrors);

    const allValid =
      (name === "title" ? value.trim() !== "" : formData.title.trim() !== "") &&
      (name === "content" ? value.trim() !== "" : formData.content.trim() !== "") &&
      (name === "reminderDate" ? value !== "" : formData.reminderDate !== "") &&
      !tempErrors.title &&
      !tempErrors.content &&
      !tempErrors.reminderDate;

    setIsSubmitEnabled(allValid);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validate(name, value);
  };

  const handleBlur = (ref, fieldName) => {
    if (ref.current && !ref.current.value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    }
  };

  const handleFocus = (fieldName) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const clearFormData = () => {
    setFormData({
      title: "",
      content: "",
      reminderDate: "",
      category: "",
      priority: "low",
      status: "yet-to-start",
    });
    setErrors({});
    setIsSubmitEnabled(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitEnabled) {
      try {
        const newNote = { ...formData };
        onAddNote(newNote);
        clearFormData();
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container maxWidth="xs">
      <Card>
        <CardContent onClick={handleExpandClick} style={{ cursor: "pointer" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1">Add a Note...</Typography>
            <ExpandMoreIcon
              sx={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </Box>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form onSubmit={handleSubmit} style={{ padding: "0 20px 20px" }}>
            <TextField
              label="Title*"
              name="title"
              color="secondary"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              inputRef={titleRef}
              onFocus={() => handleFocus("title")}
              onBlur={() => handleBlur(titleRef, "title")}
            />
            <TextField
              label="Content*"
              name="content"
              multiline
              rows={3}
              color="secondary"
              fullWidth
              margin="normal"
              value={formData.content}
              onChange={handleChange}
              error={!!errors.content}
              helperText={errors.content}
              inputRef={contentRef}
              onFocus={() => handleFocus("content")}
              onBlur={() => handleBlur(contentRef, "content")}
            />
            <TextField
              label="Reminder Date*"
              type="date"
              name="reminderDate"
              color="secondary"
              fullWidth
              margin="normal"
              value={formData.reminderDate}
              onChange={handleChange}
              error={!!errors.reminderDate}
              helperText={errors.reminderDate}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Category"
              name="category"
              color="secondary"
              fullWidth
              margin="normal"
              value={formData.category}
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <FormControl component="fieldset" margin="normal">
                <FormLabel sx={{ textAlign: "start" }} color="black">
                  Priority
                </FormLabel>
                <RadioGroup
                  row
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="low"
                    control={<Radio color="black" />}
                    label="Low"
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio color="black" />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value="high"
                    control={<Radio color="black" />}
                    label="High"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={!isSubmitEnabled}
            >
              Add Note
            </Button>
          </form>
        </Collapse>
      </Card>
    </Container>
  );
}

export default AddNoteForm;
