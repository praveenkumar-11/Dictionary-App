function get_meanings(resp, meaning_list, i){
    while(meaning_list.hasChildNodes()){
        meaning_list.removeChild(meaning_list.firstChild);
    }

    if(resp[0].meanings[i].definitions.length != 0){
        for(let j=0 ; j<resp[0].meanings[i].definitions.length ; j++){
            const def= resp[0].meanings[i].definitions[j].definition;
            const example= resp[0].meanings[i].definitions[j].example;

            if(def != ""){
                if(typeof(def) != "undefined"){
                    const li= document.createElement("li");
                    const li_txt= document.createTextNode(resp[0].meanings[i].definitions[j].definition);
                    li.appendChild(li_txt);
                    meaning_list.appendChild(li);
                }
            }

            if(example != ""){
                if(typeof(example) != "undefined"){
                    const ex= document.createElement("h4");
                    const ex_txt= document.createTextNode(resp[0].meanings[i].definitions[j].example);
                    ex.appendChild(ex_txt);
                    meaning_list.appendChild(ex);
                }
            }
        }
    }
}

function get_syn_ant(resp, i,h4, span){
    if(resp[0].meanings[i].definitions.length != 0){
        for(let j=0 ; j<resp[0].meanings[i].definitions.length ; j++){
            const synonyms= resp[0].meanings[i].definitions[j].synonyms;
            const synonyms_2= resp[0].meanings[i].synonyms;
            const antonyms= resp[0].meanings[i].definitions[j].antonyms;
            const antonyms_2= resp[0].meanings[i].antonyms;
            const example= resp[0].meanings[i].definitions[j].example;

            if(synonyms != ""){
                if(typeof(synonyms) != "undefined"){
                    h4.innerHTML= "Synonyms";
                    span.innerHTML= synonyms;
                }
            }
            else if(synonyms_2 != ""){
                if(typeof(synonyms_2) != "undefined"){
                    h4.innerHTML= "Synonyms";
                    span.innerHTML= synonyms_2;
                }
            }
            else{
                synonyms.innerHTML= "";
                synonyms_2.innerHTML= "";
            }

            if(antonyms != ""){
                if(typeof(antonyms) != "undefined"){
                    h4.innerHTML= "Antonyms";
                    span.innerHTML= antonyms;
                }
            }
            else if(antonyms_2 != ""){
                if(typeof(antonyms_2) != "undefined"){
                    h4.innerHTML= "Antonyms";
                    span.innerHTML= antonyms_2;
                }
            }
            else{
                antonyms.innerHTML= "";
                antonyms_2.innerHTML= "";
            }
        }
    }
}



function elm_fact(resp, i){
    const main= document.querySelector(".definitions");

    const section= document.createElement("section");
    section.setAttribute("class", "main-section");
    section.setAttribute("class", "section-wrapper");
    const section_2= document.createElement("section");
    section_2.setAttribute("class", "heading-section");

    const h3= document.createElement("h3");
    h3.innerHTML= resp[0].meanings[i].partOfSpeech;

    const hr= document.createElement("hr");
    const div_1= document.createElement("div");
    div_1.setAttribute("class", "meaning-section");

    const p= document.createElement("p");
    p.innerHTML= "Meaning";

    const ul= document.createElement("ul");
    get_meanings(resp , ul, i);


    const div_2= document.createElement("div");
    div_2.setAttribute("class", "extras-section");
    const h4= document.createElement("h4");
    const span= document.createElement("span");
    get_syn_ant(resp, i, h4, span);


    section_2.appendChild(h3);
    section_2.appendChild(hr);

    div_1.appendChild(p);
    div_1.appendChild(ul);

    div_2.appendChild(h4);
    div_2.appendChild(span);

    section.appendChild(section_2);
    section.appendChild(div_1);
    section.appendChild(div_2);

    main.appendChild(section);
}

export default elm_fact;