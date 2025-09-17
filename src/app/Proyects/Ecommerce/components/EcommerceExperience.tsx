"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { Product } from "../types";

type CartItem = {
  product: Product;
  quantity: number;
};

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const ITEMS_PER_PAGE = 12;

function getDiscountedPrice(product: Product) {
  const discountMultiplier = 1 - product.discountPercentage / 100;
  const discounted = product.price * Math.max(discountMultiplier, 0);
  return Number(discounted.toFixed(2));
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function EcommerceExperience({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const priceBounds = useMemo(() => {
    if (!products.length) {
      return { min: 0, max: 0 };
    }

    const discountedPrices = products.map((product) => getDiscountedPrice(product));
    const minPrice = Math.floor(Math.min(...discountedPrices));
    const maxPrice = Math.ceil(Math.max(...discountedPrices));

    return { min: minPrice, max: maxPrice };
  }, [products]);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    products.forEach((product) => unique.add(product.category));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState<number>(priceBounds.min);
  const [maxPrice, setMaxPrice] = useState<number>(priceBounds.max);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!checkoutMessage) return;

    const timeout = window.setTimeout(() => setCheckoutMessage(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [checkoutMessage]);

  useEffect(() => {
    setMinPrice(priceBounds.min);
    setMaxPrice(priceBounds.max);
  }, [priceBounds.min, priceBounds.max]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const finalPrice = getDiscountedPrice(product);
      const matchesPrice = finalPrice >= minPrice && finalPrice <= maxPrice;
      if (!matchesPrice) return false;

      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      if (normalizedSearch) {
        const searchTarget = `${product.title} ${product.brand} ${product.category}`.toLowerCase();
        if (!searchTarget.includes(normalizedSearch)) {
          return false;
        }
      }

      return true;
    });
  }, [products, searchTerm, selectedCategory, minPrice, maxPrice]);

  const totalPages = useMemo(() => {
    if (!filteredProducts.length) return 1;
    return Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  }, [filteredProducts.length]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [cart],
  );

  const totalDiscount = useMemo(
    () =>
      cart.reduce(
        (acc, item) =>
          acc +
          (item.product.price - getDiscountedPrice(item.product)) * item.quantity,
        0,
      ),
    [cart],
  );

  const total = subtotal - totalDiscount;

  const showingFrom = paginatedProducts.length
    ? (currentPage - 1) * ITEMS_PER_PAGE + 1
    : 0;
  const showingTo = paginatedProducts.length
    ? showingFrom + paginatedProducts.length - 1
    : 0;

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.product.id === product.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = {
          ...next[index],
          quantity: next[index].quantity + 1,
        };
        return next;
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const decrementFromCart = (productId: number) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.product.id === productId);
      if (index === -1) return prev;

      const item = prev[index];
      if (item.quantity === 1) {
        return prev.filter((entry) => entry.product.id !== productId);
      }

      const next = [...prev];
      next[index] = { ...item, quantity: item.quantity - 1 };
      return next;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    if (!cart.length) return;

    setCheckoutMessage("Pedido recibido! Te contactaremos pronto para coordinar la entrega.");
    setCart([]);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setMinPrice(priceBounds.min);
    setMaxPrice(priceBounds.max);
  };

  const handleMinPriceChange = (value: string) => {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return;

    const newMin = clampValue(numeric, priceBounds.min, priceBounds.max);
    setMinPrice(newMin);
    setMaxPrice((prev) => clampValue(Math.max(prev, newMin), priceBounds.min, priceBounds.max));
  };

  const handleMaxPriceChange = (value: string) => {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return;

    const newMax = clampValue(numeric, priceBounds.min, priceBounds.max);
    setMaxPrice(newMax);
    setMinPrice((prev) => clampValue(Math.min(prev, newMax), priceBounds.min, priceBounds.max));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  const renderPriceBadge = (product: Product) => {
    const discountedPrice = getDiscountedPrice(product);
    const hasDiscount = discountedPrice < product.price;

    return (
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-sm font-medium text-[var(--accent-foreground)]">
          {currencyFormatter.format(discountedPrice)}
        </span>
        {hasDiscount ? (
          <span className="text-xs text-[var(--muted-foreground)] line-through">
            {currencyFormatter.format(product.price)}
          </span>
        ) : null}
      </div>
    );
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="flex justify-end">
      </div>
      <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--muted-foreground)]">
            Proyecto destacado
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Ecommerce minimalista</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
            Catalogo dinamico alimentado por DummyJSON. Explora productos, revisa los detalles,
            arma tu carrito y simula un checkout con una experiencia adaptada a modo claro y oscuro.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--muted)] bg-[var(--surface)] px-5 py-4 text-sm shadow-sm backdrop-blur">
          <p className="flex items-center gap-3 font-medium">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
              {totalItems}
            </span>
            Productos en el carrito
          </p>
        </div>
      </div>

      {checkoutMessage ? (
        <div className="rounded-lg border border-[var(--accent)] bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent)] shadow-sm">
          {checkoutMessage}
        </div>
      ) : null}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-[var(--muted)] bg-[var(--card)] p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Filtrar catalogo</h2>
                <p className="text-xs text-[var(--muted-foreground)] sm:text-sm">
                  Busca por nombre o marca, limita por categoria y ajusta el rango de precios.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center justify-center rounded-full border border-[var(--muted)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)] sm:text-sm"
              >
                Limpiar filtros
              </button>
            </div>
            <form className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Buscar
                </span>
                <input
                  type="search"
                  placeholder="Nombre del producto o marca"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="rounded-xl border border-transparent bg-[var(--surface)] px-4 py-3 text-sm shadow-inner outline-none transition focus:border-[var(--accent)]"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Categoria
                </span>
                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="rounded-xl border border-transparent bg-[var(--surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                >
                  <option value="all">Todas</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.replaceAll("-", " ")}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Precio minimo
                </span>
                <input
                  type="number"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  value={minPrice}
                  onChange={(event) => handleMinPriceChange(event.target.value)}
                  className="rounded-xl border border-transparent bg-[var(--surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Precio maximo
                </span>
                <input
                  type="number"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  value={maxPrice}
                  onChange={(event) => handleMaxPriceChange(event.target.value)}
                  className="rounded-xl border border-transparent bg-[var(--surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                />
              </div>
            </form>
            <div className="mt-4 flex flex-col gap-2 text-xs text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between sm:text-sm">
              <span>
                Rango disponible: {currencyFormatter.format(priceBounds.min)} - {currencyFormatter.format(priceBounds.max)}
              </span>
              <span>
                Mostrando {showingFrom || 0}-{showingTo || 0} de {filteredProducts.length} productos
              </span>
            </div>
          </section>

          {paginatedProducts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <article
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--muted)] bg-[var(--card)] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-[var(--surface)]">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                      priority={product.id <= 6}
                    />
                    <div className="absolute left-3 top-3">{renderPriceBadge(product)}</div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <header className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-[var(--muted)] px-3 py-1 text-xs font-medium capitalize text-[var(--muted-foreground)]">
                          {product.category.replaceAll("-", " ")}
                        </span>
                        <span className="text-xs text-[var(--muted-foreground)]">
                          Rating {product.rating.toFixed(1)} | Stock {product.stock}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold leading-tight">{product.title}</h2>
                      <p className="line-clamp-2 text-sm text-[var(--muted-foreground)]">
                        {product.description}
                      </p>
                    </header>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                        {product.brand}
                      </span>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          addToCart(product);
                        }}
                        className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-foreground)] transition hover:bg-[var(--accent)]/90"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--muted)] bg-[var(--surface)]/50 px-6 py-12 text-center">
              <p className="text-lg font-semibold">No se encontraron productos</p>
              <p className="max-w-md text-sm text-[var(--muted-foreground)]">
                Ajusta los filtros o reinicialos para ver todo el catalogo disponible.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-foreground)] transition hover:bg-[var(--accent)]/90"
              >
                Volver a ver todo
              </button>
            </div>
          )}

          {totalPages > 1 ? (
            <nav
              className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[var(--muted)] bg-[var(--card)] px-4 py-3 shadow-sm sm:flex-row"
              aria-label="Paginacion de productos"
            >
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center rounded-full border border-[var(--muted)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
              >
                Anterior
              </button>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {pages.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[2.5rem] rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                      page === currentPage
                        ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                        : "border border-[var(--muted)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface)]/80"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center rounded-full border border-[var(--muted)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
              >
                Siguiente
              </button>
            </nav>
          ) : null}
        </div>

        <aside className="flex h-fit flex-col gap-4 rounded-2xl border border-[var(--muted)] bg-[var(--card)] p-6 shadow-sm lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Tu carrito</h3>
            <span className="text-sm text-[var(--muted-foreground)]">{totalItems} articulos</span>
          </div>
          <div className="flex flex-col gap-4">
            {cart.length ? (
              cart.map((item) => {
                const discountedPrice = getDiscountedPrice(item.product);

                return (
                  <div key={item.product.id} className="flex gap-3 rounded-xl bg-[var(--surface)]/70 p-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-medium leading-tight">{item.product.title}</p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-xs text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
                        >
                          Quitar
                        </button>
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)]">{item.product.brand}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full bg-[var(--muted)] px-2 py-1 text-xs">
                          <button
                            type="button"
                            onClick={() => decrementFromCart(item.product.id)}
                            className="h-5 w-5 rounded-full bg-[var(--card)] text-[var(--foreground)] shadow"
                            aria-label={`Reducir cantidad de ${item.product.title}`}
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(item.product)}
                            className="h-5 w-5 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] shadow"
                            aria-label={`Aumentar cantidad de ${item.product.title}`}
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {currencyFormatter.format(discountedPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="rounded-xl border border-dashed border-[var(--muted)] bg-[var(--surface)]/50 px-4 py-6 text-center text-sm text-[var(--muted-foreground)]">
                Aun no hay productos en tu carrito. Elige tus favoritos.
              </p>
            )}
          </div>

          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-[var(--muted-foreground)]">Subtotal</dt>
              <dd>{currencyFormatter.format(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--muted-foreground)]">Descuentos</dt>
              <dd>-{currencyFormatter.format(totalDiscount)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--muted-foreground)]">Envio estimado</dt>
              <dd>{currencyFormatter.format(total ? 12 : 0)}</dd>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <dt>Total</dt>
              <dd>{currencyFormatter.format(total + (total ? 12 : 0))}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={!cart.length}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--accent-foreground)] shadow transition hover:bg-[var(--accent)]/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Proceder al checkout
          </button>
        </aside>
      </div>

      {selectedProduct ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-detail-title"
        >
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-[var(--muted)] bg-[var(--card)] shadow-xl">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-xl text-[var(--muted-foreground)] shadow"
              aria-label="Cerrar detalle"
            >
              X
            </button>
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
              <div className="relative h-72 w-full md:h-full">
                <Image
                  src={selectedProduct.images.at(0) ?? selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div className="space-y-2">
                  <h2 id="product-detail-title" className="text-2xl font-semibold">
                    {selectedProduct.title}
                  </h2>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {selectedProduct.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <span className="rounded-full bg-[var(--muted)] px-3 py-1 font-medium capitalize">
                    {selectedProduct.category.replaceAll("-", " ")}
                  </span>
                  <span>Marca {selectedProduct.brand}</span>
                  <span>Rating {selectedProduct.rating.toFixed(1)}</span>
                  <span>Stock {selectedProduct.stock} unidades</span>
                </div>
                <div className="flex flex-col gap-3">
                  {selectedProduct.images.length > 1 ? (
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {selectedProduct.images.slice(0, 5).map((image) => (
                        <div key={image} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--muted)]">
                          <Image src={image} alt={selectedProduct.title} fill sizes="80px" className="object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div>{renderPriceBadge(selectedProduct)}</div>
                </div>
                <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="order-2 rounded-full border border-[var(--muted)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface)] sm:order-1"
                  >
                    Seguir explorando
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="order-1 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition hover:bg-[var(--accent)]/90 sm:order-2"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

