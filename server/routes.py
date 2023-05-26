from flask import Blueprint,render_template,request,jsonify
from utils.ai.summarization import summarize_text_with_large_cnn,summarize_with_scrapy
from utils.ai.paraphrasing import paraphraser



server_bp = Blueprint('server',__name__,template_folder='./templates',
                      static_folder="static",static_url_path="/server/static")


@server_bp.get('/')
def index():
    return render_template('index.html')


@server_bp.post('/')
def submit_and_summarize_text():
    data = request.get_json()
    summary_type = data.get('type')
    print(summary_type)
    
    text = data.get('text')

    output = summarize_with_scrapy(text) if summary_type == "basic" else summarize_text_with_large_cnn(text)

    return jsonify({"summarizedText":output,"length":len(output)})

@server_bp.post('/paraphrase')
def paraphrase_text():

    data = request.get_json()

    text = data.get('text')
    summary_text = paraphraser(text)    
    return jsonify({"summarized_text":summary_text[0]})
