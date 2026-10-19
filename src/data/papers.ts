import { getCollection } from 'astro:content';

/** Published papers, newest first. */
export async function getPapers() {
  const papers = await getCollection('papers', ({ data }) => !data.draft);
  return papers.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function formatDate(date: Date, month: 'short' | 'long' = 'short') {
  // Frontmatter dates are parsed as UTC midnight; format in UTC so they don't shift a day.
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month, day: 'numeric', timeZone: 'UTC' }).format(date);
}
