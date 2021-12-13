import { Link } from "react-router-dom";

export function Tabs({ addtocart, productpage, user }) {
  return (
    <>
  
      <div className="tab">
    
        <div className="picture">  <img src={user.image} alt="ProductImage"   className="productpicture"/></div>
      
        <div className="details">
          <Link 
            to={`productpage/${user.productname}`}
            style={{ textDecoration: "none" }}
            className="prdname"
            onClick={() => productpage(user.productname)}
          >
            {user.productname}
          </Link>
          <p className="prdprice">Amount:{user.pricing}</p>
        </div>
      </div>
    </>
  );
}
