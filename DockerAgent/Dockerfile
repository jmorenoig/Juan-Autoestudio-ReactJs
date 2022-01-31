FROM node:12-alpine3.12 as build

RUN  apk update \
  && apk upgrade \
  && apk add ca-certificates \
  && update-ca-certificates \
  && apk add --update coreutils && rm -rf /var/cache/apk/*   \ 
  && apk add --update openjdk11 tzdata curl unzip bash \
  && apk add --no-cache nss \
  && rm -rf /var/cache/apk/*

RUN curl -s -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.5.0.2216-linux.zip -o sonarscanner.zip \
  && unzip -qq sonarscanner.zip \
  && rm -rf sonarscanner.zip \
  && mkdir -p /root/.sonar/native-sonar-scanner \
  && mv  sonar-scanner-4.5.0.2216-linux /root/.sonar/native-sonar-scanner



COPY . .
