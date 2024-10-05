const gallery = document.querySelector(".gallery")

async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    return works;
}

getWorks();

async function displayWorks(category) {
    gallery.innerHTML = ""
    const works = await getWorks()
    //const filteredWorks = si catégorie ? on filtre nos travaux par rapport a la category passé en paramètre de fonction : on renvoie tout les travaux car pas de catégorie
    const filteredWorks = category ? works.filter(work => work.category.id === category.id) : works
    for (let index = 0; index < filteredWorks.length; index++) {
        const work = filteredWorks[index];
        const figureElement = document.createElement("figure")
        const figureImgElement = document.createElement("img")
        figureImgElement.src = work.imageUrl
        figureImgElement.alt = work.title
        const figureCaptionElement = document.createElement("figcaption")
        figureCaptionElement.textContent = work.title
        figureElement.appendChild(figureImgElement)
        figureElement.appendChild(figureCaptionElement)
        gallery.appendChild(figureElement)
    }
}



//***Creation des boutton***//

async function getCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories")
    return await reponse.json();
}


async function displayCategoriesButton() {
    const categories = await getCategories();
    const portfolioCategories = document.querySelector(".portfolio-categories")
    const btn = document.createElement("button")
    btn.textContent = "Tous";
    btn.className = "category-button active";
    btn.addEventListener("click", () => {
        handleFilterCategory()
        btn.classList.add("active")
    })
    portfolioCategories.appendChild(btn)
    categories.forEach((category) => {
        const btn = document.createElement("button")
        btn.textContent = category.name;
        btn.className = "category-button";
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            handleFilterCategory(category)
            btn.classList.add("active")
        })
        portfolioCategories.appendChild(btn)
    })

}
displayWorks();
displayCategoriesButton();
getCategories();



//filtrer au click sur le bouton par catégorie//

async function handleFilterCategory(category) {
    const active = document.querySelector(".category-button.active")

    active.classList.remove("active")



    const categories = await getCategories();
    const selectedCategory = categories.find(item => item.id === (category && category.id))
    console.log(selectedCategory)
    displayWorks(selectedCategory)
}

//Mode edition//

function displayEditorMode() {
    if (sessionStorage.authToken) {
        console.log("ok");
        const editorMod = document.querySelector(".mode__edition.hidden")
        editorMod.classList.remove("hidden")
        const buttonModified = document.getElementById("button__modif")
        buttonModified.classList.remove("hidden")
        const portfolioEdit = document.querySelector(".portfolio__edit")
        portfolioEdit.classList.add("portfolio__edit-flex")
    }
}
displayEditorMode()

window.onload = function () {
    if (sessionStorage.authToken) {
        const navLoginLink = document.getElementById("login__link")
        navLoginLink.textContent = "logout";
        navLoginLink.addEventListener("click", (event) => {
            event.preventDefault()
            sessionStorage.removeItem("authToken")
            window.location.replace("./index.html");
            navLoginLink.textContent = "login";
        })
    }
}

if (sessionStorage.authToken) {
    const openModal = function (e){
        e.preventDefault()
        const target = document.querySelector(e.target.getAttribute("href"))
        target.style.display = null
        target.removeAttribute("aria-hidden")
        target.setAttribute("aria-modal","true")
    }
    
    document.querySelectorAll(".js-modal").forEach(a =>{
        a.addEventListener("click", openModal)
    })
    }






