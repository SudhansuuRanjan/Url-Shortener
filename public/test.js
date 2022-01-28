function setAlert(){
    alert("shgshgc");
}
function handleCopy(){
      var copyText = document.querySelectorAll("#input");
      copyText.select();
      navigator.clipboard.writeText("http://localhost:3000/"+ copyText.value);
      alert("Link copied to clipboard.");
    }

var linksArr = [1, 2 , 3];
