function setAlert(){
    alert("shgshgc");
}
function handleCopy(){
      var copyText = document.querySelector("#input");
      copyText.select();
      navigator.clipboard.writeText("http://localhost:3000/"+ copyText.value);
      alert("Link copied to clipboard.");
 }

document.querySelectorAll(".btn-success").forEach(elem => elem.addEventListener("click",
 () => {
    var copyText = elem.target;
      copyText.select();
      navigator.clipboard.writeText("http://localhost:3000/"+ copyText.value);
      alert("Link copied to clipboard.");
  }));