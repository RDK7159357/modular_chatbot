# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama
from sentence_transformers import SentenceTransformer
import chromadb

# --- CONFIGURATION ---
EMBEDDING_MODEL_NAME = 'all-MiniLM-L6-v2'
PERSISTENT_DB_PATH = "./db"
LLM_MODEL_NAME = 'llama3:8b' # The Ollama model you're using

# --- INITIALIZATION ---
app = FastAPI()

# Configure CORS to allow requests from our React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # The default port for Vite React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models and DB client at startup for efficiency
try:
    embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)
    db_client = chromadb.PersistentClient(path=PERSISTENT_DB_PATH)
    print("Models and DB client loaded successfully.")
except Exception as e:
    print(f"Error loading models or DB client: {e}")
    # Handle the error appropriately, maybe exit or log
    embedding_model = None
    db_client = None

# --- API DATA MODELS ---
class ChatRequest(BaseModel):
    question: str
    website_id: str

class ChatResponse(BaseModel):
    answer: str

# --- API ENDPOINT ---
@app.post("/api/chat", response_model=ChatResponse)
def chat_with_bot(request: ChatRequest):
    if not all([embedding_model, db_client]):
        return ChatResponse(answer="Server is not ready, models or DB failed to load.")

    print(f"Received question: '{request.question}' for website_id: '{request.website_id}'")

    # 1. Get the relevant collection from the database
    try:
        collection = db_client.get_collection(name=request.website_id)
    except ValueError:
        return ChatResponse(answer=f"Sorry, I don't have any knowledge about '{request.website_id}'.")

    # 2. Create an embedding for the user's question
    question_embedding = embedding_model.encode(request.question).tolist()

    # 3. Query the database to find relevant context
    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=3 # Get the top 3 most relevant chunks
    )
    context_documents = results.get('documents', [])
    if not context_documents:
        return ChatResponse(answer="Sorry, I couldn't find any relevant information to answer your question.")
    
    context = "\n".join(context_documents[0])
    
    # 4. Construct the prompt for the LLM
    prompt = f"""
    You are an expert assistant for the website identified by '{request.website_id}'.
    Using the following context, please answer the user's question.
    If the context does not contain the answer, say "I'm sorry, I couldn't find information about that in my knowledge base."

    Context:
    ---
    {context}
    ---

    User Question: {request.question}
    """

    # 5. Send the prompt to the local LLM via Ollama
    print("Sending prompt to Ollama...")
    try:
        response = ollama.chat(
            model=LLM_MODEL_NAME,
            messages=[{'role': 'system', 'content': prompt}],
            stream=False # For simplicity, we get the whole response at once
        )
        answer = response['message']['content']
    except Exception as e:
        print(f"Error communicating with Ollama: {e}")
        answer = "Sorry, I'm having trouble connecting to my brain right now."

    print(f"LLM Answer: {answer}")
    return ChatResponse(answer=answer)

# cd /Users/ramadugudhanush/Documents/modular-chatbot-project/backend && source venv/bin/activate && python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000