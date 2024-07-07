var slide_index = 1;
const navbar_btt = document.querySelector(".navbar_button");
const navbar_links = document.querySelector(".navbar_links");
const navbar = document.querySelector(".dropdown");

show_slides(slide_index);

// Avança ou retorna a imagem do carrossel
function plus_slides(n){
    show_slides(slide_index += n);
}

// Setar a dot que corresponde a imagem selecionada no carrossel
function current_slides(n){
    show_slides(slide_index = n);
}

// Fazer a ação de trocar as imagens no carrossel
function show_slides(n){
    var slides = document.getElementsByClassName("fade");
    var dots = document.getElementsByClassName("dot");
    var i;

    // estando na ultima imagem, faz o carrossel voltar para a primeira
    if(n > slides.length){
        slide_index = 1;
    }
    // estando na primeira imagem, faz o carrossel voltar para a ultima
    if(n < 1){
        slide_index = slides.length;
    }

    // Desativa todas as imagens do carrossel
    for(i=0; i<slides.length; i++){
        slides[i].style.display = "none";
    }

    // Desativar todas as bolinhas que estejam selecionadas
    for(i=0; i<dots.length; i++){
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slide_index-1].style.display = "block";
    dots[slide_index-1].className += " active";
}
function toggleMenu() {
    var menu = document.getElementById("dropdownMenu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
        
    }
}

function toggle_menu(event) {
    if (event.type === 'touchstart') event.preventDefault();

    navbar_links.classList.toggle('active');
    navbar.classList.toggle('active');
}

navbar_btt.addEventListener('click', toggle_menu);
navbar_btt.addEventListener('touchstart', toggle_menu);

function navigateTo(page) {
    console.log("Navigating to", page);
    window.location.href = page;
}