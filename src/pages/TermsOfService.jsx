import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { premiumEase } from "../components/revealVariants";

export default function TermsOfService() {
  return (
    <>
      <SEO 
        title="Terms of Service" 
        description="Terms of Service for FlownaticX Digital Growth Agency. Please read our terms carefully."
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
              Terms of Service
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
              <p className="text-slate-400">Last Updated: April 25, 2026</p>
              
              <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
                <p>By accessing and using the services provided by FlownaticX ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">2. Description of Services</h2>
                <p>FlownaticX provides digital marketing, design, automation, and web development services. All services are subject to the terms of individual project agreements signed between FlownaticX and the client.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">3. Use of Website</h2>
                <p>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
                <p>FlownaticX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">5. Governing Law</h2>
                <p>These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">6. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the website after such changes constitutes your acceptance of the new terms.</p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
