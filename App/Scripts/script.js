//import fontss from "App/Styles/_fonts.scss";

const drop_down= document.querySelector(".current-font-and-icon");
const drop_down_con= document.querySelector(".drop-down-content");
const fonts= document.querySelectorAll(".drop-down-content span");
const font_styles={
    serif: "'Lora', serif",
    sans_serif: "'Inter', sans-serif",
    mono: "'Inconsolata', monospace"
};
const font_fam= [font_styles.serif, font_styles.sans_serif, font_styles.mono];

drop_down.addEventListener("focus", (event)=>{
    event.preventDefault();
    drop_down_con.style.opacity= "100";
});

drop_down.addEventListener("blur", ()=>{
    drop_down_con.style.opacity= "0";
});

for(let i=0; i<fonts.length; i++){
    fonts[i].addEventListener("click", (event)=>{
        //.style.fontFamily= font_fam[i];
        console.log(font_fam[i]);
    })
}