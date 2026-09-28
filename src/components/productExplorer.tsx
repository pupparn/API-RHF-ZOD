"use client";

import Image from "next/image";
import Link from "next/link";
import { defaultQuery } from "@/lib/product";
import ProductSearchForm from "./productSearchForm";
import { useProducts } from "./productsProvider";

const emptyClass =
    "mt-8 rounded-lg border border-dashed border-black/40 px-4 py-16 text-center text-sm text-black/60 dark:border-white/40 dark:text-white/60";
const btnClass =
    "rounded-lg border border-black bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-wait disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:focus-visible:outline-white";

export default function ProductExplorer() {
    const { user, products, status, errorMessage, loadProducts, deleteProduct } = useProducts();

    return (
        <main className="mx-auto container px-4 py-8 sm:px-6">
            <div className="flex flex-wrap justify-end gap-2">
                {user && (
                    <Link href="/products/new" className={btnClass}>เพิ่มสินค้า</Link>
                )}
                <button
                    type="button"
                    onClick={() => loadProducts(defaultQuery)}
                    disabled={status === "loading"}
                    className={btnClass}
                >
                    {status === "loading" ? "กำลังโหลด" : "โหลดข้อมูล"}
                </button>
            </div>
            <ProductSearchForm onSearch={loadProducts} />

            <section aria-live="polite">

                {status === "loading" && (
                    <p role="status" className={`${emptyClass} flex items-center justify-center gap-3`}>
                        <span
                            aria-hidden="true"
                            className="size-4 animate-spin rounded-full border-2 border-black/20 border-t-black dark:border-white/20 dark:border-t-white"
                        />
                        กำลังโหลดข้อมูล
                    </p>
                )}

                {status === "error" && <p role="alert">{errorMessage}</p>}

                {status === "ready" && products.length === 0 && (
                    <p className={emptyClass}>ไม่พบสินค้าที่ตรงกับเงื่อนไข</p>
                )}

                {status === "ready" && products.length > 0 && (
                    <div className="mt-5 overflow-x-auto rounded-xl border border-black/10 dark:border-white/15">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-black/5 text-xs uppercase tracking-wide text-black/60 dark:bg-white/10 dark:text-white/60">
                                <tr>
                                    <th className="px-4 py-3 text-right">ลำดับ</th>
                                    <th className="px-4 py-3">สินค้า</th>
                                    <th className="px-4 py-3 text-right">ราคา</th>
                                    <th className="px-4 py-3 text-right">คงเหลือ</th>
                                    <th className="px-4 py-3">หมวดหมู่</th>
                                    {user && <th className="px-4 py-3 text-right">จัดการ</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/10 dark:divide-white/10">
                                {products.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                                        <td className="px-4 py-3 text-right tabular-nums text-black/60 dark:text-white/60">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={item.thumbnail ?? '/placeholder.gif'}
                                                    alt={item.title}
                                                    width={48}
                                                    height={48}
                                                    className="size-12 shrink-0 rounded-lg bg-black/5 object-cover dark:bg-white/10"
                                                />
                                                <span className="font-medium">{item.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right tabular-nums">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td className={`px-4 py-3 text-right tabular-nums ${item.stock < 10 ? "text-red-600 dark:text-red-400" : ""}`}>
                                            {item.stock}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs dark:bg-white/10">
                                                {item.category}
                                            </span>
                                        </td>
                                        {user && (
                                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                                <Link
                                                    href={`/products/${item.id}/edit`}
                                                    className="rounded-lg border border-black/30 px-3 py-1 text-xs transition hover:bg-black/5 dark:border-white/30 dark:hover:bg-white/10"
                                                >
                                                    แก้ไข
                                                </Link>{" "}
                                                <button
                                                    type="button"
                                                    onClick={() => deleteProduct(item.id)}
                                                    className="rounded-lg border border-red-600 px-3 py-1 text-xs text-red-600 hover:bg-red-600 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-black"
                                                >
                                                    ลบ
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

        </main>
    );
}
