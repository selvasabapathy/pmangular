Application structure & steps to build and run
  - a work by Selva Sabapathy. (c) All rights reserved.

1.	Application Structure
  a.	Angular based UI, delivered as a ZIP file
  b.	Spring Boot based API/Service, delivered as a ZIP file & Docker Image
  c.	Pre-requisites
    i.	MySQL should run with database/schema “pm”.
    ii.	Please see application.properties & application-test.properties in resources folder

2.	GitHub
  a.	The entire source is available in GitHub. You can see my work history/commits.
  b.	UI: https://github.com/SelvaSabapathy/pmangular
  c.	API/Service: https://github.com/SelvaSabapathy/pmspringboot

3.	Run the application
  a.	Start the MySQL (I have a MySQL docker container)

    selva@smac ~/dev/cts/s1/pm/service (master) $ docker container start selva-mysql

    selva@smac ~/dev/cts/s1/pm/service (master) $ docker container ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
    47ff50c520cd        mysql:latest        "docker-entrypoint.s…"   3 weeks ago         Up 6 seconds        0.0.0.0:3306->3306/tcp, 33060/tcp   selva-mysql

  b.	Build the docker image of the API/Service (one-time)

    selva@smac ~/dev/cts/s1/pm/service (master) $ docker build -t selvasabapathy/pm-service-1.0 .
    Sending build context to Docker daemon  52.87MB
    Step 1/5 : FROM openjdk:latest
     ---> bbb8034f26b5
    Step 2/5 : COPY target/service-1.0-SNAPSHOT.jar /opt/app/
     ---> 2a36471fce5c
    Step 3/5 : WORKDIR /opt/app
     ---> Running in 2115b773593a
    Removing intermediate container 2115b773593a
     ---> 7da71608caf2
    Step 4/5 : EXPOSE 8080
     ---> Running in 2a95b65a7e4e
    Removing intermediate container 2a95b65a7e4e
     ---> cae7f2bf13a6
    Step 5/5 : CMD java -jar service-1.0-SNAPSHOT.jar
     ---> Running in de12b853a22c
    Removing intermediate container de12b853a22c
     ---> e55e3158fcff
    Successfully built e55e3158fcff
    Successfully tagged selvasabapathy/pm-service-1.0:latest

  c.	Run the API/Service application
    i.	from maven command line (or inside IntelliJ IDEA)

      selva@smac ~/dev/cts/s1/pm/service (master) $ mvn spring-boot:run
      [INFO] Scanning for projects...
      [INFO]
      [INFO] -----------------------< home.sabapathy:service >-----------------------
      [INFO] Building service 1.0-SNAPSHOT
      [INFO] --------------------------------[ jar ]---------------------------------
      [INFO]
      [INFO] >>> spring-boot-maven-plugin:2.2.2.RELEASE:run (default-cli) > test-compile @ service >>>
      ……………….

    ii.	from the built docker image

      selva@smac ~/dev/cts/s1/pm/service (master) $ docker run --network selva-docker-network --name selva-pm-service -p 8080:8080 selvasabapathy/pm-service-1.0

  d.	Build the docker image of the UI (one-time)

    selva@smac ~/dev/cts/s1/pm/ui (master) $ docker build -t selvasabapathy/pm-ui-1.0 .
    …….
    …….
    Successfully built 90d9abaeb0b1
    Successfully tagged selvasabapathy/pm-ui-1.0:latest

  e.	Run the UI application
    i.	from command line (or inside Visual Source Code)

      ng serve -o

    ii.	from the built docker image

      selva@smac ~/dev/cts/s1/pm/ui (master) $ docker run --network selva-docker-network --name selva-pm-ui -v ${PWD}:/app -v /app/node_modules -p 4200:4200 selvasabapathy/pm-ui-1.0

  f.	Open the browser @ http://localhost:4200/
