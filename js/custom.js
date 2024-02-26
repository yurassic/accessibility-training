(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

const navItems = document.querySelectorAll("#nav li");

navItems.forEach((navEl, index, listOfNavEl) => {
  const lastIndex = listOfNavEl.length - 1;

  navEl.onclick = () => toggleTab(navEl.id, navEl.dataset.target);
  navEl.onkeydown = (e) => {
    switch(e.code) {
      case "ArrowRight":
        e.preventDefault();
        index === lastIndex ? listOfNavEl[0].focus() : listOfNavEl[index+1].focus();
        break;
      case "ArrowLeft":
        e.preventDefault();
        index === 0 ? listOfNavEl[lastIndex].focus() : listOfNavEl[index-1].focus();
        break;
      case 'Home':
        e.preventDefault();
        listOfNavEl[0].focus()
        break;
      case 'End':
        e.preventDefault();
        listOfNavEl[lastIndex].focus()
        break;
      case "Space":
      case "Enter":
        e.preventDefault();
        navEl.click();
        break;
      default: 
        break;
    }
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute("aria-selected", "true");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.setAttribute("aria-selected", "false");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}
