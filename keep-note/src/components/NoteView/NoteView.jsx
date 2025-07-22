import { Box, Typography } from "@mui/material";
import NoteList from "../NoteList/NoteList";
import AddNoteForm from "../AddNoteForm/AddNoteForm";

function NoteView({ notes, onAddNote, onDeleteNote }) {
  return (
    <Box
      sx={{
        minHeight: "85vh",
        textAlign: "center",
        padding: "10px 0px 30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ mb: 4, mt: 3 }} variant="h6" gutterBottom>
        Checklist Chronicles: Conquering Tasks One Tick at a Time
      </Typography>
      <AddNoteForm onAddNote={onAddNote} />
      <NoteList notes={notes} onDeleteNote={onDeleteNote} />
    </Box>
  );
}

export default NoteView;
