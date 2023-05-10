```bash
cp .env.example .env
docker compose up -d --build
docker compose exec node pnpm i --frozen-lockfile
docker compose exec node pnpm run build
```
