# Portfolio (Next.js + TypeScript)

Portfolio profesional, moderno y rápido, orientado a ATS y con UX/UI cuidada.

- Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4
- Data-driven: todo el contenido vive en `src/data` (sin hardcode en componentes)
- Feature-based: preferencias (tema/idioma) en `src/features/preferences`
- SEO básico: metadata, OpenGraph, `sitemap.xml`, `robots.txt`
- Iconos: `react-icons`

## Requisitos cubiertos

- Home `/`: Hero (nombre + headline), proyectos principales, skills, CTA de contacto
- `/projects`: listado completo + filtros (tech/tipo) + sección “Más trabajos”
- `/about`: soft skills, learning, hobbies
- `/contact`: email visible + botón copiar + enlaces GitHub/LinkedIn
- `/cv`: vista previa (embed) + descarga (ES/EN según idioma) + link en navbar
- Toggles: Dark/Light + Español/Inglés

## Estructura del proyecto

```txt
public/
	images/
		headshot.png
		headshot-placeholder.svg
		og-placeholder.svg
	pdf/
		cv-es.pdf
		cv-en.pdf
	projects/
		project-placeholder-1.svg
		project-placeholder-2.svg
		project-placeholder-3.svg
		project-placeholder-4.svg

src/
	app/
		about/page.tsx
		contact/page.tsx
		cv/page.tsx
		projects/page.tsx
		layout.tsx
		page.tsx
		providers.tsx
		robots.ts
		sitemap.ts
		globals.css

	components/
		layout/
			Header.tsx
			SiteLayout.tsx
			footer.tsx
		sections/
			ContactCtaSection.tsx
			FeaturedProjectsSection.tsx
			HeroSection.tsx
			SkillsSection.tsx
		ui/
			badge.tsx
			button.tsx
			card.tsx
			section.tsx
			Container.tsx
			CopyButton.tsx
			LocaleToggle.tsx
			ProjectCard.tsx
			ThemeToggle.tsx

	data/
		i18n.ts
		profile.ts
		projects.ts
		site.ts
		skills.ts

	features/
		preferences/
			LocaleProvider.tsx
			ThemeProvider.tsx

	lib/
		cn.ts
		types.ts
```

## Configuración (instalación y ejecución)

### 1) Instalar dependencias

```bash
npm install
```

### 2) Ejecutar en desarrollo

```bash
npm run dev
```

Abrir `http://localhost:3000`.

### 3) Build de producción

```bash
npm run build
npm run start
```

## Cómo editar tu contenido (sin hardcode)

Edita estos archivos:

- `src/data/profile.ts`: nombre, headline, email, links, soft skills, learning y hobbies
- `src/data/projects.ts`: proyectos principales (featured) y “Más trabajos” (no featured)
- `src/data/skills.ts`: skills por categorías (Front-end, Back-end, DB, Tools, Testing)
- `src/data/site.ts`: `siteUrl`, title/description y OpenGraph

Todo lo que veas como `TODO:` es un placeholder intencional.

## CV (ES/EN)

Este portfolio soporta 2 PDFs y muestra el correcto según el idioma:

- Español: `public/pdf/cv-es.pdf` → URL: `/pdf/cv-es.pdf`
- English: `public/pdf/cv-en.pdf` → URL: `/pdf/cv-en.pdf`

Si aún no los tienes, deja los placeholders y reemplázalos cuando estén listos.

## SEO

- Metadata y OpenGraph: `src/app/layout.tsx` + `src/data/site.ts`
- Sitemap: `src/app/sitemap.ts`
- Robots: `src/app/robots.ts`

## Notas de diseño

- Tema consistente por tokens CSS (Tailwind v4) y `html.dark`
- Imágenes placeholders con proporción consistente (proyectos 16:10)
- Skills: hover con color “brand” por tecnología (fallback a `--accent`)
- Layout: footer “sticky” (siempre abajo) via flex layout
- Accesibilidad base: labels, focus rings, aria-label en toggles

## Foto de perfil

- Coloca tu imagen en `public/images/headshot.png`
- Configura el path en `src/data/profile.ts` (`headshot.src`)
