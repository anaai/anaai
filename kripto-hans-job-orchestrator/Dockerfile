FROM python

WORKDIR app

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . ./

CMD celery -A tasks worker --loglevel=INFO
