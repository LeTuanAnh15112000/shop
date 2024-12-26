"use client";

import { isClient } from "@/lib/http";
import { ProductListResType } from "@/schemaValidations/product.schema";
import Image from "next/image";
import Link from "next/link";

export default function ProductEditImage({product} : {product: ProductListResType['data'][0]}) {
  const isAuthenticated =isClient && Boolean(localStorage.getItem("sessionToken"));
  if (!isAuthenticated) {
    return (
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={180}
        />
      </Link>
    );
  } else {
    return (
      <Image src={product.image} alt={product.name} width={180} height={180} />
    );
  }
  return <div></div>;
}
