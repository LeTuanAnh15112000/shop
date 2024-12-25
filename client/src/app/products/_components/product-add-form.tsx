"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useState, useRef } from "react";
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";
import productApiRequest from "@/apiRequests/product";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

type Product = ProductResType["data"];
export default function ProductAddForm({ product }: { product?: Product }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price ?? 0,
      description: product?.description ?? "",
      image: product?.image ?? "",
    },
  });
  const image = form.watch("image");
  const createProduct = async (values: CreateProductBodyType) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      const uploadImageResult = await productApiRequest.uploadImage(formData);
      const imageUrl = uploadImageResult.payload.data;
      const result = await productApiRequest.create({
        ...values,
        image: imageUrl,
      });
      toast({
        description: result.payload.message,
      });
      router.push("/products");
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  };
  const updateProduct = async (_values: UpdateProductBodyType) => {
    if (!product) return;
    setLoading(true);
    let values = _values;
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file as Blob);
        const uploadImageResult = await productApiRequest.uploadImage(formData);
        const imageUrl = uploadImageResult.payload.data;
        values = {
          ...values,
          image: imageUrl,
        };
      }
      const result = await productApiRequest.update(product.id, values);
      toast({
        description: result.payload.message,
      });
      router.refresh()
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  };
  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return;
    if (product) {
      await updateProduct(values);
    } else {
      await createProduct(values);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFile(file);
                      field.onChange("http://localhost:3000/" + file.name);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(file || image) && (
          <div>
            <Image
              width={400}
              height={400}
              src={file ? URL.createObjectURL(file) : image}
              alt="preview"
              className="w-24 h-24 object-cover"
              unoptimized
            />
            <Button
              type="button"
              variant={"destructive"}
              size={"sm"}
              onClick={() => {
                setFile(null);
                form.setValue("image", "");
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              Xóa hình ảnh
            </Button>
          </div>
        )}
        <Button type="submit" className="!mt-12 w-full">
          {product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </Button>
      </form>
    </Form>
  );
}
