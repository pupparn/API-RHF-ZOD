"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORIES, ProductDraftSchema } from "@/lib/product";
import type { Product, ProductDraft } from "@/lib/product";

type ProductFormProps = {
    editing: Product | null;
    onSave: (draft: ProductDraft) => void;
    onCancel: () => void;
};

const fieldClass = "flex flex-col gap-1";
const labelClass = "text-xs font-medium uppercase tracking-wide text-black/60 dark:text-white/60";
const inputClass =
    "rounded-lg border border-black/30 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/20 aria-invalid:border-red-600 dark:border-white/30 dark:bg-black dark:text-white dark:focus:border-white dark:focus:ring-white/20 dark:aria-invalid:border-red-400";
const errorClass = "min-h-4 text-xs text-red-600 dark:text-red-400";
const btnClass =
    "rounded-lg border border-black bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:focus-visible:outline-white";
const cancelBtnClass =
    "rounded-lg border border-black/30 px-5 py-2 text-sm font-medium transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-white/30 dark:hover:bg-white/10 dark:focus-visible:outline-white";

export default function ProductForm(
    { editing, onSave, onCancel }: ProductFormProps
) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm<ProductDraft>({
        resolver: zodResolver(ProductDraftSchema),
        mode: "onTouched",
        defaultValues: editing
            ? {
                title: editing.title, price: editing.price,
                stock: editing.stock, category: editing.category
            }
            : { title: "", price: undefined, stock: undefined },
    });

    function saveProduct(values: ProductDraft) {
        onSave(values);
        reset();
    }


    return (
        <form
            onSubmit={handleSubmit(saveProduct)}
            noValidate
            onKeyDown={(e) => e.key === "Escape" && onCancel()}
            className={`mt-5 grid gap-4 rounded-xl border p-4 sm:grid-cols-2 ${editing ? "border-blue-600 bg-blue-600/5 dark:border-blue-400 dark:bg-blue-400/10" : "border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/5"}`}
        >
            {editing && (
                <p className="text-sm font-medium sm:col-span-2">
                    กำลังแก้ไข: <span className="text-blue-600 dark:text-blue-400">{editing.title}</span>
                    <span className="ml-2 text-xs text-black/50 dark:text-white/50">(กด Esc เพื่อยกเลิก)</span>
                </p>
            )}
            <div className={fieldClass}>
            <label htmlFor="title" className={labelClass}>ชื่อสินค้า</label>
            <input
                className={inputClass}
                id="title"
                required
                {...register("title")}
                aria-invalid={!!errors.title}
                aria-describedby="title-error"
            />
            <span id="title-error" role="alert" className={errorClass}>{errors.title?.message}</span>
            </div>
            <div className={fieldClass}>
            <label htmlFor="price" className={labelClass}>ราคา</label>
            <input
                className={inputClass}
                id="price"
                type="number"
                step="0.01"
                required
                // เติม: ตัวเลือกที่สั่งให้แปลงค่าเป็นตัวเลขก่อนส่งให้ Schema
                {...register("price", { valueAsNumber: true })}
                aria-invalid={!!errors.price}
                aria-describedby="price-error"
            />
            <span id="price-error" role="alert" className={errorClass}>{errors.price?.message}</span>
            </div>
            <div className={fieldClass}>
            <label htmlFor="stock" className={labelClass}>สินค้าคงเหลือ</label>
            <input
                className={inputClass}
                id="stock"
                type="number"
                step="1"
                required
                {...register("stock", { valueAsNumber: true })}
                aria-invalid={!!errors.stock}
                aria-describedby="stock-error"
            />
            <span id="stock-error" role="alert" className={errorClass}>{errors.stock?.message}</span>
            </div>
            <div className={fieldClass}>
            <label htmlFor="category" className={labelClass}>หมวดหมู่</label>
            <select
                className={inputClass}
                id="category"
                required
                {...register("category")}
                aria-invalid={!!errors.category}
                aria-describedby="category-error"
            >
                <option value="">กรุณาเลือกหมวดหมู่</option>
                {CATEGORIES.map((name) => (
                    <option key={name} value={name}>{name}</option>
                ))}
            </select>
            <span id="category-error" role="alert" className={errorClass}>
                {errors.category?.message}
            </span>
            </div>

            <div className="flex gap-2 sm:col-span-2">
                <button
                    type="submit"
                    className={`${btnClass} flex-1`}
                    // เติม: ค่าที่บอกว่าข้อมูลทั้งฟอร์มผ่าน Schema แล้วหรือไม่
                    disabled={!isDirty || !isValid}
                    title={!isDirty ? "ยังไม่มีการเปลี่ยนแปลง" : !isValid ? "กรุณากรอกข้อมูลให้ถูกต้อง" : undefined}
                >
                    {editing ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
                </button>

                <button type="button" onClick={onCancel} className={cancelBtnClass}>ยกเลิก</button>
            </div>

        </form>
    );
}
