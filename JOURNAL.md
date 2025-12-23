# Project Journal: OmniSettle AI Architecture & Development

This document serves as an Architecture Decision Record (ADR) and a retrospective of the technical challenges encountered during the construction of the OmniSettle AI platform.

## 🏗️ Architectural Foundations

### The "Why" Behind the Stack
- **Polyglot Backend:** Chosen to leverage .NET's high-throughput for API Gateway duties and Java's superior ecosystem for AI Agent orchestration (LangChain4j/Spring AI).
- **gRPC over REST:** Implemented for internal service-to-service communication to ensure type-safety and reduce latency through binary serialization.
- **Micro-Frontend (MFE):** Adopted to allow specialized AI modules (React) to live within an enterprise governance shell (Angular), proving that different framework lifecycles can coexist.

---

## 🛠️ Log of Technical Challenges & Resolutions

### 1. Environment: Java Versioning Mismatch
- **Issue:** The Java build failed with `Required Java version 17 is not met by current version: 1.8.0`.
- **Context:** System path was defaulting to a legacy JDK used by older enterprise applications.
- **Resolution:** Manually updated `JAVA_HOME` to JDK 21 and prioritized the new bin path. Verified that Spring Boot 3.5+ strictly requires modern Java runtimes for Virtual Threads support.

### 2. Dependency Management: "Empty" Infrastructure
- **Issue:** Spring Boot failed to start due to `Failed to configure a DataSource` and RabbitMQ connection errors.
- **Resolution:** During the prototyping phase, infrastructure was bypassed using the `@SpringBootApplication(exclude = {...})` pattern. 
- **Learning:** Principal engineers must be able to isolate core business logic from infrastructure dependencies to maintain development velocity.

### 3. gRPC: The HTTP/2 Handshake
- **Issue:** .NET Gateway reported `SocketException (10061)` when calling the Java service.
- **Resolution:** 
    - Corrected Java port mapping (moved gRPC from port 8080 to 9090).
    - Enabled `AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true)` in .NET to allow local gRPC calls without SSL certificates.

### 4. Styles: Tailwind v4 PostCSS Transition
- **Issue:** Angular build failed with `tailwindcss directly as a PostCSS plugin is no longer supported`.
- **Context:** Tailwind v4 (2025) moved to a "CSS-First" architecture, separating the core engine from the PostCSS wrapper.
- **Resolution:** Swapped legacy config for `@tailwindcss/postcss` and utilized the new `@import "tailwindcss"` syntax in a pure `.css` file to bypass the Sass deprecation warnings.

### 5. MFE: The ESM Bridge
- **Issue:** Angular Shell could not resolve `importRemote` from the federation plugin at compile-time.
- **Resolution:** Abandoned build-time federation for **Native ESM Runtime Loading**. Used browser-native `import(/* @vite-ignore */ url)` to fetch the React bundle. This decoupled the Angular compiler from the React remote's internal structure.

### 6. Networking: CORS and the "Status 0" Mystery
- **Issue:** Angular API calls to .NET failed with a "Status 0" error.
- **Context:** Status 0 indicates a client-side browser block. It was caused by a combination of missing CORS headers and a 307 Redirect loop triggered by `UseHttpsRedirection`.
- **Resolution:** 
    - Implemented an explicit **CORS Policy** in .NET `Program.cs` to trust `localhost:4200`.
    - Disabled HTTPS redirection for local development to prevent SSL certificate handshake failures on the API layer.

### 7. Reactivity: Signal Injection Context
- **Issue:** `NG0203: effect() can only be used within an injection context`.
- **Resolution:** In Angular 19/21, reactive `effects` must be registered during component initialization. Moved the React-sync logic from an async block to a **Class Field Initializer**.
- **Learning:** Understanding the strict lifecycle requirements of modern reactive primitives is essential for cross-framework state synchronization.

---

## 📈 Key Takeaways

1. **Contract-First Development:** By defining the `.proto` file before writing a single line of backend code, we eliminated "Integration Hell" between the .NET and Java teams.
2. **Standardization:** Using a shared Tailwind configuration and naming conventions across Angular and React ensures a "One Team" design feel despite technical fragmentation.
3. **Resilience:** The "React-in-Angular" bridge includes explicit `unmount()` logic in the `OnDestroy` lifecycle to prevent memory leaks in long-running SPA sessions.
4. **Pragmatism:** Choosing to move from `templateUrl` to inline `template` in the Angular Shell resolved a bug in the experimental builder, prioritizing delivery over rigid adherence to older file-splitting patterns.

---

## ✅ Current Project Baseline
- **Angular Shell:** Running on Port 4200 (Signal-driven).
- **React Remote:** Running on Port 4300 (Vite Preview mode).
- **.NET Gateway:** Running on Port 5000 (CORS enabled).
- **Java AI Engine:** Running on Port 8080 (gRPC enabled on 9090).
