const form = document.querySelector("#summary-form");
const sourceTextInput = document.getElementById("sourceTextInput");
const resultTextInput = document.querySelector("#summarizedText");
const resetButton = document.querySelector("#resetButton");
const paraphraseButton = document.querySelector("#paraphrase-btn");
const copyButton = document.querySelector("#copy-btn");
const sourceLengthText = document.getElementById("source_text_len");
const resultTextLength = document.getElementById("result_text_len");
const loadingGif = document.querySelector(".loading");

let sourceLength = 0;
let resultLength = 0;

sourceLengthText.innerText = `${sourceLength} characters`;
resultTextLength.innerText = `${resultLength} characters`;

//summarize the text using AJAX
const summarizeText = async (text, type) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, type }),
  };

  const response = await fetch("/", requestOptions);

  const responseText = await response.json();

  resultTextInput.textContent = responseText.summarizedText;
  loadingGif.style.visibility = "hidden";
  paraphraseButton.style.visibility = "visible";
  copyButton.style.visibility = "visible";

  resultTextLength.innerText = `${responseText.length} characters`;
};

//handle source text input (capture source text length on input)
const handleSourceTextInput = () => {
  sourceLengthText.innerText = `${sourceTextInput.value.length} characters`;
};

//handle source text form
const submitFormtoServer = (event) => {
  loadingGif.style.visibility = "visible";
  let formData = new FormData(form);

  let sourceText = formData.get("source");

  let summaryType = formData.get("summary_type");

  summarizeText(sourceText, summaryType);

  event.preventDefault();
};

//reset input and output forms
const resetFormAndOutput = () => {
  form.reset();
  resultTextInput.textContent = "";
  resultTextLength.innerText = `${0} characters`;
  sourceLengthText.innerText = `${0} characters`;

  paraphraseButton.style.visibility = "hidden";
  copyButton.style.visibility = "hidden";
};

// copy text
const copyText = async () => {
  try {
    await navigator.clipboard.writeText(resultTextInput.value);

    alert("Text copied");
  } catch (error) {
    console.log(error);
  }
};

// paraphrase summarized text
const paraphraseText = async () => {
  console.log("paraphrase")
  console.log({text:resultTextInput.value})
  const response = await fetch("/paraphrase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: resultTextInput.value }),
  });

  const data = await response.json();
  console.log(data)

  resultTextInput.value = data.summarized_text; 
};

// send text to server
form.addEventListener("submit", submitFormtoServer);

// reset values
resetButton.addEventListener("click", resetFormAndOutput);

// handle source text summarization
sourceTextInput.addEventListener("input", handleSourceTextInput);

// copy text
copyButton.addEventListener("click", copyText);

//paraphrase text
paraphraseButton.addEventListener("click", paraphraseText);
