const menuButton = document.querySelector(".navbar__menu");
const dropdown = document.querySelector(".navbar__list")
const backdrop = document.querySelector("#backdrop");
const links = document.querySelectorAll(".navbar__list li a");

menuButton.addEventListener("click", () => {
    //console.log("clcked");
    menuButton.classList.toggle("activeMenu");
    dropdown.classList.toggle("activeDrop");
    backdrop.classList.toggle("backdrop");

})


links.forEach(each => {
    each.addEventListener("click", () => {
       // console.log(menuButton)
        var style = window.getComputedStyle(menuButton);

        if (style.display == "block") {
            menuButton.classList.toggle("activeMenu");
            dropdown.classList.toggle("activeDrop");
            backdrop.classList.toggle("backdrop");
        }
        // console.log("close all")
    })
})