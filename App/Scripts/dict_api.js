async function dictionary(){
    const inp= document.querySelector(".search-box");
    const word_h1= document.querySelector(".word");
    const phonetic= document.querySelector(".phonetic");
    const audio_div= document.querySelector(".word-right");
    const audio= document.querySelector(".audio");
    const word= inp.value;

    console.log(word);

    const dict= await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word);
    const response= await dict.json();
    word_h1.innerHTML= response[0].word;
    for(let i=0; i<response[0].phonetics.length; i++){
        if(response[0].phonetics[i].text != ""){
            if(typeof(response[0].phonetics[i].text) != "undefined"){
                phonetic.innerHTML= response[0].phonetics[i].text;
                break;
            }
        }
    }

    audio_div.addEventListener("click", ()=>{
        //try{
            audio.src= "";
            for(let j=0; j<response[0].phonetics.length; j++){
                if(response[0].phonetics[j].audio != ""){
                    if(typeof(response[0].phonetics[j].audio) != "undefined"){ 
                        audio.setAttribute("src", response[0].phonetics[j].audio);
                        break;
                    }
                }
            }
            audio.play(); 
    });
    window.addEventListener("unhandledrejection", (err)=>{
        console.log(err);
    });


    //Noun Part
    const part_of_spch= document.querySelector(".part-of-speech-noun");
    const meanings= document.querySelector(".list-of-meanings");
    while(meanings.hasChildNodes()){
        meanings.removeChild(meanings.firstChild);
    }
    part_of_spch.innerHTML= response[0].meanings[0].partOfSpeech;
    
    for(let i=0 ; i<response[0].meanings[0].definitions.length ; i++){
        const li= document.createElement("li");
        const li_text= document.createTextNode(response[0].meanings[0].definitions[i].definition);
        li.appendChild(li_text);
        meanings.appendChild(li);
    }
    
}

export default dictionary;