FROM node:gallium-alpine

LABEL maintainer="GEOlab<http://www.geolab.polimi.it/>" \
      name="geo-collector-bot-pam-middleware" \
      description="Middleware between Insubriparks Geo Collector Bot and SUPSI PAM"

ENV NODE_ENV=production
ENV PATH="${PATH}:/home/node/node_modules/.bin/"

WORKDIR /home/node

COPY package.json ./
COPY .yarn ./.yarn
COPY yarn.lock ./
COPY .yarnrc.yml ./

RUN corepack enable
RUN yarn install --immutable

COPY src ./src
COPY tsconfig.json ./tsconfig.json

RUN yarn build

RUN echo "geo-collector-bot-pam-middleware: $COMMIT_SHA" >> ./commit.sha

USER node

CMD node --unhandled-rejections=strict build/index.js
