# Dockerfile
FROM node:18-alpine

# Dossier de travail
WORKDIR /usr/src/app

# On copie d'abord package.json & package-lock.json
COPY package*.json ./

# On installe les dépendances
RUN npm install --production

# On copie le reste du code
COPY . .

# Port exposé (doit correspondre à celui de votre app.js et de docker-compose)
EXPOSE ${PORT}

# Commande de lancement
CMD ["node", "src/app.js"]
