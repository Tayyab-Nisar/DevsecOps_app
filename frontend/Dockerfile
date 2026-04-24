# Stage 1: build
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2: runtime
FROM nginx:alpine

# Create non-root user
RUN addgroup -S work && adduser -S work -G work

# Fix Nginx required directories
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx \
    && chown -R work:work /var/cache/nginx /var/run /var/log/nginx

# Copy custom config (must use 8080)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

# Fix permissions
RUN chown -R work:work /usr/share/nginx/html

# Switch to non-root
USER work

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
