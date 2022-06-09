document.getElementById("get-btn").addEventListener("click", getNotes);

async function getNotes() {
  const res = await fetch(`/notes`);
  const notes = await res.json();
  makeList(notes);
}

function makeList(notes) {
  console.log(notes, typeof notes);
  if (typeof notes === "string") {
    const empty = document.createElement("li");
    empty.innerText = notes;
    document.querySelector(".note-list").appendChild(empty);
  }
  // // clear out anything that might be displayed
  else document.querySelector(".note-list").innerHTML = "";
  notes.forEach((note) => {
    const toDo = document.createElement("li");
    toDo.innerText = note.content;
    document.querySelector(".note-list").appendChild(toDo);
  });
}
