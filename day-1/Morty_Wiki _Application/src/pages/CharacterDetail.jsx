import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CharacterDetail = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
        <div>
            <div onClick={() => {navigate(`/`)}}>Go Back</div>
        </div>
      <div style={{ textAlign: "center" }}>
        <h2>{character.name}</h2>
        <img src={character.image} alt={character.name} />
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Location: {character.location.name}</p>
      </div>
    </div>
  );
};

export default CharacterDetail;
