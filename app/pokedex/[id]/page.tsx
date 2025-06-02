import React from "react";
import { notFound } from "next/navigation";

interface PokemonProps {
    params: { id: string };
}

async function getPokemon(id: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) return null;
    return res.json();
}

export default async function PokemonPage({ params }: PokemonProps) {
    const { id } = await params
    const pokemon = await getPokemon(id);
    if (!pokemon) {
        notFound();
    }
    return (
        <main className="p-8 justify-center items-center flex flex-col w-full">
            <h1 className="text-3xl font-bold capitalize mb-4 w-full max-w-2xl text-center">{pokemon.name}</h1>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={200}
                height={200}
                className="mb-4"
            />
            <div>
                <h2 className="text-xl font-semibold mb-2">Types</h2>
                <ul>
                    {pokemon.types.map((typeObj: any) => (
                        <li key={typeObj.type.name}>{typeObj.type.name}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Abilities</h2>
                <ul>
                    {pokemon.abilities.map((abilityObj: any) => (
                        <li key={abilityObj.ability.name}>{abilityObj.ability.name}</li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

