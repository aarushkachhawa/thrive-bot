from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:5173", # local dev front end
            "http://localhost:8000", # can access itself
            "https://thrive-bot-production.up.railway.app",  # Production frontend
            "https://thrive-bot-testing.up.railway.app",     # Testing frontend
        ],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})

openai_api_key = os.getenv('OPENAI_API_KEY')
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set")

client = OpenAI(api_key=openai_api_key)

conversations = {}

INITIAL_MESSAGE = "Hello! I'm a chatbot from Thrive that is here to listen and support you. How are you feeling today?"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chatbot', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        conversation_id = data.get('conversationId', 'default')

        # Initialize conversation history if it doesn't exist
        if conversation_id not in conversations:
            conversations[conversation_id] = [
                {"role": "system", "content": "You are a helpful mental health and wellbeing assistant."},
                {"role": "assistant", "content": INITIAL_MESSAGE}
            ]
            # Return initial message for new conversations
            return jsonify({'response': INITIAL_MESSAGE, 'isInitial': True})

        # Add user message to history
        conversations[conversation_id].append({"role": "user", "content": user_message})

        # Get response from OpenAI
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=conversations[conversation_id]
        )

        bot_response = response.choices[0].message.content

        # Add assistant response to history
        conversations[conversation_id].append({"role": "assistant", "content": bot_response})

        return jsonify({'response': bot_response, 'isInitial': False})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            'error': 'Failed to process message',
            'details': str(e)
        }), 500

@app.route('/testchat', methods=['GET'])
def test():
    return jsonify({
        'status': 'ok',
        'message': 'Chatbot server is running',
        'environment': os.environ.get('FLASK_ENV', 'not set')
    })

if __name__ == '__main__':
    #port = int(os.getenv('PORT', 8000))
    #app.run(host='0.0.0.0', port=port) 
    pass