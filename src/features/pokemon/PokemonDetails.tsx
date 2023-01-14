import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";
import { useGetPokemonQuery } from './pokemonSlice';

export const PokemonDetails = () => {
  let { name = "" } = useParams<"name">();

  const { data: pokemon, isFetching, isSuccess } = useGetPokemonQuery(name)
  
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (!pokemon || !isSuccess) return <NotFound />;

  let paddedId = pokemon.id.toString().padStart(3, "0");
  let imgSrc = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;
  let abilities = pokemon.abilities
      .filter((item: any) => !item.is_hidden)
      .map((item: any) => <span key={item.ability.name}>{item.ability.name}</span>);

  return (
      <div>
          <h4>{`${pokemon.name} #${paddedId}`}</h4>
          <p>Type: {pokemon.types.map((item: any) => item.type.name).join(', ')}</p>
          <p>Abilities: {abilities}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Desc: {pokemon.description}</p>
          <div className="card-image-container">
              <img
                  width={400}
                  height={400}
                  style={{
                      borderRadius: "8px",
                      maxWidth: "100%",
                      aspectRatio: "1 / 1",
                  }}
                  src={imgSrc}
                  alt={pokemon.name}
              />
          </div>
      </div>
  );
}