# --------------------
# Build stage
# --------------------
FROM node:24 AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

# IMPORTANT: legacy-peer-deps (NOT npm ci)
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build


# --------------------
# Runtime stage
# --------------------
FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
