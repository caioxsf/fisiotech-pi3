ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

# Instala dependências com cache
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Copia os arquivos com root
COPY . .

# Cria pasta de upload com permissões adequadas
RUN mkdir -p public/img/paciente

# Só agora troca para o usuário 'node'
USER node

EXPOSE 2525

# Usa array no CMD pra evitar erro de sinal (aviso que o log mostrou)
CMD ["npm", "start"]
