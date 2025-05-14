import React, { useRef, useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [formData, setFormData] = useState([]);

  let rating = [1, 2, 3, 4, 5];

  const ratingRef = useRef("");

  // form
  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData([
      ...formData,
      { name: name, feedback: feedback, rating: ratingRef.current.value },
    ]);
  };

  console.log("data", formData);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              type="text"
              value={name}
              name="name"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              value={feedback}
              name="feedback"
              placeholder="Enter feedback"
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <div>
            {rating &&
              rating.map((rate, index) => (
                <span key={index} ref={ratingRef}>
                  {rate}
                </span>
              ))}
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
