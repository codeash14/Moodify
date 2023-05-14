FROM python:3.7-slim-buster

RUN apt-get update && apt-get install -y --no-install-recommends \
        libgl1-mesa-glx \
        && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install opencv-python-headless

COPY . .

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]