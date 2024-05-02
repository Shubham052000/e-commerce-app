import { Cart, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/headers";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subTotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const cartId = cookies().get("localCartId")?.value;
  if (!cartId) return null;

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => {
      acc += item.quantity;
      return acc;
    }, 0),
    subTotal: cart.items.reduce((acc, item) => {
      acc += item.quantity * item.product.price;
      return acc;
    }, 0),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  //Note: Needs encryption + secure settings in real production application
  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subTotal: 0,
  };
}
