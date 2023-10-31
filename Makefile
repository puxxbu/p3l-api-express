postgres:
	docker run --name postgres16 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16beta1

createdb:
	docker exec -t postgres16 createdb --username=root --owner=root express_pzn

dropdb:
	docker exec -t postgres16 dropdb express_pzn

dbseed:
	npx prisma db seed

dbmigratecheck:
	npx prisma migrate dev --create-only

dbmigrate:
	npx prisma migrate dev

dbup:
	npx prisma db push

azure:
	psql "--host=gah-p3l.postgres.database.azure.com" "--port=5432" "--dbname=db_gah" "--username=puxxbu"





.PHONY: postgres createdb dropdb dbseed dbup dbmigratecheck dbmigrate