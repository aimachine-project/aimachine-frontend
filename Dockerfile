FROM ubuntu:focal AS stage-frontend

MAINTAINER Agnieszka Kęsik (aga.kesik.dev@gmail.com)

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update -y && apt install -y wget xz-utils && \
mkdir -p /usr/local/lib/nodejs && \
wget -qO - https://nodejs.org/dist/v14.17.0/node-v14.17.0-linux-x64.tar.xz | tar xJf - -C /usr/local/lib/nodejs

ENV PATH=/usr/local/lib/nodejs/node-v14.17.0-linux-x64/bin:$PATH

RUN echo "node version: $(node -v)" && \
echo "npm version: $(npm -v)" && \
npm install --global yarn && \
echo "yarn version: $(yarn -v)"

COPY ./ /

RUN yarn install && \
yarn build

FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update -y && apt install -y wget xz-utils && \
mkdir -p /usr/local/lib/nodejs && \
wget -qO - https://nodejs.org/dist/v14.17.0/node-v14.17.0-linux-x64.tar.xz | tar xJf - -C /usr/local/lib/nodejs

ENV PATH=/usr/local/lib/nodejs/node-v14.17.0-linux-x64/bin:$PATH

COPY --from=stage-frontend build /build

RUN npm install --global serve

CMD ["serve","-s","build","-l","3000"]
