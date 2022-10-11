FROM node:16-alpine3.16
WORKDIR /app

RUN apk add --no-cache tini

#COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node . .
VOLUME [ "/app" ]

#USER node
#CMD ["node", "index.js"]
ENTRYPOINT /bin/sh
