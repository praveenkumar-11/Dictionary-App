import drop_down_function from "./drop_down.js";
import dictionary from "./dict_api.js";

// Funtion for Drop Down Menu 
drop_down_function();

//Input Field Functions
const search_btn= document.querySelector(".search-btn");
const search_box= document.querySelector(".search-box");
search_box.addEventListener("change", dictionary);