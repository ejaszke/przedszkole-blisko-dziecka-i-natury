import { marked } from 'marked';

marked.use({ async: false, breaks: false, gfm: true });

export function md(value: unknown): string {
  if (typeof value !== 'string' || value.trim() === '') return '';
  return marked.parse(value) as string;
}
