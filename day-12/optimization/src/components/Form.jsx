import React, { useRef } from "react";

const Form = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const tagRef = useRef("");
  const farRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const tag = tagRef.current.value.split(',')
    const favorite = farRef.current.value;

    console.log("values -> ", name, email, tag, favorite);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" ref={nameRef} placeholder="Enter name" />
        </div>

        <div>
          <label>Email: </label>
          <input type="email" ref={emailRef} placeholder="Enter email" />
        </div>

        <div>
          <label>Tags: </label>
          <input type="text" placeholder="Enter tag by ,"  ref={tagRef}/>
        </div>

        <div>
          <label>
            <input type="checkbox" ref={farRef} /> Favorite
          </label>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
