FROM ubuntu:focal

MAINTAINER Agnieszka Kęsik (aga.kesik.dev@gmail.com)

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update -y && apt install -y xz-utils && \
sudo mkdir -p /usr/local/lib/nodejs && \
wget -O - https://nodejs.org/dist/v14.17.0/node-v14.17.0-linux-x64.tar.xz | tar xJf - -C /usr/local/lib/nodejs && \
echo "export PATH=/usr/local/lib/nodejs/node-v14.17.0-linux-x64/bin:$PATH" >> ~/.profile && \
. ~/.profile && \
echo "Test node version: $(node -v)" && \
echo "Test npm version: $(npm -v)" && \
npm install --global yarn && \
echo "Test yarn version: $(yarn -v)"

COPY build/ /

RUN yarn install

ENTRYPOINT ["yarn","start"]