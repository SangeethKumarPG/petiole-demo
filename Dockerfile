# ---------- Build stage ----------
FROM node:24-slim AS builder

WORKDIR /app

# Prevent npm from running scripts as root
ENV NPM_CONFIG_IGNORE_SCRIPTS=true

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .
RUN npm run build

# ---------- Runtime stage ----------
FROM node:24-slim

# Create non-root user
RUN groupadd -r nodeapp && useradd -r -g nodeapp nodeapp

WORKDIR /app

# Copy only required build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./

# Drop privileges
USER nodeapp

# Prevent file system writes
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["npm", "start"]
