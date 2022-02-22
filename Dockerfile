FROM node:12 as BUILD_IMAGE
ENV NODE_OPTIONS=--max_old_space_size=4096
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn config set registry https://registry.npm.taobao.org && yarn global add typescript && yarn
COPY . .
RUN yarn build

FROM node:12-alpine
WORKDIR /usr/src/app
RUN mkdir /etc/authing-wechat-official-account
COPY ./version.txt ./version.txt
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/dist ./
ENV NODE_ENV=prod 
CMD [ "node", "main.js" ]
