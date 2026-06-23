"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { SITE } from "@/lib/site";
import { ArrowUR } from "@/components/Icons";

const COPY = {
  fr: {
    nameLabel: "Nom",
    namePlaceholder: "Votre nom",
    emailLabel: "Email",
    emailPlaceholder: "vous@exemple.com",
    companyLabel: "Entreprise / chaîne",
    companyPlaceholder: "Nom de votre marque ou chaîne",
    profileLabel: "Vous êtes",
    profileChoose: "Choisissez…",
    profileCreator: "Créateur YouTube",
    profileBrand: "Marque / grand compte",
    profilePodcast: "Podcast",
    profileFilm: "Cinéma / sortie",
    profileShow: "Émission / Twitch",
    profileOther: "Autre",
    messageLabel: "Votre projet",
    messagePlaceholder: "Quel contenu voulez-vous faire décoller, et quel objectif visez-vous ?",
    submit: "Demander mon audit gratuit",
    sent: "Merci, votre client mail s'ouvre…",
    mailSubject: (who: string) => `Demande d'audit, ${who}`,
    mailBody: (name: string, email: string, company: string, profile: string, message: string) =>
      `Nom : ${name}\nEmail : ${email}\nEntreprise / chaîne : ${company}\nProfil : ${profile}\n\n${message}`,
  },
  en: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    companyLabel: "Company / channel",
    companyPlaceholder: "Your brand or channel name",
    profileLabel: "You are",
    profileChoose: "Choose…",
    profileCreator: "YouTube creator",
    profileBrand: "Brand / enterprise",
    profilePodcast: "Podcast",
    profileFilm: "Film / release",
    profileShow: "Show / Twitch",
    profileOther: "Other",
    messageLabel: "Your project",
    messagePlaceholder: "What content do you want to take off, and what goal are you aiming for?",
    submit: "Request my free audit",
    sent: "Thanks, your mail client is opening…",
    mailSubject: (who: string) => `Audit request, ${who}`,
    mailBody: (name: string, email: string, company: string, profile: string, message: string) =>
      `Name: ${name}\nEmail: ${email}\nCompany / channel: ${company}\nProfile: ${profile}\n\n${message}`,
  },
} as const;

export default function ContactForm() {
  const locale = useLocale() as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "");
    const email = String(f.get("email") || "");
    const company = String(f.get("company") || "");
    const profile = String(f.get("profile") || "");
    const message = String(f.get("message") || "");
    const subject = encodeURIComponent(t.mailSubject(name || company || "Clipeo"));
    const body = encodeURIComponent(t.mailBody(name, email, company, profile, message));
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">{t.nameLabel}</label>
        <input id="name" name="name" type="text" placeholder={t.namePlaceholder} required />
      </div>
      <div className="field">
        <label htmlFor="email">{t.emailLabel}</label>
        <input id="email" name="email" type="email" placeholder={t.emailPlaceholder} required />
      </div>
      <div className="field">
        <label htmlFor="company">{t.companyLabel}</label>
        <input id="company" name="company" type="text" placeholder={t.companyPlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="profile">{t.profileLabel}</label>
        <select id="profile" name="profile" defaultValue="">
          <option value="" disabled>{t.profileChoose}</option>
          <option>{t.profileCreator}</option>
          <option>{t.profileBrand}</option>
          <option>{t.profilePodcast}</option>
          <option>{t.profileFilm}</option>
          <option>{t.profileShow}</option>
          <option>{t.profileOther}</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">{t.messageLabel}</label>
        <textarea id="message" name="message" placeholder={t.messagePlaceholder} />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        <span>{sent ? t.sent : t.submit}</span>
        <ArrowUR />
      </button>
    </form>
  );
}
