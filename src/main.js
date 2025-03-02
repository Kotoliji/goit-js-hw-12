import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {showImage} from "./js/pixabay-api"
import {AddImage} from "./js/render-function"



let request
let page = 1
let maxPage 
const refs = {
    allpicture : document.querySelector('.allPicture'),
    subBtn : document.querySelector(".imageButton"),
    input : document.querySelector(".inputs"),
    loadBtn : document.querySelector(".btnLoadMore"),
    loader: document.querySelector(".loader")
}



refs.subBtn.addEventListener('click',onFormSubmit);

async function onFormSubmit(e){
    showLouder()
    e.preventDefault();
    request =  refs.input.value;
    refs.allpicture.innerHTML ='';
    try{
    const pictures = await showImage(request,page);
        
        if(pictures.total == 0){emptyInputs()}
        else{
        AddImage(pictures.hits);
        maxPage = Math.ceil(pictures.totalHits / 40);
        checkBtnVisibleStatus();
        }

    } catch(error){ 
        console.log(error)
    }
    hideLouder()
}

refs.loadBtn.addEventListener('click',onLoadMoreClick)

async function onLoadMoreClick(){
    showLouder()

    try{
        page++
        const pictures = await showImage(request,page);
        AddImage(pictures.hits);
        checkBtnVisibleStatus();
        hideLouder()

        const heigth = refs.allpicture.firstElementChild.getBoundingClientRect().height

        scrollBy({
            behavior: 'smooth',
            top: heigth,
        })

    } catch(error){ 
        console.log(error)
    }

    
}
function hideBtn(){
    refs.loadBtn.classList.add('hide')
}
function showBtn(){
    refs.loadBtn.classList.remove('hide')   
}
function hideLouder(){
    refs.loader.classList.add("hide")
}
function showLouder(){ 
    refs.loader.classList.remove("hide")
}
function checkBtnVisibleStatus(){
    if(maxPage <= page){
        hideBtn();
        iziToast.show({
            title: 'Hey',
            message: "We're sorry, but you've reached the end of search results.",
            color: "blue",
            position: 'topRight',
            });
    }else{
        showBtn();
    }
}

function emptyInputs(){
    hideBtn()
    iziToast.show({
        title: 'Hey',
        message: "Sorry, there are no images matching your search query. Please try again!",
        color: "red",
    });
    return null
}
    
