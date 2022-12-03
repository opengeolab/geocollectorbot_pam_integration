
### Configuration 

Edit the file `.env` and change the environment variables according to the [Geo Collector Bot](https://github.com/opengeolab/geocollectorbot) settings.

```bash
# Database setup
pg_hostname=<host name of PostgreSQL container>
pg_port=<PostgreSQL container port>
# This optional environment variable is used in conjunction with POSTGRES_PASSWORD to set a user and its password.
# This variable will create the specified user with superuser power and a database with the same name.
# If it is not specified, then the default user of postgres will be used.
pg_username=<superuser username>
# This environment variable is required to use the PostgreSQL image. It must not be empty or undefined.
# This variable sets the superuser password for PostgreSQL. The default superuser is defined by the POSTGRES_USER environment variable.
pg_password=<superuser password>
# This optional environment variable can be used to define a different name for the default database that is created when the image is first started.
# If it is not specified, then the value of POSTGRES_USER will be used.
app_database=<PostgreSQL database>
# The username and password of the user created for managing the <app_database>
app_username=<app_user username>
app_password=<app_user password>
# The port where the PostgreSQL is exposed
exposed_pg_port=<port number>

# Dashboard setup
# The home path of the Dashboard. It's used to set the path where the media files (photo, videos, ...) are uploaded (<data_dir>/uploads).
data_dir=<project directory>
# The port where the Dashboard is exposed
exposed_dashboard_port=<port number>
# host name of the geo_collector_bot container that exposes the API to send messages to the users
api_url=<container hostname>
```
