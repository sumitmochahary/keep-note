import { Grid2 } from "@mui/material";
import NoteCard from "../NoteCard/NoteCard";

function NoteList({ notes, onDeleteNote }) {
  return (
    <Grid2
      container
      spacing={3}
      justifyContent="center"
      sx={{ mt: 3, display: "grid", gridTemplateColumns: "repeat(3, 430px)" }}
    >
      {notes?.map((note) => (
        <Grid2 item key={note.id} xs={12} sm={6} md={4}>
          <NoteCard note={note} onDeleteNote={onDeleteNote} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default NoteList;
