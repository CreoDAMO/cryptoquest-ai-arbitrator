# Makefile for CryptoQuest AI Arbitrator

# Variables
APP_NAME := cryptoquest-ai-arbitrator
BUILD_DIR := build
DOCKER_IMAGE := $(APP_NAME):latest

# Commands
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make dev            - Start development server"
	@echo "  make build          - Build for production"
	@echo "  make test           - Run Cypress tests"
	@echo "  make test-headless  - Run Cypress tests in headless mode"
	@echo "  make clean          - Remove build files"
	@echo "  make lint           - Run linting checks"
	@echo "  make format         - Format code using Prettier"
	@echo "  make check-format   - Check code formatting"
	@echo "  make env-check      - Verify .env file is present"
	@echo "  make docker-build   - Build Docker image"
	@echo "  make docker-run     - Run Docker container"

.PHONY: env-check
env-check:
	@echo "Checking environment variables..."
	@if [ ! -f .env ]; then echo "Error: .env file not found!"; exit 1; fi

.PHONY: dev
dev: env-check
	@echo "Starting development server..."
	npm run dev

.PHONY: build
build: env-check
	@echo "Building for production..."
	npm run build

.PHONY: test
test: env-check
	@echo "Running Cypress tests..."
	npx cypress run

.PHONY: test-headless
test-headless: env-check
	@echo "Running Cypress tests in headless mode..."
	npx cypress run --headless --browser chrome

.PHONY: clean
clean:
	@echo "Cleaning build files..."
	rm -rf $(BUILD_DIR)

.PHONY: lint
lint:
	@echo "Running linting checks..."
	npx eslint src/

.PHONY: format
format:
	@echo "Formatting code with Prettier..."
	npx prettier --write .

.PHONY: check-format
check-format:
	@echo "Checking code formatting..."
	npx prettier --check .

.PHONY: docker-build
docker-build:
	@echo "Building Docker image..."
	docker build -t $(DOCKER_IMAGE) .

.PHONY: docker-run
docker-run: docker-build
	@echo "Running Docker container..."
	docker run -p 3000:3000 --env-file .env $(DOCKER_IMAGE)

