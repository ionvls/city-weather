FROM node:12.13.0-alpine as builder

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package*.json /app/server/
COPY yarn* /app/server/

# Install dependencies
RUN yarn --production=true

# Copy the server files over
COPY . /app/server/

FROM node:12.13.0-alpine

# Create and set the working directory
RUN mkdir -p /app/server
WORKDIR /app/server

RUN apk update && apk upgrade \
  && apk --no-cache add curl

# Copy the server from the build container
COPY --from=builder /app/server /app/server

CMD ["node", "server.js"]
