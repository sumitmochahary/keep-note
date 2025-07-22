import "./App.css";
import Header from "./components/Header/Header";
import NoteView from "./components/NoteView/NoteView";
import SearchNote from "./components/SearchNote/SearchNote";
import Footer from "./components/Footer/Footer";
import NoteDetail from "./components/NoteDetail/NoteDetail";
import UserLogin from "./components/UserLogin/UserLogin";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { useEffect, useState } from "react";
import FilterNotes from "./utils/FilterNotes";
import axios from "axios";
import { useErrorBoundary } from "react-error-boundary";
import { useSnackbar } from "notistack";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationFormWithSnackbar from "../src/components/RegistrationForm/RegistrationForm";
import { useAuth } from "./utils/AuthContext";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { isLoggedIn } = useAuth();
  const { showBoundary } = useErrorBoundary();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3001/notes");
        if (isMounted) {
          setNotes(response?.data);
          const filteredNotes = FilterNotes(response?.data, searchText);
          setNotes(filteredNotes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showBoundary(error);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [searchText, showBoundary]);

  const handleSearchNote = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearSearchNote = () => {
    setSearchText("");
  };

  const handleAddNote = async (newNote) => {
    try {
      const response = await axios.post("http://localhost:3001/notes", newNote);

      console.log("Note added sucessfully:", response.data);
      enqueueSnackbar("Note added successfully!", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar("Error submitting form!", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      showBoundary(error);
    }
  };

  const handleEditNote = (note) => {
    const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
    setNotes(updatedNotes);

    const editNote = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3001/notes/${note.id}`,
          note
        );

        console.log("Note edited successfully:", response.data);
        enqueueSnackbar("Note edited successfully!", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setNotes(
          updatedNotes.map((n) => (n.id === note.id ? response.data : n))
        );
      } catch (error) {
        console.log("Error editing note:", error);
        enqueueSnackbar("Error editing note!", {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    };
    editNote();
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
      enqueueSnackbar("Note deleted successfully!", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log("Error deleting note:", error);
      enqueueSnackbar("Error deleting note!", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <div className="App">
      <Router>
        <Header>
          {isLoggedIn && (
            <SearchNote
              onSearchNote={handleSearchNote}
              onClearNote={handleClearSearchNote}
              searchTextBox={searchText}
            />
          )}
        </Header>
        <div
          style={{
            border: "1px solid white",
            borderLeft: "none",
            borderRight: "none",
          }}
        >
          <Routes>
            <Route path="/" element={<UserLogin />} />
            <Route
              path="/register"
              element={<RegistrationFormWithSnackbar />}
            />
            <Route
              path="/notes"
              element={
                <NoteView
                  notes={notes}
                  onAddNote={handleAddNote}
                  onDeleteNote={handleDeleteNote}
                />
              }
            />
            <Route
              path="/notes/:id"
              element={
                <NoteDetail
                  onEditNote={handleEditNote}
                  onDeleteNote={handleDeleteNote}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
