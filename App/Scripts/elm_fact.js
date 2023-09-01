function get_meanings(resp, meaning_list, i, j){
    while(meaning_list.hasChildNodes()){
        meaning_list.removeChild(meaning_list.firstChild);
    }

    if(resp[j].meanings[i].definitions.length != 0){
        for(let k=0 ; k<resp[j].meanings[i].definitions.length ; k++){
            const def= resp[j].meanings[i].definitions[k].definition;
            const example= resp[j].meanings[i].definitions[k].example;

            if(def != ""){
                if(typeof(def) != "undefined"){
                    const li= document.createElement("li");
                    const li_txt= document.createTextNode(resp[j].meanings[i].definitions[k].definition);
                    li.appendChild(li_txt);
                    meaning_list.appendChild(li);
                }
            }

            if(example != ""){
                if(typeof(example) != "undefined"){
                    const ex= document.createElement("h4");
                    const ex_txt= document.createTextNode(resp[j].meanings[i].definitions[k].example);
                    ex.appendChild(ex_txt);
                    meaning_list.appendChild(ex);
                }
            }
        }
    }
}

function get_syn_ant(resp, i, j, h4, p_syn, h4_ant, p_ant, syn_div, ant_div
    ){

    if(resp[j].meanings[i].definitions.length != 0){
        for(let k=0 ; k<resp[j].meanings[i].definitions.length ; k++){
            let a= resp[j].meanings.find((s)=>{return s.synonyms;})
            const synonyms= resp[j].meanings[i].definitions[k].synonyms;
            const synonyms_2= resp[j].meanings[i].synonyms;
            const antonyms= resp[j].meanings[i].definitions[k].antonyms;
            const antonyms_2= resp[j].meanings[i].antonyms;
            const example= resp[j].meanings[i].definitions[k].example;

            if(synonyms != ""){
                if(typeof(synonyms) != "undefined"){
                    h4.innerHTML= "Synonyms";
                    p_syn.innerHTML= synonyms;
                }
            }
            else if(synonyms_2 != ""){
                if(typeof(synonyms_2) != "undefined"){
                    h4.innerHTML= "Synonyms";
                    p_syn.innerHTML= synonyms_2;
                }
            }
            else{
                syn_div.style.display= "none";
            }
            if(antonyms != ""){
                if(typeof(antonyms) != "undefined"){
                    h4_ant.innerHTML= "Antonyms";
                    p_ant.innerHTML= antonyms;
                }
            }
            else if(antonyms_2 != ""){
                if(typeof(antonyms_2) != "undefined"){
                    h4_ant.innerHTML= "Antonyms";
                    p_ant.innerHTML= antonyms_2;
                }
            }
            else{
                ant_div.style.display= "none";
            }
        }
    }
}



function elm_fact(resp, i, j){
    const main= document.querySelector(".definitions");

    const section= document.createElement("section");
    section.setAttribute("class", "main-section");
    section.setAttribute("class", "section-wrapper");
    const section_2= document.createElement("section");
    section_2.setAttribute("class", "heading-section");

    const h3= document.createElement("h3");
    h3.innerHTML= resp[j].meanings[i].partOfSpeech;

    const hr= document.createElement("hr");
    const div_1= document.createElement("div");
    div_1.setAttribute("class", "meaning-section");

    const p= document.createElement("p");
    p.innerHTML= "Meaning";

    const ul= document.createElement("ul");
    get_meanings(resp , ul, i, j);


    const div_2= document.createElement("div");
    div_2.setAttribute("class", "extras-section");
    const syn_div= document.createElement("div");
    syn_div.setAttribute("class", "synonyms");
    const ant_div= document.createElement("div");
    ant_div.setAttribute("class", "antonyms");
    const h4= document.createElement("h4");
    const p_syn= document.createElement("p");
    const h4_ant= document.createElement("h4");
    const p_ant= document.createElement("p");
    get_syn_ant(resp, i, j, h4, p_syn, h4_ant, p_ant, syn_div, ant_div);


    section_2.appendChild(h3);
    section_2.appendChild(hr);

    div_1.appendChild(p);
    div_1.appendChild(ul);

    syn_div.appendChild(h4);
    syn_div.appendChild(p_syn);
    ant_div.appendChild(h4_ant);
    ant_div.appendChild(p_ant);

    div_2.appendChild(syn_div);
    div_2.appendChild(ant_div);

    section.appendChild(section_2);
    section.appendChild(div_1);
    section.appendChild(div_2);

    main.appendChild(section);
}

export default elm_fact;