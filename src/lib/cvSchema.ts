import { z } from "zod";

// ---------- Zod (validación runtime de la respuesta IA) ----------

const localizedString = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});

const localizedStringArray = z.object({
  es: z.array(z.string().min(1)),
  en: z.array(z.string().min(1)),
});

const experienceItemSchema = z.object({
  id: z.string().min(1),
  startDate: z.string().regex(/^\d{4}-\d{2}$/),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .nullable(),
  company: z.string().min(1),
  companyUrl: z.string().url().nullable(),
  location: z.string().nullable(),
  role: localizedString,
  description: localizedString,
  highlights: localizedStringArray,
  technologies: z.array(z.string().min(1)),
});

const skillItemSchema = z.object({
  label: z.string().min(1),
  icon: z.string().nullable(),
});

const skillCategorySchema = z.object({
  id: z.enum([
    "frontend",
    "backend",
    "db",
    "cloud_tools",
    "testing",
    "methodologies",
    "devops",
  ]),
  title: localizedString,
  items: z.array(skillItemSchema),
});

const aboutSchema = z.object({
  summary: localizedString,
  softSkills: localizedStringArray,
  learningNow: localizedStringArray,
  hobbies: localizedStringArray,
});

export const cvExtractionSchema = z.object({
  experience: z.array(experienceItemSchema),
  skills: z.array(skillCategorySchema),
  about: aboutSchema,
});

export type CvExtraction = z.infer<typeof cvExtractionSchema>;
export type ExperienceItemRaw = z.infer<typeof experienceItemSchema>;
export type SkillCategoryRaw = z.infer<typeof skillCategorySchema>;
export type AboutRaw = z.infer<typeof aboutSchema>;

// ---------- JSON Schema para OpenAI (response_format: json_schema strict) ----------

const localizedStringJson = {
  type: "object",
  additionalProperties: false,
  required: ["es", "en"],
  properties: {
    es: { type: "string" },
    en: { type: "string" },
  },
} as const;

const localizedArrayJson = {
  type: "object",
  additionalProperties: false,
  required: ["es", "en"],
  properties: {
    es: { type: "array", items: { type: "string" } },
    en: { type: "array", items: { type: "string" } },
  },
} as const;

export const cvExtractionJsonSchema = {
  name: "cv_extraction",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["experience", "skills", "about"],
    properties: {
      experience: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "id",
            "startDate",
            "endDate",
            "company",
            "companyUrl",
            "location",
            "role",
            "description",
            "highlights",
            "technologies",
          ],
          properties: {
            id: {
              type: "string",
              description:
                "Stable slug. Reuse from existingIds hint when company+role match; otherwise: company-role-startYear (kebab-case, ascii).",
            },
            startDate: {
              type: "string",
              description: "Format YYYY-MM",
            },
            endDate: {
              type: ["string", "null"],
              description: "Format YYYY-MM, or null if current role",
            },
            company: { type: "string" },
            companyUrl: { type: ["string", "null"] },
            location: { type: ["string", "null"] },
            role: localizedStringJson,
            description: localizedStringJson,
            highlights: localizedArrayJson,
            technologies: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
      skills: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "title", "items"],
          properties: {
            id: {
              type: "string",
              enum: [
                "frontend",
                "backend",
                "db",
                "cloud_tools",
                "testing",
                "methodologies",
                "devops",
              ],
            },
            title: localizedStringJson,
            items: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["label", "icon"],
                properties: {
                  label: { type: "string" },
                  icon: {
                    type: ["string", "null"],
                    description:
                      "Optional icon key from the IconKey set (e.g. react, next, typescript, node, mysql, mongodb, firebase, aws, gcp, salesforce, veeva, jest, cypress, git, github, gitlab, vercel). Use null if unknown.",
                  },
                },
              },
            },
          },
        },
      },
      about: {
        type: "object",
        additionalProperties: false,
        required: ["summary", "softSkills", "learningNow", "hobbies"],
        properties: {
          summary: localizedStringJson,
          softSkills: localizedArrayJson,
          learningNow: localizedArrayJson,
          hobbies: localizedArrayJson,
        },
      },
    },
  },
} as const;
