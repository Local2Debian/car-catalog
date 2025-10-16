# base
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# prod-deps
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# builder
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# runner
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.output /app

EXPOSE 3000

# Устанавливаем netcat для проверки Redis
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Создаем скрипт запуска
RUN echo '#!/bin/bash\n\
echo "Waiting for Redis to be ready..."\n\
while ! nc -z redis 6379; do\n\
  sleep 1\n\
done\n\
echo "Redis is ready!"\n\
\n\
echo "Running parser..."\n\
npx tsx scripts/sync-carquery.ts\n\
\n\
echo "Starting application..."\n\
node ./server/index.mjs\n\
' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]