const { forEach } = require("lodash");
const { categories } = require("../Backend/models");

async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    return works;
}

getWorks();

async function displayWorks() {
    const gallery = document.querySelector(".gallery")
    const works = await getWorks()
    for (let index = 0; index < works.length; index++) {
        const work = works[index];
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

displayWorks();


//***Creation des boutton***//

async function getCategories() {
    const reponse = await fetch ("http://localhost:5678/api/categories")
    return await reponse.json();
}

async function displayCategoriesButton() {
    const categories = await getCategories();
    categories.forEach((categorie) => {
    const btn = document.createElement("button")
    btn.textContent = categories.name.ToUpperCase();
    btn.id = categories.id;
    })
}

displayCategoriesButton();
getCategories();