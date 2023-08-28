import elm_fact from "./elm_fact.js"; 


function get_phonetic(response){
    //  CODE TO FIND PHONETIC FROM JSON DATA
    let phonetic;
    for(let i=0; i<response[0].phonetics.length; i++){
        if(response[0].phonetics[i].text != ""){
            if(typeof(response[0].phonetics[i].text) != "undefined"){
                phonetic= response[0].phonetics[i].text;
                break;
            }
        }
    }
    return phonetic;    
}

////////////////////////////////////////////////////////////////////////////////////////////

function play_audio(response){
    let audio;
    for(let i=0; i<response[0].phonetics.length; i++){
        if(response[0].phonetics[i].audio != ""){
            if(typeof(response[0].phonetics[i].audio) != "undefined"){ 
                audio= response[0].phonetics[i].audio;
                break;
            }
        }
    }
    return audio;
}
////////////////////////////////////////////////////////////////////////////////////////////


async function dictionary(){
    const inp= document.querySelector(".search-box");
    const word_h1_elm= document.querySelector(".word");
    const phonetic_elm= document.querySelector(".phonetic");
    const audio_div= document.querySelector(".word-right");
    const audio_elm= document.querySelector(".audio");
    const word_elm= inp.value;

    inp.blur();

    //******************** FETCHING DATA FROM API ***************************************
    const dict= await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word_elm);
    const response= await dict.json();


    //******************** GETTING WORD & PHONETIC FROM DATA ****************************
    word_h1_elm.innerHTML= response[0].word; //  WORD USER SEARCHED
    phonetic_elm.innerHTML= get_phonetic(response);


    //******************** GETTING AUDIO FROM DATA **************************************
    audio_div.addEventListener("click", ()=>{
        const audio= play_audio(response);
        audio_elm.src= audio;
        audio_elm.play(); 
    });


    const meanings= response[0].meanings.length;
    const main= document.querySelector(".definitions");
    while(main.hasChildNodes()){
        main.removeChild(main.firstChild);
    }
    for(let i=0 ; i<meanings ; i++){
        elm_fact(response, i);
    }
}
export default dictionary;
