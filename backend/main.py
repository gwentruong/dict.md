from fastapi import FastAPI, File, UploadFile
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware

import subprocess
import shutil
import os

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/", response_class=PlainTextResponse)
async def upload_file(file: UploadFile = File(...)):
    with open("words.txt", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    processedFile = subprocess.run(['dick', './words.txt'], stdout=subprocess.PIPE)

    f = open('./words-result.md', 'r')
    content = f.read()
    
    if (os.path.exists("words.txt") and os.path.exists("words.txt")):
        os.remove("words.txt")
        os.remove("words-result.md")
    else:
        print("The file does not exist")

    return content