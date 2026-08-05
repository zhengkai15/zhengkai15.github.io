import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * 获取文章：
 * - 本地开发（dev）返回全部（含 draft，方便预览草稿）
 * - 构建（build）只返回已发布文章（draft: false）
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'post'>[]> {
  const all = await getCollection('post');
  if (import.meta.env.DEV) return all;
  return all.filter((p) => !p.data.draft);
}
