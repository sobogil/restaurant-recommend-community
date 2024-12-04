FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "app.js"] 