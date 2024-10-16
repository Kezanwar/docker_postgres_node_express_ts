create-image: 
	@docker build -t docker_postgres_node_express_ts .

up:
	@docker compose up -d

down:
	@docker compose down