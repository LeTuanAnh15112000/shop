import productApiRequest from "@/apiRequests/product";
import style from "../app.module.scss";
import type { Metadata } from 'next'
import ProductEditButton from "@/app/products/_components/product-edit-button";
import ProductAddButton from "@/app/products/_components/product-add-button";
import ProductEditImage from "@/app/products/_components/product-edit-image";
 
export const metadata: Metadata = {
  title: 'Danh sách sản phẩm',
}

export default async function ProductsListPage() {
  const { payload } = await productApiRequest.getList();
  const productList = payload.data;
  return (
    <div className={style.products}>
      <h2 className={style.products_title}>Products List</h2>
      <ProductAddButton />

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
                  <ProductEditImage product={product} />
                </div>
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <ProductEditButton product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
