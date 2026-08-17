import type { ComponentType } from "react";
import type { Metadata } from "next";
import { Box, Code2, Pencil, Play, Scroll } from "lucide-react";

export const metadata: Metadata = {
  title: "findme",
  description: "Places to find Varun Goyal online.",
};

type LinkItemProps = {
  href: string;
  children: string;
};

const LinkItem = ({ href, children }: LinkItemProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="opacity-75 hover:opacity-100 transition-opacity duration-150"
  >
    {children}
  </a>
);

type LinkSectionProps = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  links: { href: string; text: string }[];
};

const LinkSection = ({ icon: Icon, links }: Omit<LinkSectionProps, "id">) => (
  <div className="flex items-center gap-2">
    <Icon className="opacity-40 text-sm shrink-0" />
    <div>
      {links.map((link, idx) => (
        <span key={link.href}>
          {idx > 0 && ", "}
          <LinkItem href={link.href}>{link.text}</LinkItem>
        </span>
      ))}
    </div>
  </div>
);

const SECTIONS: LinkSectionProps[] = [
  {
    id: "social",
    icon: Scroll,
    links: [
      { href: "https://x.com/Neptunevg", text: "twitter" },
      {
        href: "https://www.linkedin.com/in/varun-goyal17/",
        text: "linkedin",
      },
    ],
  },
  {
    id: "writing",
    icon: Pencil,
    links: [
      { href: "https://substack.com/@neptune17", text: "substack" },
      { href: "https://www.goodreads.com/neptunevg", text: "goodreads" },
    ],
  },
  {
    id: "curiosities",
    icon: Box,
    links: [{ href: "https://curius.app/varun-goyal", text: "curius" }],
  },
  {
    id: "watching",
    icon: Play,
    links: [
      {
        href: "https://music.youtube.com/@varungoyal940",
        text: "youtube music",
      },
      { href: "https://letterboxd.com/neptune17/", text: "letterboxd" },
      { href: "https://serializd.com/user/Neptune17/", text: "serializd" },
    ],
  },
  {
    id: "code",
    icon: Code2,
    links: [{ href: "https://github.com/Varun1722", text: "github" }],
  },
];

const ContactPage = () => (
  <div>
    <article className="prose">
      <p>lover of tea and good conversation.</p>

      <p>email: varun170402[at]gmail[dot]com</p>

      <div className="space-y-0 leading-relaxed">
        {SECTIONS.map((section) => (
          <LinkSection
            key={section.id}
            icon={section.icon}
            links={section.links}
          />
        ))}
      </div>
    </article>
  </div>
);

export default ContactPage;
