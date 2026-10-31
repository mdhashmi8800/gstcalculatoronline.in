import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dateSchema = z.union([z.string(), z.date()]).transform((val) => {
  if (val instanceof Date) {
    return val.toISOString().split('T')[0];
  }
  return String(val);
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    description: z.string().optional(),
    date: dateSchema,
    lastUpdated: dateSchema.optional(),
    author: z.string().default('Hashmi Akbar'),
    readTime: z.string().optional(),
    slug: z.string().optional(),
    category: z.string().default('GST Basics'),
    draft: z.boolean().default(false).optional(),
    relatedCalculators: z.array(z.object({
      name: z.string(),
      url: z.string()
    })).optional(),
    relatedArticles: z.array(z.object({
      title: z.string(),
      slug: z.string()
    })).optional(),
    suggestedArticles: z.array(z.object({
      title: z.string(),
      slug: z.string()
    })).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional()
  })
});

const guidesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    date: dateSchema,
    lastUpdated: dateSchema.optional(),
    author: z.string().default('Hashmi Akbar'),
    readTime: z.string().optional(),
    slug: z.string().optional(),
    category: z.string().default('Tax Compliance'),
    draft: z.boolean().default(false).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional()
  })
});

export const collections = {
  blog: blogCollection,
  guides: guidesCollection,
};
