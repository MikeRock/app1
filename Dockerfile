# Rev.1.0
ARG NODE_VERSION="latest"
FROM node:${NODE_VERSION:-latest} AS node
WORKDIR /nodejs
COPY  . /nodejs
RUN npm install 
EXPOSE 8080
CMD ["node_modules/.bin/pm2","start","pm2.json","--watch"]
LABEL "tk.mikerock.rev"="1.0" \
"tk.mikerock.maintainer"="Mike Rock" \
"tk.mikerock.port"="8080"
