'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="font-secondary min-h-screen bg-white pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-primary mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mb-2 text-sm text-gray-600 md:text-base">
            Fi Di Hospitality Group Inc.
          </p>
          <p className="text-sm text-gray-600 md:text-base">
            Last Updated: October 2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-gray max-w-none"
        >
          {/* Introduction */}
          <div className="mb-10">
            <p className="leading-relaxed text-gray-700">
              Your privacy is very important to Fi Di Hospitality Group Inc.
              (&quot;FiDi&quot;, &quot;our&quot;, &quot;we&quot; or
              &quot;us&quot;). This Privacy Policy describes the types of
              information that we collect from and about you when you visit our
              website (the &quot;Website&quot;), and explains how we may use,
              store, collect, or disclose, or any combination of the foregoing,
              your personal data, as follows:
            </p>
            <ol className="mt-4 ml-6 list-decimal space-y-2 text-gray-700">
              <li>
                <strong>Collection of Information; Cookies.</strong> We may
                collect personal information including your name, address,
                telephone, email address, or mobile number, user name and
                password, geolocation information, and, if you make a purchase
                on the Website, your payment information, in addition to
                non-personal information about your use of the Website.
              </li>
              <li>
                <strong>Use of the Information Collected.</strong> We may use
                the information we collect from and about you for several
                purposes including selling you goods and services, providing you
                with newsletters, offers, advertising through email, postal
                mail, text message, or contacting you, or any combination of the
                foregoing.
              </li>
              <li>
                <strong>Sharing of Information Collected.</strong> We may share
                the information we collect from and about you with third parties
                such as third-party service providers, law enforcement agencies,
                or governmental authorities to the extent required.
              </li>
              <li>
                <strong>Retention of Information Collected.</strong> Your
                personal data will not be kept for longer than is necessary to
                fulfill the specific purposes outlined in this Privacy Policy
                and to otherwise allow us to comply with legal requirements.
              </li>
            </ol>
          </div>

          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Collection of Information; Cookies
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              FIDI collects information from you when you use or visit the
              Website, create an account on the Website, purchase goods on the
              Website, request information from us, sign up for newsletters or
              other online services, complete online forms, participate in
              contests or surveys, or otherwise contact us. The information we
              collect from you may include your name, address, zip code, e-mail
              address, mobile number, username(s) and password(s), geolocation
              information, and other personal information. If you purchase goods
              through the Website, we may collect additional information such as
              credit or debit card numbers, billing addresses, banking
              information, and other information typically used to process
              payments. If you purchase a gift card for someone else, we may
              also collect personal information about other persons.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              When you use or visit the Website, we may use cookies, pixel tags,
              log files, web beacons or other technologies to automatically
              collect information from you or about you including, without
              limitation, your browser type, operating system, software version,
              IP address, information about your smartphone or mobile carrier,
              or both, date and time you access the Website, which pages you
              visit, the amount of time you spend on the Website, the number of
              times you return, and other usage data.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              We may gather information about you from other sources, including,
              without limitation, social network platforms (e.g., X (formerly
              known as Twitter), Instagram, etc.) that you may use to connect to
              the Website. We may use this information together with the
              information we collect from or about you, or to provide you with
              offers, notifications or other communications that may be of
              interest to you.
            </p>
            <p className="leading-relaxed text-gray-700">
              The Website uses cookies (i.e., data files placed on a tablet,
              computer, or other electronic device used to visit the Website)
              to, among other things, gather information regarding the date and
              time of your visit and the information for which you searched and
              which you viewed. &quot;Cookies&quot; are information or data, or
              both, that a website sends to your computer&apos;s storage media
              while you are viewing a website. We might use both session cookies
              (these cookies are temporary and expire once you close your
              browser) or persistent cookies, or both, which remain on your
              storage media until you erase them. You have the option to set
              your browser or operating system to limit tracking or to decline
              cookies, however, this may limit certain features of the Website
              and make your use of the Website less effective. For example, if
              you block our cookies, you may not be able to add items to your
              cart or checkout. The &quot;help&quot; feature on most browsers
              explains how to stop your browser from accepting new cookies, how
              to set the browser to notify you when you receive a new cookie, or
              how to disable cookies altogether. You can disable or delete
              similar data used by browser add-ons by changing the add-on&apos;s
              settings.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Use of the Information Collected
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Information we collect from you or about you, or both may be used
              for a variety of purposes, including, without limitation, the
              following:
            </p>
            <ol className="ml-6 list-decimal space-y-2 text-gray-700">
              <li>To notify or otherwise contact you;</li>
              <li>For data usage analysis purposes or statistical purposes;</li>
              <li>To create targeted offers for you;</li>
              <li>To respond to your questions or requests;</li>
              <li>To process orders and payments;</li>
              <li>To prevent online fraud or other fraudulent activity;</li>
              <li>
                To develop offers, new products or services or to promote
                existing products; and/or
              </li>
              <li>For advertising purpose.</li>
            </ol>
          </div>

          {/* Section 3 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Sharing of Information Collected
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              FIDI is not in the business of selling personal information.
              However, there are certain instances in which the information
              collected from you or about you may be shared with third parties.
              For example, we may share information collected from you or about
              you, or both with our affiliates for marketing or analytical
              purposes. We may also hire other companies and individuals to
              perform services on our behalf, such as, for example, express
              couriers and online payment service providers, and we may send
              offers to our customers on behalf of other businesses.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              We may release personal information to law enforcement,
              governmental agencies, or authorized third parties when we believe
              release is appropriate or required to comply with applicable laws,
              orders, or regulations, enforce our Terms of Use
              (&quot;TOUs&quot;) and other agreements, or protect the rights,
              property, or safety of others. This includes providing or
              exchanging information with law enforcement, governmental
              authorities, or other companies and organizations for law
              enforcement purposes such as fraud protection and similar
              purposes.
            </p>
            <p className="leading-relaxed text-gray-700">
              Except as described above, you will receive notice when
              information about you might is provided to third parties, and you
              will have the right to choose not to share the information.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Retention of Information Collected
            </h2>
            <p className="leading-relaxed text-gray-700">
              Your personal data will not be kept for longer than necessary to
              fulfill the specific purposes outlined in this Privacy Policy and
              to allow us to comply with our legal requirements.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Specific Location Practices
            </h2>

            <h3 className="font-primary mt-6 mb-3 text-xl font-bold text-gray-900 md:text-2xl">
              California
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              Residents of the State of California can request a list of all
              third parties to which FIDI has disclosed certain personal
              information (as defined by California law) during the preceding
              year for those third parties&apos; direct marketing purposes. If
              you are a California resident and want such a list, please contact
              us at privacy@FiDi.com. For all requests, please ensure you put
              the statement &quot;Your California Privacy Rights&quot; in the
              body of your request, as well as your name, street address, city,
              state, and zip code. In the body of your request, please provide
              enough information for us to determine if this applies to you. You
              need to attest to the fact that you are a California resident and
              provide a current California address for our response.
            </p>
            <p className="mb-6 leading-relaxed text-gray-700">
              Please note that we will not accept requests via fax, mail, or by
              telephone, and we are not responsible for notices that are not
              labeled or sent properly, or that do not have complete
              information.
            </p>

            <h3 className="font-primary mb-3 text-xl font-bold text-gray-900 md:text-2xl">
              European Economic Area (EEA)
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              If you use the Website from the EEA, you have certain rights
              regarding your personal information, subject to local laws. These
              include, without limitation, the following rights: (i) the right
              to access to customer personal information, (ii) the right to
              rectify information we hold about our customers, (iii) the right
              to erase customer personal information, (iv) the right to restrict
              our use of customer personal information, (v) the right to object
              to our use of customer personal information, (vi) the right to
              receive customer personal information in a usable electronic
              format and transmit it to a third party (right to data
              portability), and (vii) the right to lodge a complaint with the
              local data protection authority.
            </p>
            <p className="leading-relaxed text-gray-700">
              Additionally, please review the section entitled &quot;CUSTOMER
              DATA PROTECTION RIGHTS&quot; and review the protections afforded
              to FiDi customers who are covered under the General Data
              Protection Regulation (GDPR).
            </p>
          </div>

          {/* GDPR Section */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              GDPR Compliance Statement
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              FiDi is committed to adhering to the principles and requirements
              of the General Data Protection Regulation (GDPR) to protect the
              personal data of individuals in the European Economic Area (EEA).
              We ensure that all data collection, processing, and storage
              activities comply with GDPR requirements, including but not
              limited to the following:
            </p>
            <ul className="ml-6 list-disc space-y-3 text-gray-700">
              <li>
                <strong>Transparency and Consent:</strong> We obtain clear and
                explicit consent for data processing activities where required.
                Users have the right to access, modify, or delete their personal
                data at any time.
              </li>
              <li>
                <strong>Purpose Limitation:</strong> Personal data is collected
                solely for specific, legitimate purposes, such as processing
                transactions, improving services, or responding to inquiries,
                and is not further processed in a manner incompatible with these
                purposes.
              </li>
              <li>
                <strong>Data Minimization:</strong> We limit the collection of
                personal data to what is necessary for the intended purpose.
              </li>
              <li>
                <strong>Data Security:</strong> Personal data is stored
                securely, utilizing robust technical and organizational measures
                to prevent unauthorized access, loss, or misuse.
              </li>
              <li>
                <strong>Monitoring and Compliance:</strong> We regularly review
                our data practices and update them to align with evolving GDPR
                regulations. FiDi also ensures third-party service providers
                handling personal data on our behalf are fully GDPR-compliant.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-gray-700">
              For additional inquiries or to exercise your rights under GDPR,
              please contact our Data Protection Officer at privacy@FiDi.com.
            </p>
          </div>

          {/* CCPA Section */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              CCPA Compliance Statement
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              In accordance with the California Consumer Privacy Act (CCPA),
              FiDi provides California residents with specific rights regarding
              their personal information and ensures that we process personal
              data in compliance with the law. Key highlights of our CCPA
              compliance include:
            </p>
            <ul className="ml-6 list-disc space-y-3 text-gray-700">
              <li>
                <strong>Right to Know:</strong> California residents have the
                right to request details about the personal information we
                collect, the purposes for which it is used, and any third
                parties with whom it is shared.
              </li>
              <li>
                <strong>Right to Delete:</strong> Users may request the deletion
                of personal information collected about them, subject to certain
                exceptions, such as fulfilling legal or contractual obligations.
              </li>
              <li>
                <strong>Right to Opt-Out:</strong> We provide California
                residents with the ability to opt out of the sale or sharing of
                their personal information, if applicable.
              </li>
              <li>
                <strong>Non-Discrimination:</strong> FiDi does not discriminate
                against users who exercise their CCPA rights.
              </li>
              <li>
                <strong>Data Security and Monitoring:</strong> We maintain
                stringent security measures to protect user data and regularly
                evaluate our practices to ensure ongoing CCPA compliance. We
                also collaborate with external service providers to confirm
                their compliance with CCPA regulations.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-gray-700">
              For detailed information about how we collect, store, and use
              personal data, or to exercise your rights under CCPA, please email
              us at privacy@FiDi.com.
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Third-Party Services
            </h2>
            <p className="leading-relaxed text-gray-700">
              This Privacy Policy does not address, and we are not responsible
              for, the privacy, information or other practices of any third
              parties, including any third party operating any site or service
              to which the Website may link. The inclusion of a link on the
              Website does not imply vetting or endorsement, or both, of the
              linked site. Specifically, we assume no responsibility for the
              information use, collection, disclosure, or security policies or
              practices of other organizations, such as Facebook, Apple, Google,
              Microsoft, etc. or any other app developer, app provider, device
              manufacturer, operating system provider, wireless service
              provider, or social media platform provider, including with
              respect to any personal information you disclose to other
              organizations.
            </p>
          </div>

          {/* Third-Party Advertising */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Third-Party Advertising
            </h2>
            <p className="leading-relaxed text-gray-700">
              The Website may use third-party advertising companies to post ads
              regarding goods and services that may be of interest to you or to
              customers in general. You may see such ads when you access or use
              our Website. Such third-party advertising companies may place or
              recognize a unique cookie on your browser (including through the
              use of pixel tags). They may also use these technologies, along
              with information they collect about your online use, to recognize
              you across the devices you use, such as a laptop and a mobile
              phone.
            </p>
          </div>

          {/* Protecting Your Information */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Protecting Your Information
            </h2>
            <p className="leading-relaxed text-gray-700">
              We use commercially reasonable efforts to protect the Website or
              your personal information within. However, we cannot guarantee
              that your data will not be compromised. If you have reason to
              believe that your data has been compromised, please immediately
              notify us at: privacy@FiDi.com. Likewise, it is important for you
              to protect against unauthorized access to your password and to
              your computer. Be sure to sign off when finished using a shared
              computer and do not provide your credit card or other payment
              information unless you are connected to the Website using a
              secured connection.
            </p>
          </div>

          {/* Customer Data Protection Rights */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Customer Data Protection Rights
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Under certain circumstances, you have:
            </p>
            <ul className="ml-6 list-disc space-y-3 text-gray-700">
              <li>
                <strong>The Right to be Informed:</strong> You have the right to
                know how we collect your data and how we are going to use your
                data (also known as, privacy information). We achieve this
                through this Privacy Policy.
              </li>
              <li>
                <strong>The Right to Access:</strong> You have the right to
                receive a copy of your data and to verify that we are lawfully
                processing it.
              </li>
              <li>
                <strong>The Right of Correction:</strong> You have the right to
                ask us to correct any incomplete or inaccurate information we
                hold about you.
              </li>
              <li>
                <strong>The Right to Erasure:</strong> You have the right to ask
                us to delete or remove your data where there is no compelling
                reason for us to keep it.
              </li>
              <li>
                <strong>The Right to Restrict Processing:</strong> You have the
                right to request that we restrict processing of your personal
                data, under certain conditions.
              </li>
              <li>
                <strong>The Right to Data Portability:</strong> You have the
                right to request us to transfer your personal information to
                another company.
              </li>
              <li>
                <strong>The Right to Object to Processing:</strong> You have the
                right to challenge certain types of processing.
              </li>
              <li>
                <strong>
                  Rights in Relation to Automated Decision Making and Profiling:
                </strong>{' '}
                You have the right to be informed if we are carrying solely
                automated-decision making, including profiling with legal or
                significant effects.
              </li>
            </ul>
          </div>

          {/* How to Change Your Personal Information */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              How to Change Your Personal Information
            </h2>
            <p className="leading-relaxed text-gray-700">
              If you would like update or delete your personal information,
              please write to: privacy@FiDi.com. When writing to us, please
              clearly identify what information you would like to update or
              delete. When processing your request, we may ask you questions to
              verify your identity. Please note that we are required to retain
              certain information for recordkeeping purposes or to complete any
              order placed prior to your request. There may also be residual
              information that will remain within our databases and other
              records, which will not be removed.
            </p>
          </div>

          {/* Sensitive Personal Information */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Sensitive Personal Information
            </h2>
            <p className="leading-relaxed text-gray-700">
              Do NOT provide us with any sensitive personal information such as
              your social security number, banking information (other than
              necessary payment information to process transactions), medical
              records, biometrics, genetic characteristics, or criminal
              background. We do not and will not ask for this information in
              connection with the goods or services offered through the Website.
            </p>
          </div>

          {/* Minors */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Minors
            </h2>
            <p className="leading-relaxed text-gray-700">
              If you are under 18, you may use the Website only with the
              involvement and supervision of a parent or guardian. We do not
              knowingly collect personal information from children under the age
              of 13 without the consent of the child&apos;s parent or guardian.
            </p>
          </div>

          {/* User's Acceptance */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              User&apos;s Acceptance of Our Privacy Policy; Changes to Our
              Privacy Policy
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              By visiting and using the Website, you automatically signify your
              acceptance to our TOUs, including our Privacy Policy. If you do
              not agree with our TOUs or Privacy Policy, or both, please refrain
              from visiting or using the Website.
            </p>
            <p className="leading-relaxed text-gray-700">
              We reserve the right, in our sole discretion, to update this
              Privacy Policy, change, modify, add, or remove portions from this
              Privacy Policy at any time. Your continued use of the Website
              following the posting of changes to our TOUs or Privacy Policy, or
              both, signify your acceptance of such changes.
            </p>
          </div>

          {/* Contact Us */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Contact Us
            </h2>
            <p className="leading-relaxed text-gray-700">
              If you have any questions, feedback, or concerns about this
              Privacy Policy, please contact us at{' '}
              <a
                href="mailto:privacy@FiDi.com"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                privacy@FiDi.com
              </a>
            </p>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 border-t border-gray-200 pt-8 text-center"
        >
          <p className="mb-4 text-gray-600">
            Questions about our privacy policy?{' '}
            <Link
              href="/contact"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Contact us
            </Link>
          </p>
          <Link
            href="/"
            className="text-sm tracking-wider text-gray-500 uppercase transition-colors hover:text-gray-700"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
