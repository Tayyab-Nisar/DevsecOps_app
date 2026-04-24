# Stage 1: build
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

# Stage 2: runtime
FROM node:18-alpine

WORKDIR /app

# Create non-root user in THIS stage
RUN addgroup -S work && adduser -S work -G work

# Copy files from builder
COPY --from=builder /app ./

# Fix ownership
RUN chown -R work:work /app

USER work

CMD ["node", "server.js"]
