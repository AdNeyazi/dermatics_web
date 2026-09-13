function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-img-box">
        <img src={product.image} alt={product.name} />
      </div>
      <span className="product-tag">{product.tag}</span>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-footer">
        <span className="price">{product.price}</span>
        <a href="tel:+919876543210" className="btn-contact">Inquire</a>
      </div>
    </div>
  );
}

export default function ProductGrid({ heading, description, products }) {
  return (
    <>
      <div className="category-header">
        <h2>{heading}</h2>
        <p>{description}</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
