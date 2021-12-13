import "./product.css";

export function Product({ addtocart, count, setcount, buynow }) {
  const [data] = JSON.parse(localStorage.getItem("productdata"));

  function quantityCount(value) {
    if (value == "add") setcount(count + 1);
    else {
      if (count !== 1) setcount(count - 1);
    }
  }
  return (
    <div className="product">
      <img src={data.image} alt="productimage" className="fullsizeimage"/> 
      <div className="productdetails">
        <h6> {data.productname}</h6>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas
          porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,
          purus lectus malesuada libero, sit amet commodo magna eros quis urna.
          nc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas.Proin pharetra nonummy pede. Mauris et orci. Aenean nec
          lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui
          purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris
          eget neque at sem venenatis eleifend. Ut nonummy.
        </p>
        <h5>MRP: $<b>{data.pricing * count}</b></h5>
        <div className="quantity">
          <button type="quantity" onClick={() => quantityCount("add")}>
            +
          </button>
          <h5>{count}</h5>
          <button type="quantity" onClick={() => quantityCount("sub")}>
            -
          </button>
        </div>

        <button onClick={() => addtocart(data._id, count)} className="productbtn">Add to card</button>
        <button onClick={() => buynow(data._id, count)} className="productbtn">Buy Now</button>
      </div>
    </div>
  );
}
