ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

# Instala dependências com cache
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Copia arquivos com root
COPY . .

# Cria pasta de upload e dá permissão só nela
RUN mkdir -p public/img/paciente && chown -R node:node public/img/paciente

# Troca pro usuário não-root
USER node

EXPOSE 2525

CMD ["npm", "start"]
