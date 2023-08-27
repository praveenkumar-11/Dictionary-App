async function dictionary(){
    const inp= document.querySelector(".search-box");
    const word_h1= document.querySelector(".word");
    const phonetic= document.querySelector(".phonetic");
    const audio_div= document.querySelector(".word-right");
    const audio= document.querySelector(".audio");
    const word= inp.value;

    inp.blur();
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
        console.log(err.reason);
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

    //Verb Part
    const part_of_spch_verb= document.querySelector(".part-of-speech-verb");
    const meanings_verb= document.querySelector(".list-of-meanings-verb");

    if(typeof(response[0].meanings[1]) == "undefined"){
        if(response[0].meanings[1].partOfSpeech == ""){
            part_of_spch_verb.parentElement.parentElement.style.display= "none";
        }
    }
    else{

        part_of_spch_verb.innerHTML= response[0].meanings[1].partOfSpeech;

        while(meanings_verb.hasChildNodes()){
            meanings_verb.removeChild(meanings_verb.firstChild);
        }
        
        for(let i=0 ; i<response[0].meanings[1].definitions.length ; i++){
            const li_verb= document.createElement("li");
            const li_text_verb= document.createTextNode(response[0].meanings[1].definitions[i].definition);
            li_verb.appendChild(li_text_verb);
            meanings_verb.appendChild(li_verb);
        }
            
        const ex= document.querySelector(".example");
        for(let i=0 ; i<response[0].meanings[1].definitions.length ; i++){
            if(response[0].meanings[1].definitions[i].example != ""){
                ex.innerHTML= response[0].meanings[0].definitions[i].example;
            }
        }
    }


    const syn= document.querySelector(".synonym-part span");
    for(let i=0 ; i<response[0].meanings[0].definitions.length ; i++){
        alert(response[0].meanings[0].definitions[i].synonyms);
        if(response[0].meanings[0].definitions[i].synonyms != ""){
            syn.innerHTML= response[0].meanings[0].definitions[i].synonyms;
        }
        else{
            syn.innerHTML= response[0].meanings[0].synonyms[0];
        }
    }
    
}

export default dictionary;
