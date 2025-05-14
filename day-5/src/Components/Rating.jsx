import React from "react";

const Rating = () => {
  let stars = [1, 2, 3, 4, 5];
  
  const handleStar = (index) => {

    console.log(index);
  }

  return (
    <div>
      <div>{stars && stars.map((star, index) => <p key={index}
      onClick={() => handleStar(index)}
      >*</p>)}</div>
    </div>
  );
};

export default Rating;
