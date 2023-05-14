const files = document.getElementById("file");
const imgs = document.getElementById("img");
files.addEventListener("change", (evt) => {
  if (evt.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      imgs.src = evt.target.result;
    }
    reader.readAsDataURL(evt.target.files[0]);
  } else {
    imgs.src = defaultFile;
  }
});
