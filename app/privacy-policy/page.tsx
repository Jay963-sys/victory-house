export default function PrivacyPolicy() {
  return (
    <main className="bg-white min-h-screen py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto prose prose-stone lg:prose-lg">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-8">
          Privacy Policy
        </h1>
        <p className="text-stone-500 mb-8">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-6 text-stone-700">
          <p>
            RCCG Victory House Chicago ("we," "our," or "us") is committed to
            protecting your privacy. This Privacy Policy explains how your
            personal information is collected, used, and disclosed by RCCG
            Victory House Chicago.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8">
            1. Information We Collect
          </h3>
          <p>
            We collect information you provide directly to us, such as when you
            fill out a contact form, request prayer, register for an event, or
            sign up for our newsletter. This may include your name, email
            address, phone number, and any other information you choose to
            provide.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8">
            2. How We Use Your Information
          </h3>
          <p>
            We use the information we collect to communicate with you, provide
            news and updates about church events, process donations, and improve
            our ministry services. We do not sell your personal data to third
            parties.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8">
            3. Cookies and Tracking
          </h3>
          <p>
            We use cookies and similar tracking technologies to track the
            activity on our Service and hold certain information. This helps us
            analyze web traffic and improve your experience. You can instruct
            your browser to refuse all cookies or to indicate when a cookie is
            being sent.
          </p>
          <p>
            <strong>Advertising:</strong> We may use third-party service
            providers (such as Google or Facebook) to show advertisements to you
            on other websites. These providers may use cookies to serve ads
            based on your past visits to our website.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8">
            4. Third-Party Links
          </h3>
          <p>
            Our website may contain links to other sites that are not operated
            by us. If you click a third-party link, you will be directed to that
            third party's site. We strongly advise you to review the Privacy
            Policy of every site you visit.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8">
            5. Contact Us
          </h3>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>By email: info@victoryalltheway.org</li>
            <li>By phone: (312) 833-2383</li>
            <li>By mail: 4352 W. Parker Avenue, Chicago, IL 60639</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
