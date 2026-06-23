import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers locale-aware de next/navigation : Link, redirect, usePathname…
// Un <Link href="/services"> ajoute automatiquement /en quand on est en anglais.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
