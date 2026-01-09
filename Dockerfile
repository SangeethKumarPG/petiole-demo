# ---------------------------
# Build stage
# ---------------------------
FROM node:24 AS builder

WORKDIR /app

# Copy only dependency files first (better caching)
COPY package.json package-lock.json* ./

# Install dependencies (legacy peer deps)
RUN npm install --legacy-peer-deps

# Copy the rest of the project (Next.js + Sanity)
COPY . .

# Build Next.js app
RUN npm run build


# ---------------------------
# Runtime stage
# ---------------------------
FROM node:24-alpine

WORKDIR /app

# Copy standalone output (Next.js 15)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose Next.js port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
