# DevOps Dashboard Component

## Overview

The DevOps Dashboard is a comprehensive development and inter-team reference tool that provides real-time information about your application's build, system, and performance metrics.

## Features

### 1. Build Information

- **Build Time**: Current timestamp when the component loads
- **Build Date**: Current date in ISO format
- **Version**: Application version (from `VITE_APP_VERSION` env var)
- **Environment**: Current environment (development/staging/production)
- **Browser**: Detected browser and version
- **Build ID**: Unique build identifier

### 2. System Information

- **Screen Resolution**: Physical screen dimensions
- **Viewport Size**: Current browser viewport (updates on resize)
- **Storage**: Local and session storage item counts
- **User Agent**: Full browser user agent string

### 3. Performance Metrics

- **DOM Content Loaded**: Time to DOM content loaded
- **Load Complete**: Total page load time
- **DNS Lookup**: DNS resolution time
- **TCP Connection**: Connection establishment time
- **Server Response**: Server response time

### 4. Development Tools (when dev mode is enabled)

- **Mock Data Toggle**: Enable/disable mock data
- **Slow Network Simulation**: Simulate poor network conditions
- **Error Simulation**: Trigger test error states
- **Storage Management**: Clear all browser storage
- **Debug Export**: Download debug information as JSON
- **Debug Console**: Toggle detailed debug information

## Environment Variables

To customize the DevOps dashboard, create a `.env` file in your project root:

```bash
# App version (displayed in dashboard)
VITE_APP_VERSION=1.0.0

# Build ID (can be set during build process)
VITE_BUILD_ID=build-2024-01-01

# Other environment variables
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
```

## Usage

### Development Mode

1. Navigate to `/devops` in your application
2. Toggle "Development Mode" to access advanced tools
3. Use the various tools for debugging and testing

### Production

- The component works in production but development tools are hidden by default
- Build information is still available for reference
- Performance metrics are collected automatically

## Browser Compatibility

The component uses modern browser APIs:

- **Performance API**: For performance metrics
- **Clipboard API**: For copy-to-clipboard functionality
- **File API**: For debug data export
- **Storage API**: For localStorage/sessionStorage management

## Customization

### Adding Custom Environment Variables

1. Add your variable to `.env` with `VITE_` prefix
2. Access it in the component: `import.meta.env.VITE_YOUR_VARIABLE`

### Adding Custom Metrics

1. Extend the `BuildInfo` or `SystemInfo` interfaces
2. Add the data collection logic
3. Update the display in the JSX

### Styling

The component uses CSS modules. Modify `devops.module.css` to customize the appearance.

## Security Considerations

- Environment variables prefixed with `VITE_` are exposed to the browser
- Don't include sensitive information in these variables
- The component is intended for development and debugging purposes

## Troubleshooting

### Environment Variables Not Showing

- Ensure variables are prefixed with `VITE_`
- Restart your development server after adding new variables
- Check that the `.env` file is in the project root

### Performance Metrics Not Available

- Some metrics require the page to be fully loaded
- Performance API might not be available in all browsers
- Check browser console for any errors

### Development Tools Not Appearing

- Make sure "Development Mode" is toggled on
- Check that you're in development environment
- Verify that the component is properly imported and routed
