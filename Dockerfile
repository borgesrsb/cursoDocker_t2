# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos do package.json primeiro para cache de build
COPY package*.json ./

# Instala as dependências
RUN npm install

RUN npm install express

# Copia o restante do código
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
