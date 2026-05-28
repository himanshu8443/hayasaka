import { SITE_NAME, SITE_URL, ORG_CONTACT_EMAIL } from "@/utils/siteConfig";

export const metadata = {
  title: "DMCA & Copyright Policy",
  description: `${SITE_NAME} is a music search engine using open source APIs. Read our DMCA takedown policy and learn how to submit a copyright infringement notice.`,
  alternates: { canonical: `${SITE_URL}/dmca` },
  robots: { index: true, follow: true },
};

const Page = () => {
  return (
    <div className="w-11/12 mt-20 mx-auto text-white min-h-screen">
      <h1 className="mt-4 text-3xl font-bold">Disclaimer</h1>
      <p className="mt-4 text-lg">
        {SITE_NAME} is a music search engine using open source APIs and does not
        upload or host any files on its server. If you are a valid owner of any
        content listed here and want to remove it, please send us a
        DMCA-formatted takedown notice at{" "}
        <a href={`mailto:${ORG_CONTACT_EMAIL}`} className="text-cyan-400">
          {ORG_CONTACT_EMAIL}
        </a>
        . We will remove your content as soon as possible.
      </p>

      <h2 className="text-2xl mt-5 font-bold">
        DMCA takedown request requirements
      </h2>
      <p className="mt-4 text-lg">
        We take the intellectual property rights of others seriously and require
        that our users do the same. The Digital Millennium Copyright Act (DMCA)
        established a process for addressing claims of copyright infringement.
        If you own a copyright or have authority to act on behalf of a copyright
        owner and want to report a claim that a third party is infringing that
        material on or through {SITE_NAME}, please submit a DMCA report to the
        email above and we will take appropriate action.
      </p>
      <h3 className="mt-4 text-xl font-bold">
        To submit a DMCA request, please provide:
      </h3>
      <ul className="list-disc list-item">
        <li>
          Identification of the material that is claimed to be infringing or to
          be the subject of infringing activity, with information reasonably
          sufficient to permit us to locate the material. URLs in the body of
          the email are best.
        </li>
        <li>
          Information reasonably sufficient to permit us to contact the
          complaining party, such as an address, telephone number, and email
          address.
        </li>
        <li>
          A statement that the complaining party has a good faith belief that
          use of the material in the manner complained of is not authorized by
          the copyright owner, its agent, or the law.
        </li>
        <li>
          A statement that the information in the notification is accurate, and
          under penalty of perjury, that the complaining party is authorized to
          act on behalf of the owner of an exclusive right that is allegedly
          infringed. (Note: under Section 512(f), any person who knowingly and
          materially misrepresents that material or activity is infringing may
          be subject to liability for damages.)
        </li>
        <li>
          A physical or electronic signature of a person authorized to act on
          behalf of the owner of an exclusive right that is allegedly infringed.
        </li>
      </ul>
      <p className="mt-4 text-xl font-bold">
        {SITE_NAME} does not store any files on our server, we only link to
        media hosted on third-party services.
      </p>
    </div>
  );
};

export default Page;
