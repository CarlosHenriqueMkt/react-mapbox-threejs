FROM node:18.16.0-alpine3.17 as builder

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY .deployment/script ./script

RUN ./script/post_install.sh

COPY ./.env ./.env

COPY ./ ./

RUN npm run build

#############################

FROM nginx:alpine

# Copy config nginx
COPY --from=builder /usr/app/.deployment/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /usr/app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 80