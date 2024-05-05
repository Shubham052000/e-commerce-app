import { getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";

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
  </div>
}