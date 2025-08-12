import React, { useState, useEffect } from "react";
import styles from "./devops.module.css";

interface BuildInfo {
  buildTime: string;
  buildDate: string;
  version: string;
  environment: string;
  nodeVersion: string;
  npmVersion: string;
  userAgent: string;
  browserInfo: string;
  buildId: string;
}

interface SystemInfo {
  userAgent: string;
  screenResolution: string;
  viewportSize: string;
  localStorage: number;
  sessionStorage: number;
}

const getBrowserInfo = (): string => {
  const userAgent = navigator.userAgent;
  let browser = "Unknown";
  let version = "Unknown";

  if (userAgent.includes("Chrome")) {
    browser = "Chrome";
    const match = userAgent.match(/Chrome\/(\d+)/);
    version = match ? match[1] : "Unknown";
  } else if (userAgent.includes("Firefox")) {
    browser = "Firefox";
    const match = userAgent.match(/Firefox\/(\d+)/);
    version = match ? match[1] : "Unknown";
  } else if (userAgent.includes("Safari")) {
    browser = "Safari";
    const match = userAgent.match(/Version\/(\d+)/);
    version = match ? match[1] : "Unknown";
  } else if (userAgent.includes("Edge")) {
    browser = "Edge";
    const match = userAgent.match(/Edge\/(\d+)/);
    version = match ? match[1] : "Unknown";
  }

  return `${browser} ${version}`;
};

