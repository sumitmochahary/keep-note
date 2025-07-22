import React from "react";
import { Card, CardContent, Typography, IconButton, CardActions, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom"

function NoteCard({ note, onDeleteNote }) {

  const deleteNote = () => {
    onDeleteNote(note.id)
  }

  return (
    <Card
      sx={{
        backgroundColor:
          note.status === "completed"
            ? "lightseagreen"
            : "lightgoldenrodyellow",
        boxShadow: 3,
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
      }}
    >
      <CardContent>
        <Typography sx={{ mb: 4 }} variant="h6" component="div" gutterBottom>
          {note.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {note.content}
        </Typography>
      </CardContent>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px"
        }}
      >
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Link
            style={{ textDecoration: "none" }}
            color="inherit"
            to={`/notes/${note.id}`}>
            <IconButton color="secondary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton color="error" onClick={deleteNote}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
}

export default NoteCard;
