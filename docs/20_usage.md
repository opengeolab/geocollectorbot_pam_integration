# Usage

## Run with Docker Compose

The Dashboard can be integrated into the [Geo Collector Bot](https://github.com/opengeolab/geocollectorbot) architecture thanks to [Docker](https://www.docker.com/) modularity.  
[Docker Compose](https://docs.docker.com/compose/) allows to define and run all the Docker containers that compose the application:
 - Geo Collector Bot (the Telegram BOT to collect geodata)
 - PostgreSQL (the database where the data are stored)
 - Dashboard (the web application to manage the data)
 - Nginx (the reverse proxy)

### Run

```bash
docker-compose up -d
```
The Dashboard is avaliable at the url: `http://<hostname or hostip>:8080/InsubriParks_Dashboard`

### Reverse Proxy

NGINX can be used as reverse proxy in order to expose both the Dashboard and the BOT on the same http/https port.  
Enabling the reverse proxy, the Dashboard is also avaliable at the url: `http://<hostname or hostip>/InsubriParks_Dashboard`
