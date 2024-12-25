import productApiRequest from "@/apiRequests/product";
import Image from "next/image";
import style from "../app.module.scss";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteProduct from "@/app/products/_components/delete-product";
import { cookies } from "next/headers";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Danh sách sản phẩm',
}

export default async function ProductsListPage() {
  const cookiesStore = await cookies();
  const sessionToken = cookiesStore.get("sessionToken");
  const isAuthenticated = Boolean(sessionToken);
  const { payload } = await productApiRequest.getList();
  const productList = payload.data;
  return (
    <div className={style.products}>
      <h2 className={style.products_title}>Products List</h2>
      {isAuthenticated && (
        <div className={style.products_add}>
          <Link href={"/products/add"}>
            <Button variant={"secondary"}>Thêm sản phẩm</Button>
          </Link>
        </div>
      )}

      <table className={style.products_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr className={style.products_item} key={product.id}>
              <td>{index + 1}</td>
              <td>
                <div className={style.products_img}>
                  {isAuthenticated && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={180}
                      height={180}
                    />
                  )}
                  {!isAuthenticated && (
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={180}
                        height={180}
                      />
                    </Link>
                  )}
                </div>
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                {isAuthenticated && (
                  <div className={style.products_btn}>
                    <Link href={`/products/${product.id}/edit/`}>
                      <Button variant={"outline"}>Edit</Button>
                    </Link>
                    <DeleteProduct product={product} />
                  </div>
                )}
                {!isAuthenticated && (
                  <div className={style.products_btn}>
                    <Link href={`/products/${product.id}`}>
                      <Button variant={"outline"}>Xem chi tiết</Button>
                    </Link>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
