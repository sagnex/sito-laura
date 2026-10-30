import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Ogni servizio è un file .md in src/content/servizi
const servizi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servizi' }),
  schema: z.object({
    titolo: z.string(),
    sottotitolo: z.string(),
    ordine: z.number().default(10),
    modalita: z.string().optional(), // es. "In studio e online"
    durata: z.string().optional(), // es. "50 minuti"
    // Pronti per la vendita futura: lascia vuoti finché non servono
    prezzo: z.string().optional(),
    linkPagamento: z.string().url().or(z.literal('')).optional(),
    pubblicato: z.boolean().default(true),
  }),
});

// Ogni pensiero (articolo del blog) è un file .md in src/content/pensieri
const pensieri = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pensieri' }),
  schema: z.object({
    titolo: z.string(),
    data: z.coerce.date(),
    estratto: z.string(),
    pubblicato: z.boolean().default(true),
  }),
});

export const collections = { servizi, pensieri };