const DevOpsPage: React.FC = () => {
  const [buildInfo] = useState<BuildInfo>({
    buildTime: new Date().toLocaleString(),
    buildDate: new Date().toISOString().split("T")[0],
    version: import.meta.env.VITE_APP_VERSION || "0.0.0",
    environment: import.meta.env.MODE || "development",
    nodeVersion: "Browser Environment",
    npmVersion: "Browser Environment",
    userAgent: navigator.userAgent,
    browserInfo: getBrowserInfo(),
    buildId: import.meta.env.VITE_BUILD_ID || new Date().getTime().toString(),
  });

  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    userAgent: navigator.userAgent,
    screenResolution: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    localStorage: Object.keys(localStorage).length,
    sessionStorage: Object.keys(sessionStorage).length,
  });

  const [devMode, setDevMode] = useState(() => {
    const saved = localStorage.getItem("devMode");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("devMode", devMode.toString());
  }, [devMode]);
  
  const [templateState, setTemplateState] = useState(() => {
    const saved = localStorage.getItem("templateState");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("templateState", templateState.toString());
  }, [templateState]);

  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState<
    Record<string, number>
  >({});

  // Development mode features
  const [mockDataEnabled, setMockDataEnabled] = useState(false);
  const [slowNetworkSimulation, setSlowNetworkSimulation] = useState(false);
  const [errorSimulation, setErrorSimulation] = useState(false);

  useEffect(() => {
    // Collect performance metrics
    if (performance && performance.getEntriesByType) {
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        setPerformanceMetrics({
          domContentLoaded:
            navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
          dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcpConnection: navigation.connectEnd - navigation.connectStart,
          serverResponse: navigation.responseEnd - navigation.requestStart,
        });
      }
    }

    // Update viewport size on resize
    const handleResize = () => {
      setSystemInfo((prev) => ({
        ...prev,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  const toggleDevMode = () => {
    setDevMode(!devMode);
    if (!devMode) {
      console.log("🔧 Development mode enabled");
      // Add any dev mode specific logic here
    } else {
      console.log("🔧 Development mode disabled");
    }
  };

  
  const toggleTemplateState = () => {
    setTemplateState(!templateState);
    if (!templateState) {
      console.log("🔧 Template state enabled");
      // Add any dev mode specific logic here
    } else {
      console.log("🔧 Template state disabled");
    }
  };

  const clearAllStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    setSystemInfo((prev) => ({
      ...prev,
      localStorage: 0,
      sessionStorage: 0,
    }));
    alert("All storage cleared!");
  };

  const simulateSlowNetwork = () => {
    if (slowNetworkSimulation) {
      // Remove network throttling
      console.log("Network simulation disabled");
    } else {
      // Simulate slow network (this would need to be implemented in your network layer)
      console.log("Simulating slow network...");
    }
    setSlowNetworkSimulation(!slowNetworkSimulation);
  };

  const simulateError = () => {
    if (errorSimulation) {
      console.log("Error simulation disabled");
    } else {
      console.log("Simulating error...");
      // You could trigger a test error here
    }
    setErrorSimulation(!errorSimulation);
  };

  const exportDebugInfo = () => {
    const debugData = {
      buildInfo,
      systemInfo,
      performanceMetrics,
      devMode,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(debugData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `debug-info-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className={styles.devopsContainer}>
      <div className={styles.devopsHeader}>
        <h1>🔧 DevOps Dashboard</h1>
        <p>Development & Inter-team Reference Tool</p>
      </div>

      {/* Development Mode Toggle */}
      <div className={styles.devModeSection}>
        <div className={styles.toggleContainer}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={devMode}
              onChange={toggleDevMode}
              className={styles.toggleInput}
            />
            <span className={styles.toggleSlider}></span>
            Development Mode
          </label>
          <span
            className={`${styles.statusIndicator} ${
              devMode ? styles.active : styles.inactive
            }`}
          >
            {devMode ? "ON" : "OFF"}
          </span>

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={templateState}
              onChange={toggleTemplateState}
              className={styles.toggleInput}
            />
            <span className={styles.toggleSlider}></span>
            Template State
          </label>
          <span
            className={`${styles.statusIndicator} ${
              templateState ? styles.active : styles.inactive
            }`}
          >
            {templateState ? "ON" : "OFF"}
          </span>
        </div>
      </div>

      {/* Build Information */}
      <div className={styles.infoSection}>
        <h2>📦 Build Information</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>Build Time:</label>
            <span>{buildInfo.buildTime}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Build Date:</label>
            <span>{buildInfo.buildDate}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Version:</label>
            <span>{buildInfo.version}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Environment:</label>
            <span
              className={`${styles.envBadge} ${styles[buildInfo.environment]}`}
            >
              {buildInfo.environment}
            </span>
          </div>
          <div className={styles.infoItem}>
            <label>Node Version:</label>
            <span>{buildInfo.nodeVersion}</span>
          </div>
          <div className={styles.infoItem}>
            <label>NPM Version:</label>
            <span>{buildInfo.npmVersion}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Browser:</label>
            <span>{buildInfo.browserInfo}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Build ID:</label>
            <span>{buildInfo.buildId}</span>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className={styles.infoSection}>
        <h2>💻 System Information</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>Screen Resolution:</label>
            <span>{systemInfo.screenResolution}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Viewport Size:</label>
            <span>{systemInfo.viewportSize}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Local Storage Items:</label>
            <span>{systemInfo.localStorage}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Session Storage Items:</label>
            <span>{systemInfo.sessionStorage}</span>
          </div>
        </div>

        <div className={styles.userAgentSection}>
          <label>User Agent:</label>
          <div className={styles.userAgentContainer}>
            <code>{buildInfo.userAgent}</code>
            <button
              onClick={() => copyToClipboard(buildInfo.userAgent)}
              className={styles.copyBtn}
            >
              📋 Copy
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className={styles.infoSection}>
        <h2>⚡ Performance Metrics</h2>
        <div className={styles.infoGrid}>
          {Object.entries(performanceMetrics).map(([key, value]) => (
            <div key={key} className={styles.infoItem}>
              <label>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </label>
              <span>{`${value.toFixed(2)}ms`}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Development Tools */}
      {devMode && (
        <div className={styles.devToolsSection}>
          <h2>🛠️ Development Tools</h2>

          <div className={styles.toolsGrid}>
            <div className={styles.toolItem}>
              <label>
                <input
                  type="checkbox"
                  checked={mockDataEnabled}
                  onChange={(e) => setMockDataEnabled(e.target.checked)}
                />
                Enable Mock Data
              </label>
              <p>Use mock data instead of real API calls</p>
            </div>

            <div className={styles.toolItem}>
              <label>
                <input
                  type="checkbox"
                  checked={slowNetworkSimulation}
                  onChange={simulateSlowNetwork}
                />
                Simulate Slow Network
              </label>
              <p>Add artificial delays to network requests</p>
            </div>

            <div className={styles.toolItem}>
              <label>
                <input
                  type="checkbox"
                  checked={errorSimulation}
                  onChange={simulateError}
                />
                Simulate Errors
              </label>
              <p>Randomly trigger error states</p>
            </div>

            <div className={styles.toolItem}>
              <button
                onClick={clearAllStorage}
                className={`${styles.actionBtn} ${styles.danger}`}
              >
                🗑️ Clear All Storage
              </button>
              <p>Clear localStorage and sessionStorage</p>
            </div>

            <div className={styles.toolItem}>
              <button onClick={exportDebugInfo} className={styles.actionBtn}>
                📥 Export Debug Info
              </button>
              <p>Download all debug information as JSON</p>
            </div>

            <div className={styles.toolItem}>
              <button
                onClick={() => setShowDebugInfo(!showDebugInfo)}
                className={styles.actionBtn}
              >
                {showDebugInfo ? "🔽" : "🔼"} Toggle Debug Console
              </button>
              <p>Show/hide detailed debug information</p>
            </div>
          </div>
        </div>
      )}

      {/* Debug Console */}
      {showDebugInfo && (
        <div className={styles.debugConsole}>
          <h3>🐛 Debug Console</h3>
          <pre>
            {JSON.stringify(
              {
                buildInfo,
                systemInfo,
                performanceMetrics,
                devMode,
                mockDataEnabled,
                slowNetworkSimulation,
                errorSimulation,
              },
              null,
              2
            )}
          </pre>
        </div>
      )}

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h2>⚡ Quick Actions</h2>
        <div className={styles.actionButtons}>
          <button
            onClick={() => window.location.reload()}
            className={styles.actionBtn}
          >
            🔄 Reload Page
          </button>
          <button
            onClick={() => window.open("/api/health", "_blank")}
            className={styles.actionBtn}
          >
            🏥 Health Check
          </button>
          <button onClick={() => console.clear()} className={styles.actionBtn}>
            🧹 Clear Console
          </button>
          <button
            onClick={() =>
              window.open("https://github.com/your-repo", "_blank")
            }
            className={styles.actionBtn}
          >
            📚 Repository
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevOpsPage;
