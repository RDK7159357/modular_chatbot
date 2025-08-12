import requests
from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer
import chromadb
import sys
import re

# --- CONFIGURATION ---
# This is a small, fast, and capable model for creating embeddings.
EMBEDDING_MODEL_NAME = 'all-MiniLM-L6-v2'
# This is the local, file-based vector database. A "db" folder will be created.
PERSISTENT_DB_PATH = "./db"

def crawl(url):
    """Fetches and extracts clean text from a single URL."""
    print(f"Crawling: {url}")
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status() # Raise an exception for bad status codes
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Remove script and style elements
        for script_or_style in soup(["script", "style"]):
            script_or_style.decompose()
        
        # Get text and clean it up
        text = soup.get_text()
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = "\n".join(chunk for chunk in chunks if chunk)
        
        # A simple way to clean up common issues, you might need more complex regex
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    except requests.RequestException as e:
        print(f"Error crawling {url}: {e}")
        return ""

def main(website_url, website_id):
    """Main function to ingest a website's content."""
    print("--- Starting Website Ingestion ---")
    
    raw_text = crawl(website_url)
    if not raw_text:
        print("No text could be extracted. Exiting.")
        return

    print(f"Successfully extracted {len(raw_text)} characters.")
    
    # Simple chunking strategy (split by paragraphs)
    chunks = [chunk for chunk in raw_text.split('\n') if len(chunk.strip()) > 50]
    print(f"Split content into {len(chunks)} chunks.")

    # 1. Load the Embedding Model
    print(f"Loading embedding model: {EMBEDDING_MODEL_NAME}")
    embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)

    # 2. Initialize ChromaDB Client
    print(f"Initializing vector database at: {PERSISTENT_DB_PATH}")
    client = chromadb.PersistentClient(path=PERSISTENT_DB_PATH)
    collection = client.get_or_create_collection(name=website_id)

    # 3. Create Embeddings and Store them
    print("Creating embeddings and storing in the database... This may take a moment.")
    if chunks:
        embeddings = embedding_model.encode(chunks, show_progress_bar=True)
        collection.add(
            embeddings=embeddings,
            documents=chunks,
            ids=[f"chunk_{i}" for i in range(len(chunks))]
        )
        print(f"Successfully added {len(chunks)} documents to the '{website_id}' collection.")
    else:
        print("No suitable chunks found to process.")
        
    print("--- Ingestion Complete ---")

if __name__ == "__main__":
    if len(sys.argv) == 3:
        # Command line usage: python ingest.py <url> <collection_name>
        url_to_ingest = sys.argv[1]
        unique_id = sys.argv[2]  # Already a string from command line
    else:
        # Default usage
        url_to_ingest = "https://iare.ac.in"
        unique_id = "iare_website"
    
    main(url_to_ingest, unique_id)
