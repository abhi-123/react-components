export default function SearchFilter({products}) {
  return (
    <div>
        <h2>Product List</h2>
        <ul>
            {products.map(product => (  

                <li key={product.id}>{product.title} - ${product.price}</li>
            ))}
        </ul>
    </div>
  );

}