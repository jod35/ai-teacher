from flask import Blueprint,render_template,request,jsonify
from main import load_text




server_bp = Blueprint('server',__name__,template_folder='./templates')


@server_bp.get('/')
def index():
    return render_template('index.html')


@server_bp.post('/')
def submit_and_summarize_text():
    data = request.get_json()

    output = load_text(data.get('text'))

    return jsonify({"summarizedText":output})
