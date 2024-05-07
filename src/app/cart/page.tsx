import { getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Your Cart - Flowmazon"
}

export default async function CartPage(){
  const cart = await getCart();
  
  return <div>
    <h1 className="text-3xl mb-6 font-bold">Shopping Cart</h1>
    {cart?.items.map(item => {
      return <CartEntry cartItem={item} key={item.id} setProductQuantity={setProductQuantity}/>
    })}
    {
      !cart?.items.length && <p>Your cart is empty.</p>
    }
    <div className="flex flex-col items-end sm:items-center">
      <p className="mb-3 font-bold">
        Total: {formatPrice(cart?.subTotal || 0)}
      </p>
      <button className="btn btn-primary sm:[200px]"> Checkout</button>
    </div>
  </div>
}