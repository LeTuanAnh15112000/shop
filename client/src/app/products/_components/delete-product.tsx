"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProductResType } from "@/schemaValidations/product.schema";
import { useToast } from "@/hooks/use-toast";
import productApiRequest from "@/apiRequests/product";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function DeleteProduct({
  product,
}: {
  product: ProductResType["data"];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const deleteProduct = async () => {
    try {
      const result = await productApiRequest.delete(product.id);
      // nó sẽ ép component này re-render lại
      router.refresh();
      toast({
        description: result.payload.message,
      });
    } catch (error) {
      handleErrorApi({error});
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có muốn xóa sản phẩm không?</AlertDialogTitle>
            <AlertDialogDescription>
              Sản phẩm &rdquo;{product.name}&rdquo; sẽ bị xóa vĩnh viển!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
