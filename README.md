<div align="center">

<img
src="https://raw.githubusercontent.com/opengeolab/geocollectorbot_pam_integration/main/docs/img/insubri_parks_logo.png"
alt="logo"
/>

# Geo Collector Bot <> PAM integration

</div>

This repo contains a middleware backend service that sends reports collected with 
[Insubriparks GeoCollectorBot](https://t.me/GeoCollectorBot_Insubriparks_bot) to SUPSI integration platform 
[PAM](https://insubripam.eu/).

Moreover, the `.docker` directory contains what's needed to spin up the complete Insubriparks infrastructure with Docker
Compose. The main services involved are:
- [Geo Collector Bot](https://github.com/opengeolab/geocollectorbot)
- Geo Collector Bot <> PAM middleware

To try the system locally, create a `.env` file in `.docker` directory following the example `.example.env` file. Then
simply run:

```shell
docker compose -f .docker/docker-compose.yml up
```

### Contributions

[GEOlab](http://www.geolab.polimi.it/) - Politecnico di Milano (contact: [Daniele Oxoli](mailto:daniele.oxoli@polimi.it))

Developed by G.Z. - GeoDev@[PhDGeomatic](https://github.com/PhDGeomatic)

## License

[MIT](https://opensource.org/licenses/MIT) © [GEOlab](mailto:geolab.como@gmail.com)
