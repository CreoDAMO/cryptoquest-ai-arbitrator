# CryptoQuest AI Arbitrator
CryptoQuest AI Arbitrator is an advanced trading tool designed for crypto arbitrage across multiple chains and exchanges. This application leverages cutting-edge web technologies, including React, Three.js, D3.js, and Next.js, for seamless user experience and dynamic trading flow visualization.
---
## Features
- **3D Trading Visualization**: Interactive visual representation of trading flows using Three.js and react-three-fiber.
- **Dynamic Data Charts**: Trading volume and arbitrage opportunity insights with D3.js.
- **Blockchain Integration**: Real-time Ethereum blockchain data using Ethers.js.
- **Error Handling**: Robust `ErrorBoundary` implementation.
- **Lazy Loading**: Efficient performance with dynamic component loading using `React.lazy` and `Suspense`.
- **Server-Side Rendering (SSR)**: Optimized SEO and initial page rendering with Next.js.
- **E2E Testing**: Comprehensive Cypress tests to ensure reliability.
---
## File Structure
```
/src
/config
api.js # Centralized API configuration
/hooks
useWeb3.js # Custom hook for blockchain interaction
/components
ErrorBoundary.js # Global error boundary component
LoadingSpinner.js # Reusable loading spinner
TradingFlowVisualization.js # 3D visualization
TradingVolumeChart.js # D3.js data chart
/pages
index.js # Main page with SSR
ErrorBoundaryTest.js # Simulated error page for testing
/integration
app.spec.js # Cypress test for app functionality
errorBoundary.spec.js # Cypress test for error boundary
web3.spec.js # Cypress test for Web3 interactions
botConfig.spec.js # Cypress test for bot configuration
```
---
## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Make](https://www.gnu.org/software/make/)
---
## Setup
1. Clone the repository:
```bash
git clone https://github.com/your-username/cryptoquest-ai-arbitrator.git
cd cryptoquest-ai-arbitrator
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
REACT_APP_INFURA_PROJECT_ID=your-infura-project-id
REACT_APP_BACKEND_API_URL=your-backend-api-url
REACT_APP_STAKING_CONTRACT_ADDRESS=
REACT_APP_MARKETPLACE_CONTRACT_ADDRESS=
REACT_APP_DAO_CONTRACT_ADDRESS=
REACT_APP_MATIC_CQT_PAIR_ADDRESS=0x0b3cd8a843defdf01564a0342a89ba06c4fc9394
REACT_APP_WBTC_CQT_PAIR_ADDRESS=0x9a8994d7da7bf54d120943dec46deea79bb0f592
REACT_APP_WETH_CQT_PAIR_ADDRESS=0xb1e0b26f550203fab31a0d9c1eb4ffe330bfe4d0

```
---
## Usage
### Development Server
To run the app locally:
```bash
make dev
```
### Build for Production
To create a production build:
```bash
make build
```
### Run E2E Tests
To execute Cypress tests:
```bash
make test
```
### Clean Workspace
To remove build files:
```bash
make clean
```
---
## Makefile
```makefile
# Makefile for CryptoQuest AI Arbitrator

# Variables
APP_NAME := cryptoquest-ai-arbitrator
BUILD_DIR := build

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
	@if [ ! -f .env ]; then echo ".env file not found!"; exit 1; fi

.PHONY: dev
dev: env-check
	@echo "Starting development server..."
	npm run dev

.PHONY: build
build: env-check
	@echo "Building for production..."
	npm run build

.PHONY: test
test:
	@echo "Running Cypress tests..."
	npx cypress run

.PHONY: test-headless
test-headless:
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
	docker build -t $(APP_NAME) .

.PHONY: docker-run
docker-run:
	@echo "Running Docker container..."
	docker run -p 3000:3000 --env-file .env $(APP_NAME)
```
---
## Testing
Run tests to verify application functionality:
```bash
make test
```
To debug tests interactively, use:
```bash
npx cypress open
```
---
## Contributions
Contributions are welcome! Please fork the repository and create a pull request for any changes.
---
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
---
### Key Highlights of the Makefile
- **`dev`**: Runs the development server (`npm run dev`).
- **`build`**: Creates a production build (`npm run build`).
- **`test`**: Executes Cypress E2E tests (`npx cypress run`).
- **`clean`**: Removes the build directory (`rm -rf build`).
- **`lint`**: Runs linting checks using ESLint.
