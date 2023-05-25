import torch
from transformers import BartForConditionalGeneration, BartTokenizer

input_sentence = "They were there to enjoy us and they were there to pray for us."


def load_model():

    model = BartForConditionalGeneration.from_pretrained('eugenesiow/bart-paraphrase')
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)

    return model


def tokenize():
    tokenizer = BartTokenizer.from_pretrained('eugenesiow/bart-paraphrase')
    batch = tokenizer(input_sentence, return_tensors='pt')
    
    return tokenizer ,batch

def paraphrase_text():
    model = load_model()
    tokenizer,batch = tokenize()
    
    generated_ids = model.generate(batch['input_ids'])
    generated_sentence = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)

    return generated_sentence

