const form = document.querySelector('#summary-form');
const sourceTextInput = document.getElementById('sourceTextInput');
const resultTextInput = document.querySelector("#summarizedText");
const resetButton = document.querySelector("#resetButton");
const paraphraseButton = document.querySelector("#paraphrase-btn");
const copyButton = document.querySelector("#copy-btn");
const sourceLengthText = document.getElementById("source_text_len");
const resultTextLength = document.getElementById("result_text_len");
const loadingGif = document.querySelector('.loading');

let sourceLength = 0;
let resultLength = 0;

sourceLengthText.innerText = `${sourceLength} characters`;
resultTextLength.innerText = `${resultLength} characters`;

//summarize the text using AJAX
const summarizeText = async (text)=>{
    const requestOptions = {
        method : "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({text})
    }

    const response = await fetch('/',requestOptions);
    loadingGif.style.visibility = 'visible';

    const responseText = await response.json();

    resultTextInput.textContent = responseText.summarizedText;
    loadingGif.style.visibility = 'hidden';

    resultTextLength.innerText = `${responseText.length} characters`;

}


//handle source text input (capture source text length on input)
const handleSourceTextInput = ()=>{
    sourceLengthText.innerText = `${sourceTextInput.value.length} characters`;

}

//handle source text form
const submitFormtoServer = (event)=>{
    let formData = new FormData(form);
    let sourceText = formData.get('source');


    summarizeText(sourceText)

    event.preventDefault();
}


//reset input and output forms
const resetFormAndOutput = ()=>{
    form.reset();
    resultTextInput.textContent="";
    resultTextLength.innerText = `${0} characters`;
    sourceLengthText.innerText = `${0} characters`;
}

// copy text
const copyText = async ()=>{
    try{
        await navigator.clipboard.writeText(resultTextInput.value);

        alert("Text copied")
    }
    catch(error){
        console.log(error)
    }
}



// send text to server
form.addEventListener('submit',submitFormtoServer);

// reset values
resetButton.addEventListener('click',resetFormAndOutput);

// handle source text summarization
sourceTextInput.addEventListener('input',handleSourceTextInput);

// copy text
copyButton.addEventListener('click',copyText);
