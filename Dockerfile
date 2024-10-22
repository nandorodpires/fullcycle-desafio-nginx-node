FROM node:18-alpine

WORKDIR /app

# Copia o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta
EXPOSE 3000

CMD ["node", "src/index.js"]
