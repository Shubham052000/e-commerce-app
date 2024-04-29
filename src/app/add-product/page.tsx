export const metadata = {
  title: "Add Product - Flowmazon",
};

export default function AddProductPage() {
  return (
    <>
      <h1 className="text-lg mb-2 font-bold">Add Product</h1>
      <form>
        <input
          required
          name="name"
          placeholder="Product Name"
          className="input input-bordered mb-2 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Product Description"
          className="textarea textarea-bordered mb-2 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input input-bordered mb-2 w-full"
        />
        <input
          required
          name="price"
          placeholder="Product Price"
          type="number"
          className="input input-bordered mb-2 w-full"
        />
        <button type="submit" className="btn btn-primary btn-block">
          Add Product
        </button>
      </form>
    </>
  );
}
