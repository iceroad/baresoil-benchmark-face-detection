FROM ubuntu:xenial
MAINTAINER contact@iceroad.io
RUN \
  apt-get update && \
  apt-get upgrade -y && \
  apt-get install -y --fix-missing \
    build-essential \
    curl \
    cmake \
    gfortran \
    git \
    graphicsmagick \
    imagemagick \
    libgraphicsmagick1-dev \
    libatlas-dev \
    libavcodec-dev \
    libavformat-dev \
    libboost-all-dev \
    libgtk2.0-dev \
    libjpeg-dev \
    liblapack-dev \
    libswscale-dev \
    npm \
    poppler-utils \
    pkg-config \
    python python-dev pypy virtualenv python-pip python3-pip \
    python3-dev \
    python3-numpy \
    software-properties-common \
    tesseract-ocr \
    wget \
    zip \
    && \
  pip install --upgrade pip && \
  pip install --verbose face_recognition Pillow opencv-python && \
  npm install -g n npm && \
  n latest && \
  cp $(which node) /usr/bin/node-latest && \
  n lts && \
  cp $(which node) /usr/bin/node-lts && \
  n stable && \
  cp $(which node) /usr/bin/node-stable && \
  adduser --gecos sandbox --no-create-home --disabled-password --disabled-login --shell /bin/false sandbox && \
  apt-get autoremove -y && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*
