import elm_fact from "./elm_fact.js"; 


function get_phonetic(response, j){
    //  CODE TO FIND PHONETIC FROM JSON DATA

    //ALTERNATE METHOD TO GET THE PHONETIC THAT NOT HAVE THE VALUES 'UNDEFINED' OR 'NULL'
    /* const phonetic= response[0].phonetics.find((ph) => {
        return ph.text;
    }) */

    //ITERATING THROUGH RESPONSE TO FIND VALID PHONETIC TEXT (i.e, NOT NULL OR UNDEFINED)
    let phonetic;
    if(response[j].phonetics.length != 0){
        for(let i=0; i<response[j].phonetics.length; i++){
            if(response[j].phonetics[i].text != ""){
                if(typeof(response[j].phonetics[i].text) != "undefined"){
                    phonetic= response[j].phonetics[i].text;
                    break;
                }
                else{
                    phonetic= "";
                }
            }
        }
    }
    
    else{
        phonetic= "";
    }
    return phonetic;    
}

////////////////////////////////////////////////////////////////////////////////////////////

function play_audio(response, j){
    let audio;
    for(let i=0; i<response[j].phonetics.length; i++){
        if(response[j].phonetics[i].audio != ""){
            if(typeof(response[j].phonetics[i].audio) != "undefined"){ 
                audio= response[j].phonetics[i].audio;
                break;
            }
        }
    }
    return audio;
}
////////////////////////////////////////////////////////////////////////////////////////////


async function dictionary(word){
    const inp= document.querySelector(".search-box");
    const word_h1_elm= document.querySelector(".word");
    const phonetic_elm= document.querySelector(".phonetic");
    const audio_div= document.querySelector(".word-right");
    const audio_elm= document.querySelector(".audio");
    const word_elm= inp.value || word;
    console.log(word_elm);

    inp.blur();

    //******************** FETCHING DATA FROM API ***************************************

        const dict= await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word_elm);
        const response= await dict.json();
    
    //IF API RESPONDED WITH CODE NOT EQUALS TO 200 (WHICH MEANS 'NO DEFINITIONS FOUND') 
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
    //phonetic_elm.innerHTML= get_phonetic(response, j);


    //******************** GETTING AUDIO FROM DATA **************************************
    /* audio_elm.pause();
    audio_elm.currentTime= 0;
    audio_div.addEventListener("click", ()=>{
        audio_elm.removeAttribute("src");
        const audio= play_audio(response, j);
        console.log(audio);
        audio_elm.src= audio;
        audio_elm.play(); 
    }); */

    
    const main= document.querySelector(".definitions");
    while(main.hasChildNodes()){
        main.removeChild(main.firstChild);
    }
    for(let j=0 ; j<response.length ; j++){
        const meanings= response[j].meanings.length;

        //GETTING AUDIO FROM DATA
        audio_elm.pause();
        audio_elm.currentTime= 0;
        audio_div.addEventListener("click", ()=>{
            audio_elm.removeAttribute("src");
            const audio= play_audio(response, j);
            audio_elm.src= audio;
            audio_elm.play(); 
        });

        //GETTING PHONETIC FROM DATA
        phonetic_elm.innerHTML= get_phonetic(response, j);

        for(let i=0 ; i<meanings ; i++){
            elm_fact(response, i, j);
        }
    }
}
export default dictionary;
