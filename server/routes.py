from flask import Blueprint,render_template,request,jsonify
from main import summarize_text_with_large_cnn,summarize_with_scrapy




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
