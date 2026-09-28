import ProductEditor from "@/components/productEditor";

export default async function EditProductPage({ params }: PageProps<"/products/[id]/edit">) {
    const { id } = await params;
    return <ProductEditor id={Number(id)} />;
}
