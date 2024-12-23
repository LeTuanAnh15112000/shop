import productApiRequest from "@/apiRequests/product";
import Image from "next/image";
import style from "../app.module.scss";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteProduct from "@/app/products/_components/delete-product";

export default async function ProductsListPage() {
  const { payload } = await productApiRequest.getList();
  const productList = payload.data;
  return (
    <div className={style.products}>
      <h2 className={style.products_title}>Products List</h2>
      <div className={style.products_add}>
        <Link href={"/products/add"}>
          <Button variant={"secondary"}>Thêm sản phẩm</Button>
        </Link>
      </div>
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
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={180}
                />
                </div>
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <div className={style.products_btn}>
                  <Link href={`/products/${product.id}`}>
                    <Button variant={"outline"}>Edit</Button>
                  </Link>
                  <DeleteProduct product={product} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
