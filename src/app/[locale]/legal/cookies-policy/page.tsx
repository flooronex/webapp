export const metadata = {
  title: "Cookies Policy | FloorOneX",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 border-b border-gray-200 pb-8 dark:border-gray-800">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Cookie Policy
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Functional Flooring Ltd
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
          Last Updated: January 2026
        </p>
      </div>

      {/* Content */}
      <article className="prose prose-sm dark:prose-invert max-w-none space-y-8">
        {/* What are Cookies */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            What Are Cookies?
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Cookies are small text files stored on your device (computer, smartphone, or tablet) when you visit our website. They are widely used to make websites work more efficiently and to provide information to website owners.
          </p>
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            We use cookies to enhance your browsing experience, remember your preferences, understand how you use our website, and deliver personalized content.
          </p>
        </section>

        {/* Types of Cookies */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Types of Cookies We Use
          </h2>
          
          <div className="mt-6 space-y-6">
            {/* Essential Cookies */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                1. Essential Cookies
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Session management</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Authentication verification</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Security and fraud prevention</span>
                </li>
              </ul>
            </div>

            {/* Functional Cookies */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                2. Functional Cookies
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                These cookies remember your choices to provide you with a personalized experience.
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Language preferences</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Theme selection (light/dark mode)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">User preferences and settings</span>
                </li>
              </ul>
            </div>

            {/* Analytics Cookies */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                3. Analytical Cookies
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                These cookies help us understand how visitors use our website and improve our services.
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Page visit tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">User behavior analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Performance metrics</span>
                </li>
              </ul>
            </div>

            {/* Marketing Cookies */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                4. Marketing Cookies
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                These cookies are used to deliver personalized advertising and marketing content.
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Targeted advertising</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">Campaign tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">User interest profiling</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cookie Control */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            How to Control Cookies
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Most web browsers allow you to control cookies through their settings. You can typically:
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span className="text-gray-700 dark:text-gray-300">Accept or reject cookies</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span className="text-gray-700 dark:text-gray-300">Delete existing cookies</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span className="text-gray-700 dark:text-gray-300">Receive notifications when cookies are set</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span className="text-gray-700 dark:text-gray-300">Manage cookie preferences by category</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Please note that disabling cookies may affect your ability to use certain features of our website.
          </p>
        </section>

        {/* Third-Party Cookies */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Third-Party Cookies
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Our website may contain links to third-party websites and services. These third parties may set their own cookies on your device. We are not responsible for their cookie policies or practices. We encourage you to review their privacy policies before using their services.
          </p>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Data Security
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            We implement appropriate security measures to protect information collected through cookies. However, no method of transmission over the internet is entirely secure. We encourage you to use caution when transmitting sensitive information.
          </p>
        </section>

        {/* Legal Basis */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Legal Basis
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Our use of cookies is based on:
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Your Consent:</strong> For non-essential cookies, we obtain your explicit consent before setting them on your device.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Legitimate Interest:</strong> For essential cookies that are necessary for website functionality.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-blue-600 dark:text-blue-400">•</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Legal Obligation:</strong> To comply with applicable laws and regulations.</span>
            </li>
          </ul>
        </section>

        {/* Changes to Policy */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Changes to This Cookie Policy
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            We may update this cookie policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes by posting the updated policy on our website and updating the "Last Updated" date above.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            If you have any questions about our cookie policy or our use of cookies, please contact us at:
          </p>
          <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <p className="text-gray-900 dark:text-white">
              <strong>Functional Flooring Ltd</strong>
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Email: <a href="mailto:support@flooring.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                support@flooring.com
              </a>
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
