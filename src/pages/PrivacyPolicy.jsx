import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { premiumEase } from "../components/revealVariants";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="Privacy Policy for FlownaticX Digital Growth Agency. Learn how we handle your data."
      />
      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="container-section max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="glass-panel premium-surface p-10 md:p-16 rounded-[2.5rem]"
          >
            <h1 className="heading-gradient text-4xl font-extrabold mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              Privacy Policy
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
              <p className="text-slate-400">Last Updated: April 25, 2026</p>
              
              <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                <p>We collect information that you provide directly to us through our contact forms, including your name, email address, phone number, and business details. This information is used solely to respond to your inquiries and provide our services.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and complete lead inquiries</li>
                  <li>Send technical notices, updates, and security alerts</li>
                  <li>Communicate with you about products, services, and events</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">3. Data Security</h2>
                <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
                <p>We use third-party services like Google Ads and Vercel to help operate our website. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">5. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:flownaticx@gmail.com" className="text-cyan-400">flownaticx@gmail.com</a>.</p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
