# FightCore - Frontend

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=FightCore_Frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=FightCore_Frontend)
[![Build Status](https://travis-ci.com/FightCore/Frontend.svg?branch=master)](https://travis-ci.com/FightCore/Frontend)

FightCore is an information sharing platform for the Fighting Game community.
FightCore is set up from the group to support the `Super Smash Bros.` games but
will add support for more titles later down the line.

Posts are made in the Markdown format and are converted to HTML locally.
The Markdown is not parsed but instead we rely on the developer to implement this.
There is an on-website text editor that can be used to write markdown. It
features a side-by-side preview, shortcuts and much more. Yet because of the
nature of text-editors and IDEs, we recommend using `Visual Studio Code` instead.

## Docker

Deployment can be done with the included `Dockerfile`
or using the container from our [repository](https://hub.docker.com/r/fightcore/frontend).

To build and run the container locally use the following commands:

```bash
docker build -t CONTAINERNAME .

docker run -d -p 80:80 CONTAINERNAME
```

## Stack

FightCore is build using **Angular 8**, **Angular Material**, **Travis** and **Docker**.

## Other repositories

For the API to perform the CRUD actions and the UI designs made are in different
repositories.

[FightCore/Backend](https://github.com/fightcore/backend)

[FightCore/Documentation](https://github.com/fightcore/documentation)
