import PublicLayout from '@/components/layout/PublicLayout'

export default function TermsOfServicePage() {
  return (
    <PublicLayout>
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-vault-text mb-4">
            Terms of Service
          </h1>

          <p className="text-vault-text-secondary mb-12">
            Last updated: 15th June 2026
          </p>

          <div className="space-y-10 text-vault-text-secondary leading-relaxed">

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Acceptance of Terms
              </h2>

              <p>
                By accessing or using RequestVault, you agree to these Terms of
                Service. If you do not agree with these terms, please do not use
                the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Use of the Service
              </h2>

              <p>
                RequestVault is provided for monitoring, debugging, analytics,
                and observability purposes. Users are responsible for ensuring
                that the data they transmit complies with applicable laws and
                regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                User Responsibilities
              </h2>

              <ul className="list-disc list-inside space-y-2">
                <li>Maintain the security of your account credentials.</li>
                <li>Protect API keys from unauthorized access.</li>
                <li>Use the platform responsibly and lawfully.</li>
                <li>Avoid transmitting malicious or illegal content.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Intellectual Property
              </h2>

              <p>
                RequestVault, including its software, branding, design, and
                documentation, remains the property of its creator unless
                otherwise stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Service Availability
              </h2>

              <p>
                While we strive to maintain reliable service, RequestVault is
                provided on an "as-is" basis. Availability, features, and
                functionality may change over time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Limitation of Liability
              </h2>

              <p>
                RequestVault shall not be liable for indirect, incidental, or
                consequential damages arising from the use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Changes to These Terms
              </h2>

              <p>
                These terms may be updated periodically. Continued use of the
                platform after updates constitutes acceptance of the revised
                terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-vault-text mb-4">
                Contact
              </h2>

              <p>
                Questions regarding these Terms of Service can be directed to:
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