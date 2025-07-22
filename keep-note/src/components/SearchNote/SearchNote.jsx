import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

function SearchNote({ onSearchNote, onClearNote, searchTextBox }) {
  const theme = useTheme();
  return (
    <TextField
      variant="outlined"
      value={searchTextBox}
      onChange={onSearchNote}
      size="small"
      sx={{
        bgcolor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        borderRadius: "5px",
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton size="small" aria-label="search">
                <SearchIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: searchTextBox && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={onClearNote}
                sx={{ color: theme.palette.status.warn }}
                aria-label="clear search"
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
export default SearchNote;
