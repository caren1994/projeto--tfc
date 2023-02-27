FROM node:16.14-alpine
# Usar a imagem node:16.14-alpine como base
WORKDIR /app-backend
# Mudar para o diretório de trabalho /app-backend
COPY package*.json /app-backend/
# Copiar os package.json e package-lock.json para o container
RUN  npm install
# Instalar as dependências Node
COPY . /app-backend/
# Copiar o restante dos arquivos da aplicação para o container
EXPOSE 3001
# Sinalize que aplicação expõe a porta 3001
ENTRYPOINT [ "npm","run" ]
CMD [ "dev" ]
# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
# Dica: Leia a seção Docker e Docker-compose no README para mais informações