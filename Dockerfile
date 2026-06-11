# 1. Update the base image to Node 22 Alpine
FROM node:22-alpine

# 2. Install openssl (Required for Prisma Client to run on Alpine Linux images)
RUN apt-get update && apt-get install -y openssl || apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

# 3. Use 'npm ci' for faster, more reliable container builds

COPY . .

# 4. Generate Prisma Client explicitly for the Alpine environment
RUN npm install

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]