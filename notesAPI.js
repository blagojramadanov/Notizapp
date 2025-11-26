const NOTES_KEY = "myNotes";

export function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function loadNotes() {
  const stored = localStorage.getItem(NOTES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function deleteNote(noteId) {
  const notes = loadNotes();
  const updatedNotes = notes.filter((n) => n.id !== noteId);
  saveNotes(updatedNotes);
  return updatedNotes;
}
