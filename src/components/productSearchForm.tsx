"use client";

import { useForm } from "react-hook-form";
import { SORT_FIELDS, defaultQuery, SearchQuerySchema } from "@/lib/product";
import type { SearchQuery } from "@/lib/product";
import { zodResolver } from "@hookform/resolvers/zod";

type ProductSearchFormProps = {
    onSearch: (query: SearchQuery) => Promise<void>;
};

const fieldClass = "flex flex-col gap-1";
const labelClass = "text-xs font-medium uppercase tracking-wide text-black/60 dark:text-white/60";
const inputClass =
    "rounded-lg border border-black/30 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/20 dark:border-white/30 dark:bg-black dark:text-white dark:focus:border-white dark:focus:ring-white/20";

export default function ProductSearchForm(
    { onSearch }: ProductSearchFormProps
) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SearchQuery>({
        resolver: zodResolver(SearchQuerySchema),
        mode: "onTouched",
        defaultValues: defaultQuery,
    });



    return (
        <form
            onSubmit={handleSubmit(onSearch)}
            className="mt-5 grid gap-4 rounded-xl border border-black/10 bg-black/5 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-start dark:border-white/15 dark:bg-white/5"
        >
            <div className={fieldClass}>
                <label htmlFor="q" className={labelClass}>คำค้น</label>
                <input
                    id="q"
                    {...register("q")}
                    placeholder="ชื่อสินค้า"
                    className={inputClass}
                />
            </div>

            <div className={fieldClass}>
                <label htmlFor="limit" className={labelClass}>จำนวนรายการ</label>
                <input
                    id="limit"
                    type="number"
                    required
                    {...register("limit", { valueAsNumber: true })}
                    aria-invalid={!!errors.limit}
                    aria-describedby="limit-error"
                    className={`${inputClass} aria-invalid:border-red-600 dark:aria-invalid:border-red-400`}
                />
                <span
                    id="limit-error"
                    role="alert"
                    className="text-xs text-red-600 dark:text-red-400"
                >
                    {errors.limit?.message}
                </span>
            </div>

            <div className={fieldClass}>
                <label htmlFor="sortBy" className={labelClass}>เรียงตาม</label>
                <select id="sortBy" {...register("sortBy")} className={inputClass}>
                    {SORT_FIELDS.map((field) => (
                        <option key={field} value={field}>{field}</option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="h-10 rounded-lg border border-black bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-wait disabled:opacity-50 sm:col-span-2 lg:col-span-1 lg:mt-5 dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:focus-visible:outline-white"
            >
                ค้นหา
            </button>
        </form>
    );
}
