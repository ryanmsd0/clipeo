"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { ArrowUR } from "@/components/Icons";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "");
    const email = String(f.get("email") || "");
    const company = String(f.get("company") || "");
    const profile = String(f.get("profile") || "");
    const message = String(f.get("message") || "");
    const subject = encodeURIComponent(`Demande d'audit, ${name || company || "Clipeo"}`);
    const body = encodeURIComponent(
      `Nom : ${name}\nEmail : ${email}\nEntreprise / chaîne : ${company}\nProfil : ${profile}\n\n${message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" type="text" placeholder="Votre nom" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="vous@exemple.com" required />
      </div>
      <div className="field">
        <label htmlFor="company">Entreprise / chaîne</label>
        <input id="company" name="company" type="text" placeholder="Nom de votre marque ou chaîne" />
      </div>
      <div className="field">
        <label htmlFor="profile">Vous êtes</label>
        <select id="profile" name="profile" defaultValue="">
          <option value="" disabled>Choisissez…</option>
          <option>Créateur YouTube</option>
          <option>Marque / grand compte</option>
          <option>Podcast</option>
          <option>Cinéma / sortie</option>
          <option>Émission / Twitch</option>
          <option>Autre</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Votre projet</label>
        <textarea id="message" name="message" placeholder="Quel contenu voulez-vous faire décoller, et quel objectif visez-vous ?" />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        <span>{sent ? "Merci, votre client mail s'ouvre…" : "Demander mon audit gratuit"}</span>
        <ArrowUR />
      </button>
    </form>
  );
}
