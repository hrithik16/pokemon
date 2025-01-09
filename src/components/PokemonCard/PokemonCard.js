import React, { useEffect, useState } from 'react';
import Player from '../Player/Player';
import styles from './PokemonCard.module.css';
import typeColors from './../../utils/color';

const PokemonCard = ({ item }) => {
    const [cardData, setCardData] = useState(null);

    useEffect(() => {
        const getCardData = async () => {
            try {
                const res = await fetch(item.url);
                const data = await res.json();
                setCardData(data);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };
        getCardData();
    }, [item.url]);

    if (!cardData) return <div>Loading...</div>;

    const primaryType = cardData.types[0]?.type?.name;
    const backgroundColor = typeColors[primaryType] || '#000';
    const imageSrc =
        cardData.sprites.other['official-artwork'].front_default || cardData.sprites.front_default;

    // Additional Data
    const abilities = cardData.abilities.map((a) => a.ability.name).join(', ');
    const heightInMeters = (cardData.height / 10).toFixed(2);
    const weightInKg = (cardData.weight / 10).toFixed(2);
    const moves = cardData.moves.slice(0, 5).map((m) => m.move.name).join(', ');
    const stats = cardData.stats.map((stat) => (
        <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
        </li>
    ));

    // Display Evolution Info (if any)
    const evolvesFrom = cardData.evolves_from_species ? cardData.evolves_from_species.name : 'None';

    return (
        <div className={`${styles.card}`} style={{ backgroundColor }} data-type={primaryType}>
            <h2 className={styles.name}>{cardData.name}</h2>
            <img className={styles.image} src={imageSrc} alt={cardData.name} />
            <p>Type: {cardData.types.map((t) => t.type.name).join(', ')}</p>
            <p>Height: {heightInMeters} m</p>
            <p>Weight: {weightInKg} kg</p>
            <p>Base Experience: {cardData.base_experience}</p>
            <p>Abilities: {abilities}</p>
            
            <ul className={styles.stats}>
                {stats}
            </ul>
            
            <p>Moves: {moves}</p>
            <Player audioUrl={cardData.cries.latest} />

            {/* Optional shiny sprite */}
            {cardData.sprites.front_shiny && (
                <img
                    className={styles.shinyImage}
                    src={cardData.sprites.front_shiny}
                    alt={`${cardData.name} shiny`}
                />
            )}
        
        </div>
    );
};

export default PokemonCard;
