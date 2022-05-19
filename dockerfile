FROM node:18-slim
LABEL maintainer "Alan Lira <alan.lira08@gmail.com>"
WORKDIR /home/node/app
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT
COPY package.json .eslintrc.json ./
RUN npm install --no-optional && npm cache clean --force
WORKDIR /home/node/app/api
CMD npm run start