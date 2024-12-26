'use client'
import DeleteProduct from "@/app/products/_components/delete-product";
import { Button } from "@/components/ui/button";
import { ProductListResType } from "@/schemaValidations/product.schema";
import Link from "next/link";
import style from "../../app.module.scss";
import { isClient } from "@/lib/http";

export default function ProductEditButton({
  product,
}: {
  product: ProductListResType["data"][0];
}) {
  const isAuthenticated = isClient && Boolean(localStorage.getItem("sessionToken"));
  if (!isAuthenticated)
    return (
      <div className={style.products_btn}>
        <Link href={`/products/${product.id}`}>
          <Button variant={"outline"}>Xem chi tiết</Button>
        </Link>
      </div>
    );
  return (
    <div className={style.products_btn}>
      <Link href={`/products/${product.id}/edit/`}>
        <Button variant={"outline"}>Edit</Button>
      </Link>
      <DeleteProduct product={product} />
    </div>
  );
}
