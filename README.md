# Dict.md
### UI for batch words lookup program

Lookup CLI tool powered by [dick](https://github.com/lambdalainen/dick/)

### Requirements

__Created by Create-React-App and FastAPI__

* node
* Python > 3.7
* virtualenv
* [dick](https://github.com/lambdalainen/dick/)

### Install

**Front end on localhost:3000**
```
npm install
npm start
```

**Backend on localhost:8000**

[dick](https://github.com/lambdalainen/dick/) should be installed in prior.

```
cd backend
virtualenv dict
source dict/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

 
