import { motion } from "framer-motion";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineShieldCheck } from "react-icons/hi2";

const premiumEase = [0.16, 1, 0.3, 1];

export default function LoginPage() {
  const navigate = useNavigate();

  // Check if already authenticated
  useEffect(() => {
    const token = localStorage.getItem("flownaticx_admin_token");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  // Google Sign-In callback
  const handleGoogleCallback = useCallback(
    async (response) => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Authentication failed.");
          return;
        }

        // Store token and user info
        localStorage.setItem("flownaticx_admin_token", data.token);
        localStorage.setItem("flownaticx_admin_user", JSON.stringify(data.user));
        navigate("/admin/dashboard", { replace: true });
      } catch (err) {
        console.error("Auth error:", err);
        alert("Authentication failed. Please try again.");
      }
    },
    [navigate]
  );

  // Initialize Google Sign-In
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not set");
      return;
    }

    // Make callback globally accessible
    window.handleGoogleCallback = handleGoogleCallback;

    const initGoogle = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCallback,
          auto_select: true,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          {
            theme: "filled_black",
            size: "large",
            width: 320,
            text: "signin_with",
            shape: "pill",
          }
        );
        // Also prompt One Tap
        window.google.accounts.id.prompt();
      }
    };

    // If GSI script is already loaded
    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      // Wait for it to load
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
          initGoogle();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [handleGoogleCallback]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/6 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-violet-500/8 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: premiumEase }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-panel premium-surface rounded-[2rem] p-10 text-center">
          {/* Logo */}
          <div className="mb-6">
            <span className="logo-text text-2xl">
              <span className="logo-flow">Flow</span>
              <span className="logo-natic">natic</span>
              <span className="logo-x">X</span>
            </span>
          </div>

          {/* Shield Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-white/8">
            <HiOutlineShieldCheck className="text-3xl text-cyan-400" />
          </div>

          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Admin Access
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in with the FlownaticX Google account to access the admin dashboard.
          </p>

          {/* Google Sign-In Button Container */}
          <div className="mt-8 flex justify-center">
            <div id="google-signin-btn" />
          </div>

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <p className="text-xs text-slate-600">
            Only <span className="text-slate-400">shaikhatique693@gmail.com</span> has access.
          </p>
        </div>

        {/* Back to site */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-slate-500 transition hover:text-white"
          >
            &larr; Back to FlownaticX
          </a>
        </div>
      </motion.div>
    </div>
  );
}
