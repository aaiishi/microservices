# 1) Build de l’app React
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2) Serveur statique Nginx
FROM nginx:alpine
# On vire la conf par défaut si besoin
RUN rm /etc/nginx/conf.d/default.conf

# Copie une conf personnalisée (optionnel)
COPY nginx.conf /etc/nginx/conf.d

# On dépose le build dans le dossier servi par Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose le port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
