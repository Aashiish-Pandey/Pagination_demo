function Product({ description, image }) {
  return (
    <div>
      <h3>{description}</h3>
      <img src={image} alt={description} />
    </div>
  );
}

export default Product;
