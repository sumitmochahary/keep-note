import { TextField, Container, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@emotion/react"
import { useAuth } from "../../utils/AuthContext"
import axios from "axios"

function UserLogin() {
    const theme = useTheme()
    const navigate = useNavigate()
    const { login } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const validateUser = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.get("http://localhost:3001/users")
            const users = response.data

            const user = users.find((u) => u.email === email && u.password === password)

            if (user) {
                login()
                navigate("/notes")
            } else {
                setError("Enter valid user")
            }
        } catch (error) {
            console.error("Error fetching users:", error)
            setError("Something went wrong. Please try again.")
        }

    }

    return (
        <Container maxWidth="xs" sx={{ minHeight: "65vh", marginTop: 20 }}>
            <form
                onSubmit={validateUser}
                style={{
                    backgroundColor: theme.palette.background.paper,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5em",
                    padding: "30px 50px",
                    margin: 20,
                    borderRadius: "5px"
                }}>
                <Typography variant="h6" component="div" color="black" textAlign="center">
                    Login Form
                </Typography>
                <TextField
                    variant="outlined" label="Enter Email" type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error}
                    helperText={error}
                    color="black"
                />
                <TextField
                    variant="outlined" label="Enter Password" type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error}
                    helperText={error}
                    color="black"
                />
                <Button
                    type="submit"
                    sx={{
                        bgcolor: theme.palette.secondary.main,
                        color: "white"
                    }}
                    variant="contained">
                    Login
                </Button>
            </form>
        </Container>
    )

}

export default UserLogin