import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EcommerceExperience } from "./components/EcommerceExperience";
import type { Product } from "./types";

async function fetchProducts(): Promise<Product[]> {
    const endpoint = "https://dummyjson.com/products?limit=100";

    const response = await fetch(endpoint, {
        next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
        throw new Error("No se pudieron cargar los productos");
    }

    const data = (await response.json()) as { products: Product[] };
    return data.products;
}


function ProjectHeader() {
    return (
        <nav className="sticky top-0 z-40 mb-4 bg-[var(--background)]/85 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 pt-6 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    aria-label="Volver al portafolio"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--muted)] bg-[var(--surface)]/80 px-4 py-2 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                    <span aria-hidden className="text-base">&larr;</span>
                    <span className="tracking-wide">Volver al portafolio</span>
                </Link>
                <ThemeToggle
                    ariaLabel="Cambiar tema"
                    className="border border-[var(--muted)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)]"
                />
            </div>
        </nav>
    );
}
export default async function Page() {
    try {
        const products = await fetchProducts();
        return (
            <>
                <ProjectHeader />
                <EcommerceExperience products={products} />
            </>
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error inesperado";

        return (
            <>
                <ProjectHeader />
                <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 pb-16 pt-20 text-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-semibold">Ups, algo salio mal</h1>
                    <p className="max-w-xl text-sm text-[var(--muted-foreground)] sm:text-base">
                        {message}. Intenta recargar la pagina o vuelve en unos minutos.
                    </p>
                </section>
            </>
        );
    }
}












