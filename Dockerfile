FROM node:21-alpine3.18 as builder

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

WORKDIR /app

RUN mkdir /app/tmp

COPY package.json pnpm-lock.yaml ./

RUN apk add --no-cache \
      nss \
      git \
      freetype \
      harfbuzz \
      ca-certificates \
      libpq-dev \
      g++ \
      make \
      python3 \
      ttf-freefont

COPY . .
RUN pnpm i
RUN pnpm build

#Etapa de producción
FROM builder as deploy

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --production
CMD ["npm", "start"]