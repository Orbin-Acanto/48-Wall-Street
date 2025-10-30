'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsConditionPage() {
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
            Terms & Conditions
          </h1>
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
              This website is owned, operated, licensed, or controlled by Fi Di
              Hospitality Group Inc. (&quot;FiDi&quot;) or affiliate(s) thereof
              (referred to either as &quot;Owner&quot; or &quot;we&quot; or
              &quot;us&quot; or &quot;our&quot;), and provides the content,
              materials, and information contained on this website or any of the
              pages contained therein (&quot;Website&quot;) to users or visitors
              (referred to either as &quot;you&quot; or &quot;your&quot;) for
              your convenience, ease of reference, and personal use only.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Your use of this Website is subject to the terms and conditions
              set forth herein, in Owner&apos;s privacy policy and cookies
              policy applicable to this Website (hereinafter collectively
              referred to as &quot;TOUs&quot;). FIDI reserves the right to
              update these TOUs at any time without notice to you.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              You are not authorized to use this Website unless you agree to
              these TOUs. By using this Website, you are agreeing to these TOUs.
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              I. Capacity
            </h2>
            <p className="leading-relaxed text-gray-700">
              By using this Website, you represent that you are either 18 years
              of age or older, or an emancipated minor, or possess legal
              parental or guardian consent, and are fully able and competent to
              enter into the terms, conditions, obligations, representations,
              and warranties set forth in these TOUs, and to abide by and comply
              with the TOUs. Regardless, you affirm that you are 13 years of age
              or older, as this Website is not intended for use by children
              under 13. If you are under 13 years of age, then please do not use
              this Website. If you are under 13 years of age and need to access
              this Website, request parental or guardian assistance.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              II. Intellectual Property (Copyrights; Trademarks, Patents etc.)
            </h2>
            <p className="leading-relaxed text-gray-700">
              All rights, title, and interest in and to any content of this
              Website, including images, graphics, text, audio and videos, any
              other proprietary information, the &quot;look and feel&quot; of
              each page, and all other elements of this Website that may be
              protected by copyright, patent or otherwise by law, equity, usage
              of trade, and similar (&quot;Website Materials&quot;) is the
              exclusive property of Owner, its successors and assigns or its
              licensors. The compilation of all content included in or made
              available through this Website is the exclusive property of FIDI
              and protected by U.S. or international laws or both.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The trademarks, names, brand names, logos, and service marks
              (collectively &quot;Trademarks&quot;) displayed on this Website
              are the registered or unregistered trademarks of Owner, its
              successors and assigns, or its licensors. Nothing contained on
              this Website should be construed as granting any license or right
              to use any Trademark or Website Materials without the prior
              written permission of Owner.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              III. Website Made Available on an &quot;AS IS&quot; and &quot;AS
              AVAILABLE&quot; Basis
            </h2>
            <p className="leading-relaxed text-gray-700">
              This Website and the Website Materials are made available on an
              &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. Owner makes
              no representations or warranties, express or implied, including
              implied warranties of merchantability or fitness for a particular
              purpose, title, and non-infringement regarding this Website or the
              Website Materials contained in this Website.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Without limiting the generality of the foregoing, Owner makes no
              representations and/or warranties as to any of the following: (a)
              that access to this Website will be secure, free of malicious
              code, including viruses, cancelbots, trojan horses, malware, or
              spyware in general or other potentially harmful software programs,
              materials or information (collectively &quot;Malware&quot;); (b)
              that this Website is free from defects and/or errors and that
              access to this Website will suffer no interruptions, outages etc.;
              and/or (c) that such errors and/or defects will be corrected. It
              being understood and agreed that in using this Website, you agreed
              to using this Website at your own risk.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              IV. External Links
            </h2>
            <p className="leading-relaxed text-gray-700">
              This Website may include one or more links to external websites
              (each an &quot;External Site&quot;) which have no connection with
              this Website or Owner. A link to an External Site is provided
              solely for your convenience. The inclusion of any External Site
              does not imply that Owner has approved, checked, or otherwise
              endorsed any such External Site, its content, or any products or
              services which may be offered at any such External Sites, it being
              understood and agreed that External Sites are beyond the control
              of Owner, and Owner is not responsible for the contents of any
              External Site or any link contained in an External Site, or any
              changes or updates to such sites.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Owner shall not be liable for any damage, loss, expense, or claim
              arising out of or in connection with your use of any External
              Site. Use of any External Site is at your own risk. No hypertext
              links to this Website shall be created from any website controlled
              by you or otherwise without the express prior written permission
              of Owner.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              V. Limitation of Liability
            </h2>
            <p className="leading-relaxed text-gray-700">
              TO THE FULLEST EXTENT ALLOWED BY LAW, YOU AGREE THAT THE OWNER
              SHALL NOT BE LIABLE TO YOU AND/OR ANY OTHER PERSON FOR ANY
              SPECIAL, CONSEQUENTIAL, INDIRECT, INCIDENTAL, EXEMPLARY DAMAGES,
              DAMAGES FOR LOSS PROFITS, LOSS OF PRIVACY OR SECURITY OR FAILURE
              TO MEET ANY DUTY (INCLUDING BUT NOT LIMITED TO ANY DUTY OF GOOD
              FAITH, LACK OF NEGLIGENCE, OR WORMANLIKE EFFORT OR CONDUCT)
              ARISING FROM YOUR USE OF THE WEBSITE OR FOR ANY OTHER CLAIM
              RELATED IN ANY WAY TO YOUR USE OF THE WEBSITE, EVEN IF THERE IS
              NEGLIGENCE ON THE PART OF THE OWNER, OR AN AUTHORIZED
              REPRESENTATIVE OF THE OWNER HAS BEEN ADVISED OF THE POSSIBILITY OF
              SUCH DAMAGES, OR BOTH, AND EVEN IN THE EVENT OF FAULT, TORT OR
              STRICT OR PRODUCT LIABILITY OR MISREPRESENTATION.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              SUCH LIMITATION OF LIABILITY SHALL APPLY WHETHER THE DAMAGES ARISE
              FROM USE OR MISUSE OF, AND RELIANCE ON, THE OWNER&apos;S GOODS AND
              SERVICES, FROM INABILITY TO USE THE OWNER&apos;S GOODS OR
              SERVICES, OR FROM THE INTERRUPTION, SUSPENSION, OR TERMINATION OF
              THE OWNER&apos;S SERVICES (INCLUDING SUCH DAMAGES INCURRED BY
              THIRD PARTIES).
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              VI. User Submissions
            </h2>
            <p className="leading-relaxed text-gray-700">
              The Website content may now or in the future permit the submission
              of suggestions, ideas, graphics, concepts, photos, videos or other
              communications or information, or know-how contained in any
              communications or information submitted by you and other users
              (&quot;User Submissions&quot;) and the hosting, sharing, or
              publishing, or any combination thereof, of such User Submissions.
              You agree that, upon posting, submitting, or otherwise
              transmitting to Owner, any such User Submissions will become and
              forever be the property of Owner and you further understand that
              whether or not such User Submissions are published, Owner does not
              guarantee any confidentiality with respect to any User
              Submissions.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              You shall be solely responsible for your own User Submissions and
              the consequences of posting or publishing them. By submitting the
              User Submissions to Owner, you hereby grant Owner a perpetual
              worldwide, non-exclusive, royalty-free, sub licensable, and
              transferable license to use, reproduce, distribute, prepare
              derivative works of, display, and perform the User Submissions in
              connection with the Website and Owner&apos;s businesses.
            </p>
          </div>

          {/* Section 7 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              VII. Indemnity
            </h2>
            <p className="leading-relaxed text-gray-700">
              You agree to defend, indemnify and hold harmless, Owner,
              affiliates, officers, directors, employees and agents, from and
              against any and all claims, damages, obligations, losses,
              liabilities, costs or debt, and expenses, (including but not
              limited to attorneys&apos; fees) arising from: (i) your use of and
              access to the Website; (ii) your violation of any of these TOUs,
              (iii) your violation of any third-party right, including without
              limitation any copyright, property, or privacy act; or (iv) any
              claim that one of your User Submissions caused damage to a
              third-party. This defense and indemnification obligation will
              survive these Terms and your use of the Website.
            </p>
          </div>

          {/* Section 8 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              VIII. Termination
            </h2>
            <p className="leading-relaxed text-gray-700">
              Owner has the right to terminate your access to the Website
              content for any reason whatsoever, if Owner, in its sole
              discretion, considers your use to be unacceptable or in violation
              of these TOUs. Owner may, but shall be under no obligation to,
              provide you a warning prior to termination of your use of the
              Website.
            </p>
          </div>

          {/* Section 9 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              IX. Cookies and Access Log
            </h2>
            <p className="leading-relaxed text-gray-700">
              The technologies used by this Website to collect usage
              information, including device identifiers, include cookies (i.e.,
              data files placed on a computer, tablet or other electronic device
              used to visit this Website). We may place cookies or similar files
              on your device (e.g., laptop, desktop, smartphone etc.) to
              facilitate your use of this Website or for security purposes when
              you visit this Website. We may also elect to keep access logs of
              users accessing this Website for statistical purposes only.
            </p>
          </div>

          {/* Section 10 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              X. Use of Third-Party Services
            </h2>
            <p className="leading-relaxed text-gray-700">
              When you use this Website, you may also be using the services of
              one or more third parties. Your use of any third-party services
              may be subject to the separate policies, terms of use, or charges
              and fees of such third parties, or any combination of the
              foregoing.
            </p>
          </div>

          {/* Section 11 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              XI. Electronic Communications
            </h2>
            <p className="leading-relaxed text-gray-700">
              When you use this Website, or send electronic mail, text messages
              and other communications from your desktop or mobile device to us,
              you may be communicating with us electronically. You consent to
              receive communications from us electronically, such as texts,
              electronic mail, mobile push notices, or notices and messages on
              this Website, and you can retain copies of these communications
              for your records. You agree that all agreements, notices,
              disclosures, and other communications that we provide to you
              electronically satisfy any legal requirement that such
              communications be in writing.
            </p>
          </div>

          {/* Section 12 */}
          <div className="mb-10">
            <h2 className="font-primary mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              XII. Governing Law and Exclusive Jurisdiction
            </h2>
            <p className="leading-relaxed text-gray-700">
              This Website is controlled by Owner from its offices within the
              United States of America. Claims of every nature (including
              without limitation, contract, tort, and strict liability) relating
              in any way to any aspect of the Website shall be governed by the
              laws of the State of New York, U.S.A without regard to its
              conflict of law provisions. You hereby consent to jurisdiction in
              a state or federal court in Suffolk County, New York, Nassau
              County, New York, Queens County, New York, or Kings County
              (Brooklyn), New York and waive any claim or defense that such
              forum is not convenient or proper, and consent to service of
              process by any means authorized by New York or federal law.
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
            Questions about our terms?{' '}
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
