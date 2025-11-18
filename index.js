const btnNew = document.querySelector(".btn-new-note");
const btnSave = document.querySelector(".btn-save");
const btnDelete = document.querySelector(".btn-delete");
const inputTitle = document.querySelector("#input-title");
const inputContent = document.querySelector("#input-content");
const noteList = document.querySelector(".note-list");

let notes = [];
let selectedNote = null;

btnNew.addEventListener("click", function () {
  inputTitle.value = "";
  inputContent.value = "";
  selectedNote = null;
});

btnSave.addEventListener("click", function () {
  const title = inputTitle.value;
  const content = inputContent.value;

  if (title === "" && content === "") return;

  const timeNow = new Date().toLocaleString();

  if (selectedNote === null) {
    const note = {
      id: Date.now(),
      title: title,
      content: content,
      time: timeNow,
    };
    notes.push(note);
  } else {
    selectedNote.title = title;
    selectedNote.content = content;
    selectedNote.time = timeNow;
  }

  showNotes();
});

btnDelete.addEventListener("click", function () {
  if (selectedNote === null) return;

  notes = notes.filter(function (n) {
    return n.id !== selectedNote.id;
  });

  inputTitle.value = "";
  inputContent.value = "";
  selectedNote = null;

  showNotes();
});

function showNotes() {
  noteList.innerHTML = "";
  notes.forEach(function (note) {
    let preview = note.content;
    if (preview.length > 30) {
      preview = preview.substring(0, 30) + "...";
    }
    const div = document.createElement("div");
    div.className = "note-item";
    if (selectedNote && selectedNote.id === note.id) {
      div.classList.add("selected");
    }
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
