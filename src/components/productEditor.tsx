"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductForm from "./productForm";
import { useProducts } from "./productsProvider";

const messageClass =
    "mt-8 rounded-lg border border-dashed border-black/40 px-4 py-16 text-center text-sm text-black/60 dark:border-white/40 dark:text-white/60";

// No id → add a new Product; with id → edit that Product from the current list.
export default function ProductEditor({ id }: { id?: number }) {
    const router = useRouter();
    const { products, status, saveProduct } = useProducts();
    const editing = id === undefined ? null : products.find((p) => p.id === id);

    let body;
    // Also wait when adding: a fetch finishing after save would overwrite the new Product.
    if (status === "loading") {
        body = <p role="status" className={messageClass}>กำลังโหลดข้อมูล</p>;
    } else if (editing === undefined) {
        body = (
            <p className={messageClass}>
                ไม่พบสินค้า <Link href="/" className="underline">กลับไปหน้ารายการ</Link>
            </p>
        );
    } else {
        body = (
            <ProductForm
                editing={editing}
                onSave={(draft) => {
                    saveProduct(draft, id);
                    router.push("/");
                }}
                onCancel={() => router.push("/")}
            />
        );
    }

    return <main className="mx-auto container px-4 py-8 sm:px-6">{body}</main>;
}
