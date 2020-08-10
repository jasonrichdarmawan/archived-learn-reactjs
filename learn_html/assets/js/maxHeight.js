let elements = document.getElementsByClassName("maxHeight");
let i;
for (i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight == 0) {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } else {
            panel.style.maxHeight = null;
        }
    });
}