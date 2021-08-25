FROM python:3.8

WORKDIR /app

COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . ./

CMD uvicorn --host 0.0.0.0 service:app
