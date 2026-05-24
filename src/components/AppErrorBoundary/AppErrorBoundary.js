import React from "react";

export class AppErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("App crashed:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went very wrong</h1>
                    <p>The application crashed. Try reloading the page.</p>
                    {process.env.NODE_ENV !== "production" && (
                        <pre>{this.state.error?.message}</pre>
                    )}
                    <button onClick={this.handleReload}>Reload App</button>
                </div>
            );
        }
        return this.props.children;
    }
}
