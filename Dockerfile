FROM node:14 as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run prod

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/ngnix.conf

COPY --from=build /app/dist/HNStories/ /usr/share/nginx/html
