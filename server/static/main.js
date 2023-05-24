const form = document.querySelector('#summary-form');
const sourceTextInput = document.getElementById('sourceTextInput');
const resultTextInput = document.querySelector("#summarizedText");
const resetButton = document.querySelector("#resetButton");
const sourceLengthText = document.getElementById("source_text_len");
const resultTextLength = document.getElementById("result_text_len");

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

    const responseText = await response.json();

    console.log(responseText)
    resultTextInput.textContent = responseText.summarizedText;
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




//handle events
form.addEventListener('submit',submitFormtoServer);

resetButton.addEventListener('click',resetFormAndOutput);

sourceTextInput.addEventListener('input',handleSourceTextInput);

console.log(form)