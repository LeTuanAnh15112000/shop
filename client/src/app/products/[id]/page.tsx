import productApiRequest from "@/apiRequests/product";
import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { cache } from "react";
import envConfig from "../../../../config";
import { openGraphImage } from "@/app/shared-metadata";

const getDetail = cache(productApiRequest.getDetail);

type Props = {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { payload } = await getDetail(Number(params.id));

  const product = payload.data;
  console.log(product);
  const url = envConfig.NEXT_PUBLIC_URL + "/products/" + product.id;
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      siteName: "Productic Company",
      images: [
        {
          url: "https://nextjs.org/og.png", // Must be an absolute URL
          width: 1600,
          height: 2400,
        },
      ],
      videos: [
        {
          url: product.image, // Must be an absolute URL
          width: 1600,
          height: 2400,
        },
      ],
      ...openGraphImage,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductDetail({ params }: Props) {
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
      {product && (
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={180}
            height={180}
            className="w-32 h-32 object-cover"
          />
          <h3>{product.name}</h3>
          <div>{product.price}</div>
        </div>
      )}
    </div>
  );
}
