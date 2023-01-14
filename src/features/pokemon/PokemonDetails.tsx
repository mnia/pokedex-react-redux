import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-grid-system';
import NotFound from "../../components/NotFound";
import { useGetPokemonQuery } from './pokemonSlice';
import './PokemonDetails.css';

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
        <div style={{ width: "100%", marginBottom: "50px" }}>
            <Container style={{ width: "100%" }}>
                <Row>
                    <Col xs={12}>
                        <h4 style={{ fontSize: "30px" }}>
                            {`${pokemon.name}`}
                            <span style={{ color: "#777", marginLeft: "20px" }}>{`#${paddedId}`}</span>
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} lg={8}>
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
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <div className="details-container">
                            <p><span className="subtitle">Abilities</span>{abilities}</p>
                            <p><span className="subtitle">Height</span>{pokemon.height}</p>
                            <p><span className="subtitle">Weight</span>{pokemon.weight}</p>
                        </div>
                        <div className="type-container">
                            <span className="subtitle">Type</span>
                            {pokemon.types.map((item: any) =>
                                <span key={item.type.name} className="pill">{item.type.name}</span>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}