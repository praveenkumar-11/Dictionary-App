import drop_down_function from "./drop_down.js";
import dictionary from "./dict_api.js";



//Input Field Functions
const search_btn= document.querySelector(".search-btn");
const search_box= document.querySelector(".search-box");
search_box.addEventListener("change", dictionary);


window.addEventListener("load", ()=>{
   search_box.focus();
   dictionary("hello");
});


// Funtion for Drop Down Menu 
drop_down_function();


//DARK MODE TOGGLE
const toggle_btn= document.querySelector("input[type=checkbox]");
toggle_btn.addEventListener("change", (evt) => {
   if(toggle_btn.checked){
      document.documentElement.setAttribute("data-theme" , "dark");
   }
   else{
      document.documentElement.setAttribute("data-theme" , "light");
   }
});