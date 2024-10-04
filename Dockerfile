# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.0.0
ARG PNPM_VERSION=8.9.2

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

COPY package.json pnpm-lock.yaml ./




FROM base as builder
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build



FROM base as final
ENV NODE_ENV production

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next /app/.next

EXPOSE 3000
CMD pnpm run start
