import "./styles/style.scss"

console.log("hello world");

//Make the DIV element draggagle:
dragElement(document.getElementById("main-nav"));
    
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    if(elmnt.offsetTop < 0){
      pos2 = 0;
      elmnt.style.top = 0;
      document.onmousemove = null;
    }else if (elmnt.offsetTop > (window.innerHeight - (elmnt.offsetHeight * 1.1))){
      pos2 = 0;
      elmnt.style.top = (window.innerHeight - (elmnt.offsetHeight * 1.1)) + "px"
      document.onmousemove = null;
    }else{
      // calculate the new cursor position:
      pos2 = pos4 - e.clientY;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }
  
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


const menuElm = document.querySelector("#main-navheader");

menuElm.onclick = function() {
    menuElm.classList.toggle("clicked");
}