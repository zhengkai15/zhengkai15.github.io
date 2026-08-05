import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts';

export async function GET(context: any) {
  const posts = (await getPublishedPosts()).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Kai Zheng | AI4Science',
    description:
      'Kai Zheng - Algorithm Engineer focusing on AI for Science, Weather Forecasting Foundation Models, and Multimodal Generation',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/post/${post.id}/`,
      categories: [post.data.categories, ...post.data.tags],
    })),
    customData: '<language>zh-CN</language>',
  });
}
