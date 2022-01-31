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
#RUN sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /bin/sonar-scanner/bin/sonar-scanner
#RUN sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /root/.sonar/native-sonar-scanner/sonar-scanner-4.5.0.2216-linux/bin/sonar-scanner

WORKDIR /React-App
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run test App -- --watchAll=false --coverage --testResultsProcessor jest-sonar-reporter
RUN java -version
RUN sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /root/.sonar/native-sonar-scanner/sonar-scanner-4.5.0.2216-linux/bin/sonar-scanner
# -------Publicar en sonar
# RUN npm run sonar 


FROM nginx:1.19.0-alpine AS prod-stage
COPY --from=build /React-App/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]