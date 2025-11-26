import { saveNotes, loadNotes, deleteNote } from "./notesAPI.js";

const btnNew = document.querySelector(".btn-new-note");
const btnSave = document.querySelector(".btn-save");
const btnDelete = document.querySelector(".btn-delete");
const inputTitle = document.querySelector("#input-title");
const inputContent = document.querySelector("#input-content");
const noteList = document.querySelector(".note-list");
const themeToggle = document.querySelector("#theme-toggle");

let notes = loadNotes();
let selectedNote = null;

btnNew.addEventListener("click", function () {
  inputTitle.value = "";
  inputContent.value = "";
  selectedNote = null;
});

btnSave.addEventListener("click", function () {
  const title = inputTitle.value.trim();
  const content = inputContent.value.trim();
  if (title === "" && content === "") return;
  const timeNow = new Date().toLocaleString();

  if (selectedNote === null) {
    const note = {
      id: Date.now(),
      title,
      content,
      time: timeNow,
    };
    notes.push(note);
  } else {
    notes = notes.map((n) =>
      n.id === selectedNote.id ? { ...n, title, content, time: timeNow } : n
    );

    selectedNote = notes.find((n) => n.id === selectedNote.id);
  }

  saveNotes(notes);
  showNotes();
});

if (selectedNote && selectedNote.id === note.id) div.classList.add("selected");

btnDelete.addEventListener("click", function () {
  if (selectedNote === null) return;
  notes = deleteNote(selectedNote.id);
  inputTitle.value = "";
  inputContent.value = "";
  selectedNote = null;
  showNotes();
});

function showNotes() {
  notes = loadNotes();
  noteList.innerHTML = "";

  notes.forEach(function (note) {
    let preview =
      note.content.length > 30
        ? note.content.substring(0, 30) + "..."
        : note.content;

    const div = document.createElement("div");
    div.className = "note-item";
    if (selectedNote && selectedNote.id === note.id)
      div.classList.add("selected");

    div.innerHTML = `
      <div class="note-title">${note.title || "Ohne Titel"}</div>
      <div class="note-preview">${preview}</div>
      <div class="note-time">${note.time}</div>
    `;

    div.addEventListener("click", function () {
      inputTitle.value = note.title;
      inputContent.value = note.content;
      selectedNote = note;
      showNotes();
    });

    noteList.appendChild(div);
  });
}

showNotes();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
