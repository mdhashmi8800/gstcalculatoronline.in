import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    description: z.string().optional(),
    date: z.string(),
    lastUpdated: z.string().optional(),
    author: z.string().default('CA Amit Sharma'),
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
    date: z.string(),
    lastUpdated: z.string().optional(),
    author: z.string().default('CA Amit Sharma'),
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

const calculatorsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/calculators' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    calculatorId: z.string().optional(),
    category: z.string().default('Calculators'),
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
  calculators: calculatorsCollection,
};
