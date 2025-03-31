from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)


openai_api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=openai_api_key)

conversations = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        conversation_id = data.get('conversationID', 'default')

        if conversation_id not in conversations:
            conversations[conversation_id] = [
                {"role": "system", "content": open('system_prompt.txt', 'r').read()}
            ]

        conversations[conversation_id].append({"role": "user", "content": user_message})


        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=conversations[conversation_id]
        )
        
        response = response.choices[0].message.content

        conversations[conversation_id].append({"role": "assistant", "content": response})

        return jsonify({
            'response': response
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            'error': 'Failed to process message',
            'details': str(e)
        }), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({
        'status': 'ok',
        'message': 'Chatbot server is running'
    })

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 8000))
    app.run(debug=True, port=port) 