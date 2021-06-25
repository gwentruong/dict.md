import subprocess
from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI()

@app.get("/", response_class=PlainTextResponse)
async def main():
    return "Hello World"

@app.get("/md", response_class=PlainTextResponse)
async def dick_md():
    f = open('./test/words-result.md', 'r')
    content = f.read()
    return content

# result = subprocess.run(['dick', './test/words.txt'], stdout=subprocess.PIPE)