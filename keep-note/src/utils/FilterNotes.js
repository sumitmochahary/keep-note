function FilterNotes(notes, searchText) {
  if (!searchText) return notes;
  else {
    const results = notes?.filter((note) =>
      note.title?.toLowerCase().includes(searchText.toLowerCase())
    );
    return results;
  }
}

export default FilterNotes;
