export function Component({ user, removecart,name }) {
  return (
    <>
      <div className="component">
        <p className="prdname">
          <span>Product:</span>
          {user.productname}
        </p>
        <p className="prdprice">
          <span>Amount:</span>
          {user.amount}
        </p>
        <p>
          <span>Quantity:</span>
          {user.count}
        </p>
       {name !=="carthistory" &&   <button
          onClick={() => removecart(user.productname)}
          className="removebtn"
        >
          Remove
        </button>}
      
      </div>
    </>
  );
}
