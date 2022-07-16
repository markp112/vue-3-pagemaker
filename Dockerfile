# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./

# RUN yarn install
# COPY . .
# RUN npm run build

# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;" ]

FROM nginx:latest
COPY ./openshift/nginx.conf /etc/nginx/nginx.conf

WORKDIR /code
COPY ./dist .

EXPOSE 8080:8080

CMD ["nginx", "-g", "daemon off;"]