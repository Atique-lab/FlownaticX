import { Component } from "react";
import { HiOutlineExclamationTriangle, HiOutlineArrowPath } from "react-icons/hi2";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
          <div className="glass-panel rounded-[2rem] p-8 md:p-12 max-w-md w-full">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
              <HiOutlineExclamationTriangle className="text-3xl text-red-400" />
            </div>
            <h1 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Something went wrong
            </h1>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">
              We apologize for the inconvenience. An unexpected error has occurred in the application. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              <HiOutlineArrowPath className="text-lg" /> Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
