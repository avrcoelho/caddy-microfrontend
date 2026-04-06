# Caddy as a Reverse Proxy in Microfrontend Architectures

## Overview

In this project, [Caddy](https://caddyserver.com/) acts as the single entry point for five independent microfrontends. It routes requests by route prefix (`/app1`, `/app2` … `/app5`) and serves the layout shell as a static file (`/layout/*`), without the applications needing to know about each other.

```
Browser → Caddy (:3000)
             ├── /layout/*  → static file (shell.js)
             ├── /app1/*    → reverse_proxy app1:3000
             ├── /app2/*    → reverse_proxy app2:3000
             ├── /app3/*    → reverse_proxy app3:3000
             ├── /app4/*    → reverse_proxy app4:3000
             └── /app5/*    → reverse_proxy app5:3000
```

---

## Pros

### 1. Extremely simple configuration

The `Caddyfile` is declarative and readable. Adding a new microfrontend requires only a three-line block. There are no XML files, verbose YAML, or complex DSLs like nginx/HAProxy.

```caddyfile
@app6 path /app6 /app6/*
handle @app6 {
    reverse_proxy app6:3000
}
```

### 2. Automatic HTTPS by default

In production environments, Caddy manages TLS certificates via ACME (Let's Encrypt / ZeroSSL) with no additional configuration. Microfrontends on different domains are protected without operational overhead.

### 3. Path-based routing

Prefix-based routing is the most natural model for microfrontends: each team owns a URL segment, with no infrastructure dependencies between them. Caddy handles this with native matchers (`path`, `handle_path`), including automatic prefix stripping.

### 4. Built-in static file serving

The native `file_server` allows the layout shell (`/layout/shell.js`) to be served directly by the proxy, without a separate file server. This simplifies `docker-compose.yaml` and the container topology.

### 5. Full decoupling between teams

Each microfrontend runs in its own container/service. Caddy is the only component that knows all internal addresses, so the applications do not need service discovery among themselves.

### 6. Hot configuration reload

Caddy supports graceful reloading (`caddy reload`) with no downtime, useful for adding or removing microfrontends in production without interrupting active sessions.

### 7. Low resource consumption

Written in Go, Caddy has a smaller memory footprint compared to Node.js-based solutions (such as http-proxy) and performance comparable to nginx under typical proxy loads.

---

## Cons

### 1. No native support for Module Federation or Import Maps

Caddy does not understand Webpack's Module Federation protocol or browser Import Maps. Sharing dependencies at runtime (e.g., React shared between apps) must be resolved at the bundler layer, not the proxy.

### 2. Complex logic requires custom plugins or middlewares

Advanced features such as authentication, elaborate rate limiting, or per-application header transformation require Caddy ecosystem plugins or Go modules. The plugin model is less mature than nginx's (where third-party modules are widely adopted).

### 3. Session state and cross-domain cookies

When microfrontends live on different subdomains, session cookie management requires careful configuration of `SameSite`, CORS, and possible `header` directives in the Caddyfile. There is no automatic "magic" here — it is a design problem that the proxy exposes, not solves.

### 4. Routing debugging can be opaque

Routing errors (e.g., wrong matcher, incorrect `handle` order) result in silent 404/502 responses. Caddy has structured logs, but tracing which matcher captured a request requires enabling `debug` or using the admin endpoint, which is not immediate.

### 5. Infrastructure coupling

The entire microfrontend topology lives in the `Caddyfile`. In large teams, route changes require modifying a centralized file and deploying the proxy layer — partially contradicting the microfrontend autonomy principle.

### 6. No dynamic service discovery (without extra plugins)

The default Caddy does not integrate with Consul, Kubernetes Ingress, or other service registries. In environments with horizontal scaling of microfrontends, the static `reverse_proxy` needs to be replaced with plugins like `caddy-docker-proxy` or a dedicated ingress controller.

---

## When to use Caddy

| Scenario                                                            | Recommended?                    |
| ------------------------------------------------------------------- | ------------------------------- |
| Demo project, PoC, or local development environment                 | ✅ Yes                          |
| Production with few stable microfrontends                           | ✅ Yes                          |
| Production with dozens of horizontally scaled microfrontends        | ⚠️ Evaluate Nginx/Envoy/Ingress |
| Need for Module Federation at runtime                               | ❌ Does not solve on its own    |
| Autonomous teams that don't want to touch the proxy on every deploy | ⚠️ Combine with GitOps or Helm  |

---

## Conclusion

Caddy is an excellent choice as a proxy in small to medium-sized microfrontend architectures. Its concise syntax, automatic HTTPS, and built-in `file_server` significantly reduce operational friction. For more complex scenarios — horizontal scaling, Module Federation, dynamic discovery — it can be complemented with plugins or replaced by more specialized solutions such as Nginx + Lua, Envoy, or a Kubernetes Ingress Controller.
