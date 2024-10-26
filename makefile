create-image: 
	@docker build -t docker_postgres_node_express_ts .

dev:
	@docker compose watch

down:
	@docker compose down


