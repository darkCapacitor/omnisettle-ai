# OmniSettle AI

A high-performance, polyglot Micro-Frontend (MFE) and Microservices platform designed for global fintech compliance. This project showcases the orchestration of multiple frameworks and languages into a single, cohesive AI-driven ecosystem.

## 🏗️ Architecture Overview

The system is built on a distributed architecture using modern communication protocols and reactive state management:

- **Frontend (Micro-Frontends):**
  - **Angular 21 Shell:** The host application using **Signals** for zoneless reactivity and AOT compilation.
  - **React 19 Remote:** A high-interaction "AI Advisor" module loaded dynamically via **Vite Module Federation**.
- **Backend (Polyglot Microservices):**
  - **Gateway (.NET 10):** The primary entry point for the UI, handling REST orchestration and acting as a **gRPC Client**.
  - **AI Engine (Java 21 / Spring Boot 3.5):** The intelligence layer using **Spring AI** to interface with Gemini 2.0, acting as a **gRPC Server**.
- **Communication:**
  - **gRPC:** Binary, contract-first communication between .NET and Java services.
  - **Vite ESM Bridge:** Native browser loading for Micro-Frontend integration.

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Shell UI** | Angular 21 (vNext), Signals, Tailwind CSS 4.0 |
| **Remote UI** | React 19, Vite, Module Federation |
| **API Gateway** | .NET 10, gRPC Client, CORS Policy |
| **AI Intelligence** | Java 21, Spring Boot 3.5, Spring AI, gRPC Server |
| **LLM Model** | Gemini 2.0 Flash (Google AI Studio) |
| **Design System** | Shared Tailwind CSS 4.1 configurations |

## 🚦 System Ports Mapping

| Service | Port | URL |
|---|---|---|
| **Angular Shell** | 4200 | `http://localhost:4200` |
| **React Remote** | 4300 | `http://localhost:4300` |
| **.NET Gateway** | 5000 | `http://localhost:5000` |
| **Java AI Engine** | 8080 | `http://localhost:8080` (Web) / 9090 (gRPC) |

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v22+)
- .NET 10 SDK
- Java 21 JDK
- Google AI Studio API Key (for Gemini integration)

### 2. Running the Java AI Engine
```powershell
cd services/ai-engine-java
./mvnw clean compile
./mvnw spring-boot:run
```

### 3. Running the .NET Gateway
```powershell
cd services/gateway-dotnet
dotnet build
dotnet run
```

### 4. Running the React Remote (MFE)
Vite Federation requires a production build to generate the `remoteEntry.js` manifest.
```powershell
cd apps/remote-advisor
npm install
npm run build
npx vite preview --port 4300 --cors
```

### 5. Running the Angular Shell
```powershell
cd apps/shell-angular
npm install
ng serve
```

## 📈 Key Features

- **Contract-First Design:** Both backends are synchronized using a shared `.proto` file in the `shared/proto` directory.
- **Zoneless Reactivity:** The Angular Shell leverages the latest Signal APIs to eliminate Zone.js overhead.
- **Resilient MFE Loading:** Implements a custom "React-in-Angular" bridge that handles dynamic ESM imports and unmounting of React roots to prevent memory leaks.
- **Polyglot Orchestration:** Demonstrates cross-language gRPC communication with HTTP/2 unencrypted support for local development.
- **Modern CSS Pipeline:** Uses Tailwind 4.0's "CSS-First" architecture with PostCSS 8 integration.

## 📝 Architecture Decision Records (ADR)
Detailed logs of technical challenges encountered (CORS, gRPC Handshakes, Signal Injection Context) and their resolutions can be found in the `JOURNAL.md` file.
