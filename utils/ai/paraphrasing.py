import torch
from transformers import BartForConditionalGeneration, BartTokenizer
import spacy

nlp = spacy.load('en_core_web_sm')

def chop_text(text):

    tokens = nlp(text)

    return tokens.sents

def load_model():

    model = BartForConditionalGeneration.from_pretrained('eugenesiow/bart-paraphrase')
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)

    return model

def paraphraser(text):
    sentences = chop_text(text)

    model = load_model()
    tokenizer = BartTokenizer.from_pretrained('eugenesiow/bart-paraphrase')

    list_ = []

    for sent_ in sentences:
        batch = tokenizer(str(sent_), return_tensors='pt')
        
        generated_ids = model.generate(batch['input_ids'])
        generated_sentence = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)

        list_.append(generated_sentence)

    print(type(list_))

    return list_

