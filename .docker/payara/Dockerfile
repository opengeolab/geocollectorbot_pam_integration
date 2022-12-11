FROM payara/server-full:5.2022.1

ENV PG_HOST ${pg_hostname}
ENV PG_PORT ${pg_port}
ENV PG_DB ${app_database}
ENV PG_USR ${app_username}
ENV PG_PWD ${app_password}

#USER root
#RUN apt-get update && apt-get upgrade -y

USER payara
COPY --chown=payara:payara postgresql-42.5.0.jar ${PAYARA_DIR}/glassfish/domains/domain1/lib/
COPY --chown=payara:payara postgis-geometry-2021.1.0.jar ${PAYARA_DIR}/glassfish/domains/domain1/lib/
COPY --chown=payara:payara postgis-jdbc-2021.1.0.jar ${PAYARA_DIR}/glassfish/domains/domain1/lib/
COPY --chown=payara:payara create_conn_pool.sh ${SCRIPT_DIR}/init_0_create_conn_pool.sh
COPY --chown=payara:payara Test_Docker_InsubriParks.war $DEPLOY_DIR
COPY --chown=payara:payara InsubriParks.war $DEPLOY_DIR
