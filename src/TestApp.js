import App from "./App";
import {AppErrorBoundary} from "./components/AppErrorBoundary";

export const TestApp = () => {
    return (
        <>
            <AppErrorBoundary >
            <App />
            </AppErrorBoundary>
        </>
    )
}