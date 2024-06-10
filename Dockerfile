FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

# Aumentar o timeout do npm
RUN npm set fetch-retry-maxtimeout 120000
RUN npm set fetch-retry-mintimeout 20000


RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/delivery-front/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
