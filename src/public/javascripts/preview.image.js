const file = document.getElementById("file");
const img = document.getElementById("img");
file.addEventListener("change", (evt) => {
  if (evt.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      img.src = evt.target.result;
    }
    reader.readAsDataURL(evt.target.files[0]);
  } else {
    img.src = defaultFile;
  }
});
