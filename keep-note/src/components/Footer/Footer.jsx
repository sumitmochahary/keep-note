import { Container, Typography, IconButton, Link, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "@mui/material/styles";

function Footer() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="xl"
      sx={{
        bgcolor: theme.palette.secondary.main,
        color: "whitesmoke",
        display: "flex",
        alignItems: "center",
        padding: "10px 0",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Typography variant="body2" component="p">
        Copyright &copy; 2024 Keep Note. All rights reserved.
      </Typography>

      <Box>
        <IconButton aria-label="facebook">
          <Link
            sx={{ color: theme.palette.primary.main }}
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon data-testid="facebook-icon" />
          </Link>
        </IconButton>

        <IconButton aria-label="instagram">
          <Link
            sx={{ color: theme.palette.primary.main }}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon data-testid="instagram-icon" />
          </Link>
        </IconButton>

        <IconButton aria-label="linkedin">
          <Link
            sx={{ color: theme.palette.primary.main }}
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon data-testid="linkedin-icon" />
          </Link>
        </IconButton>
      </Box>
    </Container>
  );
}

export default Footer;
