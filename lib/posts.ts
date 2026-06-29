import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const EN_BLOG_DIR = path.join(BLOG_DIR, "en");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readingTime: string;
  keywords?: string;
  takeaways?: string[]; // « À retenir » — points clés en tête d'article
};

function blogDir(locale: string): string {
  return locale === "en" ? EN_BLOG_DIR : BLOG_DIR;
}

export function getAllPosts(locale: string = "fr"): PostMeta[] {
  const dir = blogDir(locale);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return { slug, ...(data as Omit<PostMeta, "slug">) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string, locale: string = "fr"): { meta: PostMeta; content: string } | null {
  const file = path.join(blogDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...(data as Omit<PostMeta, "slug">) }, content };
}
