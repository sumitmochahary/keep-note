import { Card, Container, TextField, Radio, FormControl, RadioGroup, FormControlLabel, CardContent, CardActions, IconButton, FormLabel } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from "@mui/icons-material/Delete"
import { useTheme } from "@mui/material/styles"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function NoteDetail({ onEditNote, onDeleteNote }) {
    const theme = useTheme()
    const { id } = useParams()
    const [note, setNote] = useState({})
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        reminderDate: "",
        category: "",
        priority: "low",
        status: "yet-to-start",
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3001/notes/${id}`)
                setNote(response.data)
            } catch (error) {
                console.log("Error fetching data:", error)
            }
        }
        fetchData()
    }, [id])

    useEffect(() => {
        if (note && Object.keys(note).length > 0) {
            setFormData({
                title: note.title || "",
                content: note.content || "",
                status: note.status || "yet-to-start"
            })
        }
    }, [note])

    function handleChange(event) {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    const deleteNote = () => {
        onDeleteNote(note.id)
        navigate("/notes")
    }

    const editNote = async (event) => {
        event.preventDefault()
        try {
            const updatedNote = {
                id: note.id,
                title: formData.title,
                content: formData.content,
                status: formData.status
            }
            await onEditNote(updatedNote)
            navigate("/notes")
        } catch (error) {
            console.error("Error submitting from:", error)
        }
    }

    return (
        <Container maxWidth="sm" sx={{ minHeight: "75vh" }}>
            <Card sx={{
                maxWidth: 500,
                bgcolor: theme.palette.primary.main,
                boxShadow: 3,
                margin: 10
            }}>
                <form onSubmit={editNote}>
                    <CardContent>
                        <TextField variant="standard" margin="normal" label="Title" fullWidth min="1" type="text" name="title" value={formData.title} onChange={handleChange} color="black" />

                        <TextField variant="standard" margin="normal" label="Content" fullWidth min="1" type="text" name="content" value={formData.content} onChange={handleChange} color="black" multiline />

                        <FormControl>
                            <FormLabel sx={{ textAlign: "start" }} color="black">
                                Status
                            </FormLabel>
                            <RadioGroup row
                                name="status"
                                value={formData.status}
                                onChange={handleChange}>
                                <FormControlLabel
                                    value="completed"
                                    control={<Radio color="black" />}
                                    label="Completed"
                                />
                                <FormControlLabel
                                    value="yet-to-start"
                                    control={<Radio color="black" />}
                                    label="Yet-to-start"
                                />
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                        <IconButton color="inherit" type="submit">
                            <CheckCircleIcon />
                        </IconButton>
                        <IconButton color="error" onClick={deleteNote}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </form>
            </Card>
        </Container>
    )
}

export default NoteDetail