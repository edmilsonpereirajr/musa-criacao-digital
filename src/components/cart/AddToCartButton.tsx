"use client";

import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  productId: string;
  slug: string;
  title: string;
  price: number;
};

export function AddToCartButton({
  productId,
  slug,
  title,
  price,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem({
      productId,
      slug,
      title,
      price,
    });
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="w-full rounded-full bg-[#d42367] px-7 py-4 font-medium text-white transition-colors hover:bg-[#b91d58]"
    >
      Adicionar ao carrinho
    </button>
  );
}