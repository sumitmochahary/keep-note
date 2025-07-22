import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { AccountCircle, Home } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout"
import { useAuth } from "../../utils/AuthContext";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom"

function Header({ children }) {
  const theme = useTheme();
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()

  const navigateToNotes = () => {
    isLoggedIn ? navigate("/notes") : navigate("/")
  }

  const onLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: theme.palette.secondary.main, color: "whitesmoke" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "1.2em" }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              color: "lightblue",
              fontFamily: `"Protest Guerrilla", sans-serif`,
              fontSize: "28px",
            }}
          >
            KeepNote
          </Typography>
          {children}
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="Home"
            color="inherit"
            onClick={navigateToNotes}>
            <Home />
          </IconButton>
          {isLoggedIn ? <IconButton
            size="large"
            aria-label="Account of current user"
            color="primary"
          >
            <AccountCircle />
          </IconButton> : <Link
            style={{ textDecoration: "none" }}
            to={`/register`}
            color="inherit">
            <IconButton
              size="large"
              aria-label="Account of current user"
              color="primary"
            >
              <AccountCircle />
            </IconButton>
          </Link>}
          {isLoggedIn ? <IconButton
            size="large"
            edge="end"
            aria-label="Logout"
            color="inherit"
            onClick={() => onLogout()}
          >
            <LogoutIcon />
          </IconButton> : <IconButton
            size="large"
            edge="end"
            aria-label="Login"
            color="inherit"
            onClick={navigateToNotes}
          >
            <LoginIcon />
          </IconButton>}

        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
