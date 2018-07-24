# Rev.1.0
ARG NODE_VERSION="latest"
FROM node:${NODE_VERSION} AS node
WORKDIR /node
COPY  . /node
RUN npm install 
EXPOSE 8080
CMD ["babel-node","run","server.js"]
LABEL "tk.mikerock.rev"="1.0" \
"tk.mikerock.maintainer"="Mike Rock" \
"tk.mikerock.port"="8080"
