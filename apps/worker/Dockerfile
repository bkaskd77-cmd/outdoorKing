FROM node:24-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@12.14.0 --activate

FROM base AS pruner
WORKDIR /repo
RUN npm i -g turbo@2.11.9
COPY . .
RUN turbo prune worker --docker

FROM base AS installer
WORKDIR /repo
COPY --from=pruner /repo/out/json/ .
COPY --from=pruner /repo/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
COPY --from=pruner /repo/out/full/ .
ENV SKIP_ENV_VALIDATION=1
WORKDIR /repo/apps/worker
CMD ["pnpm", "start"]
