import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 分类规范（五类，categories 必须五选一）：
 * - AI4Science: 气象大模型、数据同化、气候 AI
 * - LLM-Data: LLM 数据飞轮、代码智能数据
 * - Multimodal: CLIP、视频预测、Diffusion、生成模型
 * - Engineering: 推理部署、分布式训练、踩坑记录
 * - Paper-Notes: 论文精读
 */
const post = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/post' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    description: z.string(),
    keywords: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    categories: z
      .union([
        z.enum(['AI4Science', 'LLM-Data', 'Multimodal', 'Engineering', 'Paper-Notes']),
        z.array(z.enum(['AI4Science', 'LLM-Data', 'Multimodal', 'Engineering', 'Paper-Notes'])),
      ])
      .transform((c) => (Array.isArray(c) ? c[0] : c)),
    author: z.string().default('kaizheng'),
  }),
});

export const collections = { post };
