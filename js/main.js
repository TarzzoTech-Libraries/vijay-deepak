(function() {
  const setCopyRights = function() {
    const copyRights = document.getElementById("copy-rights");
    copyRights.innerHTML = `©Copyright${new Date().getFullYear()}. All rights reserved.`;
  }

  const setNavActive = function() {
    const navList = document.getElementById("nav-list");
    const navListItems = navList.getElementsByClassName("nav-list-item");
    for (let i = 0; i < navListItems.length; i++) {
      navListItems[i].addEventListener("click", function() {
        let currentActive = document.getElementsByClassName("active");
        if (currentActive.length > 0) {
          currentActive[0].className = currentActive[0].className.replace(
            " active",
            ""
          );
        }
        this.className += " active";
      });
    }
  };

  const setInitialDivHeight = function() {
    const homeDiv = document.getElementById("home");
    homeDiv.style.height = `${window.screen.availHeight}px`;
  }

  const setHomeText = function() {
    const homeText = document.getElementById("home-text");
    homeText.innerHTML = `<h2>Hi,</h2><h2>I'm Vijay Deepak</h2>`;
    setInterval(() => {
      if(homeText.innerHTML === `<h2>Hi,</h2><h2>I'm Vijay Deepak</h2>`) {
        homeText.innerHTML = `<h2>I am</h2><h2>a Web Developer</h2>`;
      } else {
        homeText.innerHTML = `<h2>Hi,</h2><h2>I'm Vijay Deepak</h2>`;
      }
    }, 3000);
  }

  // Call On load
  setCopyRights();
  setNavActive();
  setInitialDivHeight();
  setHomeText();
})();
