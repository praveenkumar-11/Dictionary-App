import elm_fact from "./elm_fact.js"; 


function get_phonetic(response){
    //  CODE TO FIND PHONETIC FROM JSON DATA

    const phonetic= response[0].phonetics.find((ph) => {
        return ph.text;
    })
    /* let phonetic;
    for(let i=0; i<response[0].phonetics.length; i++){
        if(response[0].phonetics[i].text != ""){
            if(typeof(response[0].phonetics[i].text) != "undefined"){
                phonetic= response[0].phonetics[i].text;
                break;
            }
            else{
                phonetic= "";
            }
        }
    } */
    return phonetic?.text;    
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
    
    //console.log(response.status);
    if(dict.status !== 200){
        document.querySelector(".main-wrapper").style.display= "none";
        document.querySelector(".error").style.display= "flex";
        document.querySelector(".err-title").innerHTML= response.title;
        document.querySelector(".err-message").innerHTML= response.message;
        document.querySelector(".err-res").innerHTML= response.resolution;
    }
    else{
        document.querySelector(".main-wrapper").style.display= "block";
        document.querySelector(".error").style.display= "none";
    }

    //******************** GETTING WORD & PHONETIC FROM DATA ****************************
    word_h1_elm.innerHTML= response[0].word; //  WORD USER SEARCHED
    phonetic_elm.innerHTML= get_phonetic(response);


    //******************** GETTING AUDIO FROM DATA **************************************
    audio_elm.pause();
    audio_elm.currentTime= 0;
    audio_div.addEventListener("click", ()=>{
        audio_elm.removeAttribute("src");
        const audio= play_audio(response);
        console.log(audio);
        audio_elm.src= audio;
        audio_elm.play(); 
    });

    
    const main= document.querySelector(".definitions");
    while(main.hasChildNodes()){
        main.removeChild(main.firstChild);
    }

    console.log(response.length);
    console.log(response);
    for(let j=0 ; j<response.length ; j++){
        const meanings= response[j].meanings.length;
        for(let i=0 ; i<meanings ; i++){
            elm_fact(response, i, j);
        }
    }
}
export default dictionary;
