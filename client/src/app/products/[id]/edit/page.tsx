import productApiRequest from "@/apiRequests/product";
import ProductAddForm from "@/app/products/_components/product-add-form";
import { cache } from "react";
import type { Metadata } from "next";

const getDetail = cache(productApiRequest.getDetail);

type Props = {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  // fetch data
  const { payload } = await getDetail(Number(params.id));
  const product = payload.data;

  return {
    title: 'Edit sản phẩm ' + product.name,
  };
}

export default async function ProductEdit({ params }: Props) {
  let product = null;
  try {
    if (params.id) {
      const { payload } = await getDetail(Number(params.id));
      product = payload.data;
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      {product && <ProductAddForm product={product} />}
    </div>
  );
}
