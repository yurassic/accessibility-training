(function BurgerInit() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

(function TabsInit() {
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

})();


(function MenuInit() {
  // FUTURE IMPROVMENT: Add logic for many
  const menuBtns = [...document.querySelectorAll('.navbar-item .button')];
  const menuItems = menuBtns.map(btn => btn.closest('.navbar-item'));
  const subMenuBtn = document.querySelector('.button.with-sublist');
  const subMenu = document.querySelector("#" + subMenuBtn.dataset.target);
  const subMenuItems = subMenu.querySelectorAll('li[role="menuitem"]');

  const hideSubMenu = () => {
    subMenu.classList.add("hidden");
    subMenu.setAttribute("aria-hidden", "true");
    subMenuBtn.setAttribute("aria-expanded", "false");
    subMenuBtn.focus(); // Return focus to the button after closing submenu
  }

  const showSubMenu = () => {
    subMenu.classList.remove("hidden");
    subMenu.setAttribute("aria-hidden", "false");
    subMenuBtn.setAttribute("aria-expanded", "true");
    subMenuItems[0].focus(); // Set focus to the first menu item
  }

  function handleMenuNavigation(event) {
    const key = event.key;
    const currentIndex = menuItems.findIndex(item => item.contains(document.activeElement));
    const btn = menuBtns[currentIndex];
    const hasSubMenu = menuBtns[currentIndex].classList.contains('with-sublist');

    switch (key) {
      case "Tab":
      case "ArrowRight":
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % menuItems.length;
        menuBtns[nextIndex].focus();
        break;
      case "ArrowLeft":
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        menuBtns[prevIndex].focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        if (hasSubMenu) {
          showSubMenu();
        }
        break;
      case "Space":
      case "Enter":
        event.preventDefault();
        btn.click();
        break;
    }
  }

  function handleSubMenuNavigation(event) {
    const key = event.key;
    const currentIndex = Array.from(subMenuItems).findIndex(item => item === this);
    const isHidden = subMenu.classList.contains("hidden");

    switch (key) {
      case "Escape":
        hideSubMenu();
        break;
      case "ArrowDown":
      case "ArrowRight":
        if (!isHidden) {
          event.preventDefault();
          const nextIndex = (currentIndex + 1 ) % subMenuItems.length;
          subMenuItems[nextIndex].focus();
        }
        break;
      case "ArrowUp":
      case "ArrowLeft":
        if (!isHidden) {
          event.preventDefault();
          const prevIndex = (currentIndex - 1 + subMenuItems.length) % subMenuItems.length;
          subMenuItems[prevIndex].focus();
        }
        break;
      case "Home":
        if (!isHidden) {
          event.preventDefault();
          subMenuItems[0].focus();
        }
        break;
      case "End":
        if (!isHidden) {
          event.preventDefault();
          subMenuItems[subMenuItems.length - 1].focus();
        }
        break;
      case " ":
      case "Enter":
        if (!isHidden) {
          event.preventDefault();
          console.log("Space or Enter pressed on menu item:", this.textContent);
          hideSubMenu();
        }
        break;
    }
  }

  // Event listeners
  subMenuBtn.addEventListener("click", function() {
    if (subMenu.classList.contains("hidden")) {
      showSubMenu();
    } else {
      hideSubMenu();
    }
  });

  menuBtns.forEach(item => {
    item.addEventListener("keydown", handleMenuNavigation);
  });

  subMenuItems.forEach(item => {
    item.addEventListener("keydown", handleSubMenuNavigation);
  });

  subMenu.addEventListener("focusout", function(event) {
    if (!subMenu.contains(event.relatedTarget)) {
      hideSubMenu();
    }
  });
})();
