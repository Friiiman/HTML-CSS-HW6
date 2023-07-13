mainNavHidden();
mainNavToggle();


function mainNavHidden() {
    var mainNav = document.querySelector(".main-nav");
    mainNav.classList.add("main-nav--hidden");
};

function mainNavToggle() {
    var burgerMenu = document.querySelector(".burger-menu");
    burgerMenu.onclick = function () {
        var mainNav = document.querySelector(".main-nav");
        mainNav.classList.toggle("main-nav--hidden");
    }
};
