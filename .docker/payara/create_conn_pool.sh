echo '--------------------------------------------------------------------------------------------------------------------'
echo $POSTBOOT_COMMANDS_FINAL
echo 'create-jdbc-connection-pool --datasourceclassname org.postgresql.ds.PGConnectionPoolDataSource --restype javax.sql.ConnectionPoolDataSource --property user=${ENV=PG_USR}:password=${ENV=PG_PWD}:DatabaseName=${ENV=PG_DB}:ServerName=${ENV=PG_HOST}:port=${ENV=PG_PORT} insubriparks-Pool' >> $POSTBOOT_COMMANDS_FINAL
echo 'create-jdbc-resource --connectionpoolid insubriparks-Pool jdbc/insubriparks' >> $POSTBOOT_COMMANDS_FINAL
echo '--------------------------------------------------------------------------------------------------------------------'
