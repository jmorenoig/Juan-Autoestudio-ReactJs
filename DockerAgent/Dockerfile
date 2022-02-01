FROM ubuntu:20.04

# RUN apt install openjdk-11-jdk

# RUN  apk update \
#   && apk upgrade \
#   && apk add ca-certificates \
#   && update-ca-certificates \
#   && apk add --update coreutils && rm -rf /var/cache/apk/*   \ 
#   && apk add --update openjdk11 tzdata curl unzip bash \
#   && apk add --no-cache nss \
#   && rm -rf /var/cache/apk/*

# RUN curl -s -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.5.0.2216-linux.zip -o sonarscanner.zip \
#   && unzip -qq sonarscanner.zip \
#   && rm -rf sonarscanner.zip \
#   && mkdir -p /root/.sonar/native-sonar-scanner \
#   && mv  sonar-scanner-4.5.0.2216-linux /root/.sonar/native-sonar-scanner




RUN wget -q https://repo.jenkins-ci.org/releases/org/jenkins-ci/plugins/swarm-client/3.29/swarm-client-3.29.jar

# RUN mv swarm/swarm-client-3.29.jar /bin/sh
# RUN chmod +x swarm-client-3.29.jar

# RUN mkdir /home/AgentJenkins

# RUN java -jar swarm-client-3.29.jar \
#       -master 'http://localhost:8080' \
#       -name AgentDocker1 \
#       -username jmoreno \
#       -password Jdiiego95 \
#       -workDir /home/AgentJenkins \
#       -executors 1

COPY . .
