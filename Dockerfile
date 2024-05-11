FROM node:20
COPY package.json yarn.lock ./
RUN yarn
RUN yarn global add serve
COPY . .
RUN yarn build