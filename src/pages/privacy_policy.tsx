import PublicLayout from '@/components/layout/PublicLayout'

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-vault-text mb-4">
            Privacy Policy
          </h1>

          <p className="text-vault-text-secondary mb-12">
            Last updated: 15th June 2026
          </p>

          <div className="space-y-10 text-vault-text-secondary leading-relaxed">

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Overview
              </h2>

              <p>
                RequestVault is committed to protecting your privacy and handling
                your data responsibly. This Privacy Policy explains what data we
                collect, how we use it, and the choices available to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Information We Collect
              </h2>

              <ul className="list-disc list-inside space-y-2">
                <li>Account information such as username.</li>
                <li>API monitoring data transmitted through the RequestVault SDK.</li>
                <li>Request metadata including endpoints, methods, status codes, and response times.</li>
                <li>Authentication information required to access the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                How We Use Your Information
              </h2>

              <ul className="list-disc list-inside space-y-2">
                <li>Provide monitoring and observability services.</li>
                <li>Display analytics and request insights.</li>
                <li>Improve platform reliability and performance.</li>
                <li>Communicate important account or service updates.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                What We Do Not Collect
              </h2>

              <ul className="list-disc list-inside space-y-2">
                <li>Credit card or payment information.</li>
                <li>Government-issued identification documents.</li>
                <li>Sensitive personal information unless explicitly transmitted by users.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Data Security
              </h2>

              <p>
                We use industry-standard security practices to protect stored
                data, authentication credentials, and API monitoring information.
                However, no system can guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Data Retention
              </h2>

              <p>
                Monitoring data is retained only as long as necessary to provide
                RequestVault services and improve platform functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Contact
              </h2>

              <p>
                For privacy-related questions, contact:
              </p>

              <p className="mt-2 text-vault-accent">
                varizzup@gmail.com
              </p>
            </section>

          </div>
        </div>
      </div>
    </PublicLayout>
  )
}