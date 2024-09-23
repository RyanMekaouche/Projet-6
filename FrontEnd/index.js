
const gallery = document.querySelector(".gallery")

async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    return works;
}

getWorks();

async function displayWorks(work) {
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

async function displayWork(work) {    
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

displayWorks();


//***Creation des boutton***//

async function getCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories")
    return await reponse.json();
}

let currentCategory = "Tous"
async function handleCategory(name){
    const categories = await getCategories();
    const selectedCategory = categories.find((category) => category.name === name); 
    const buttonTri = document.querySelectorAll(".portfolio-categories button")
    console.log(selectedCategory)
    // récuperer tout les boutons et verifier si le selectedCategory.name === btn.textContent alors lui ajouter la classe "active" et supprimer cette meme classe sur toutes les autres boutons si elle est présente dans la classList, et afficher les works en verifiant que si selectedCategory.id === work.category.id
}
handleCategory()

async function displayCategoriesButton() {
    const categories = await getCategories();
    const portfolioCategories = document.querySelector(".portfolio-categories")
    const btn = document.createElement("button")
    btn.textContent = "Tous";
    btn.className = "active";
    btn.addEventListener("click",() => handleCategory())
    portfolioCategories.appendChild(btn)
    categories.forEach((categorie) => {
        const btn = document.createElement("button")
        btn.textContent = categorie.name;
        btn.addEventListener("click",() => filtrerCategories(categorie.name))
        portfolioCategories.appendChild(btn)
    })

}

displayCategoriesButton();
getCategories();



//filtrer au click sur le bouton par catégorie//

async function filtrerCategories(name) {
    console.log("filtrerCategories")
    const displayPhoto = await getWorks();
    const buttons = document.querySelectorAll(".portfolio-categories button")
    buttons.forEach((button) => {
        button.addEventListener("click",(e)=>{
    
            if (name !== undefined){
                 gallery.innerHTML = "";
        const decorationTriCategory = displayPhoto.filter((work) => {
        return name == work.category.name;
        }
    );
        decorationTriCategory.forEach((work) => {
            displayWork(work);
        });
        }    
        });
    });
}

