import React, { useEffect, useState } from 'react'
import styles from './Body.module.css'
import { BASE_URL } from '../../utils/const'
import PokemonCard from '../PokemonCard/PokemonCard'

const Body = () => {
    const [pokemonList, setPokemonList] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [buttons, setButtons] = useState([0, 1, 2, 3, 4])
    const totalPages = 130

    useEffect(() => {
        fetchData()
        updateButtons(currentPage)
    }, [currentPage])

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1)
        }
    }

    const handleButton = (key) => {
        setCurrentPage(key)
    }

    const updateButtons = (page) => {
        const newButtons = []
        const start = Math.max(page - 2, 0)
        const end = Math.min(start + 5, totalPages)
        for (let i = start; i < end; i++) {
            newButtons.push(i)
        }
        setButtons(newButtons)
    }

    const fetchData = async () => {
        try {
            const res = await fetch(`${BASE_URL}${currentPage * 10}`)
            const data = await res.json()
            setPokemonList(data.results)
        } catch (error) {
            console.error('Error fetching Pokémon data:', error)
        }
    }

    return (
        <>
            <div className={styles.container}>
                {pokemonList.map((item) => (
                    <PokemonCard key={item.name} item={item} />
                ))}
            </div>
            <div className={styles.navigation}>
                <button onClick={handlePrevious} disabled={currentPage === 0}>
                    Previous
                </button>
                {buttons.map((button, key) => (
                    <button
                        key={key}
                        className={currentPage === button ? styles.active : ''}
                        onClick={() => handleButton(button)}
                    >
                        {button + 1}
                    </button>
                ))}
                <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
                    Next
                </button>
            </div>
        </>
    )
}

export default Body
