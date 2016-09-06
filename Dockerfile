FROM nodesource/trusty:6.2.0

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN npm install
RUN npm install typings --global
RUN typings install
RUN npm install typescript --global
RUN tsc
COPY . /usr/src/app

EXPOSE 8081

CMD [ "npm", "start" ]