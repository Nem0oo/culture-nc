# --- Stage 1 : build ---
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# --- Stage 2 : runtime (nginx léger) ---
FROM nginx:1.27-alpine AS runtime

ARG SHA=unknown

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo "$SHA" > /usr/share/nginx/html/version.txt

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
