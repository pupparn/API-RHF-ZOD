"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "next-auth";
import { defaultQuery, fetchProducts } from "@/lib/product";
import type { Product, ProductDraft, ProductList, SearchQuery } from "@/lib/product";

type LoadState = "loading" | "error" | "ready";

type ProductsContextValue = {
    user: User | null;
    products: Product[];
    status: LoadState;
    errorMessage: string;
    loadProducts: (query: SearchQuery) => Promise<void>;
    saveProduct: (draft: ProductDraft, id?: number) => void;
    deleteProduct: (id: number) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

// Rendered in the root layout so Local edits survive client navigation (lost on reload).
export default function ProductsProvider(
    { user, children }: { user: User | null; children: React.ReactNode }
) {
    const [products, setProducts] = useState<Product[]>([]);
    const [status, setStatus] = useState<LoadState>("loading");
    const [errorMessage, setErrorMessage] = useState("");

    function showResult(list: ProductList) {
        setProducts(list.products);
        setStatus("ready");
    }

    function showError(error: unknown) {
        setErrorMessage(
            error instanceof Error ? error.message : "เรียกข้อมูลไม่สำเร็จ"
        );
        setStatus("error");
    }

    useEffect(() => {
        fetchProducts(defaultQuery).then(showResult).catch(showError);
    }, []);

    async function loadProducts(query: SearchQuery) {
        setStatus("loading");
        setErrorMessage("");

        try {
            showResult(await fetchProducts(query));
        } catch (error) {
            showError(error);
        }
    }

    function saveProduct(draft: ProductDraft, id?: number) {
        if (id !== undefined) {
            setProducts(products.map((p) => (p.id === id ? { ...p, ...draft } : p)));
        } else {
            setProducts([...products, { ...draft, id: Date.now() }]);
        }
    }

    function deleteProduct(id: number) {
        if (!confirm("ลบสินค้านี้?")) return;
        setProducts(products.filter((p) => p.id !== id));
    }

    return (
        <ProductsContext.Provider
            value={{ user, products, status, errorMessage, loadProducts, saveProduct, deleteProduct }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const value = useContext(ProductsContext);
    if (!value) throw new Error("useProducts must be used inside ProductsProvider");
    return value;
}
