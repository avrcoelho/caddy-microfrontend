import { useRef, useEffect } from "react";

const wrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  fontFamily: "system-ui, sans-serif",
};

const topbarStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
  height: "56px",
  backgroundColor: "#1a1a2e",
  color: "#fff",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "16px",
};

const linkStyle: React.CSSProperties = {
  color: "#e0e0e0",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: "4px",
  fontSize: "14px",
};

const contentSlotStyle: React.CSSProperties = {
  flex: 1,
};

const footerStyle: React.CSSProperties = {
  padding: "16px 24px",
  textAlign: "center",
  backgroundColor: "#f5f5f5",
  color: "#666",
  fontSize: "13px",
  borderTop: "1px solid #e0e0e0",
};

interface LayoutProps {
  contentElement: HTMLElement | null;
}

export function Layout({ contentElement }: LayoutProps) {
  const contentSlotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentElement && contentSlotRef.current) {
      contentSlotRef.current.appendChild(contentElement);
    }
  }, [contentElement]);

  return (
    <div style={wrapperStyle}>
      <header style={topbarStyle}>
        <strong>Microfrontends Demo</strong>
        <nav style={navStyle}>
          <a href="/app1" style={linkStyle}>
            App 1
          </a>
          <a href="/app2" style={linkStyle}>
            App 2
          </a>
          <a href="/app3" style={linkStyle}>
            App 3
          </a>
          <a href="/app4" style={linkStyle}>
            App 4
          </a>
          <a href="/app5" style={linkStyle}>
            App 5
          </a>
        </nav>
      </header>
      <main ref={contentSlotRef} style={contentSlotStyle} />
      <footer style={footerStyle}>Footer from app-layout</footer>
    </div>
  );
}
