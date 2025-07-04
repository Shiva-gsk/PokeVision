import React from "react";
import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
// import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import  RadarChartRecharts  from "@/components/charts/Rechart";
interface PokemonProps {
    params: { id: string };
}

async function getPokemon(id: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) return null;
    const pokemon = await res.json();
    console.log(pokemon.stats);
    const stats = pokemon.stats.map((stat: any) =>{
        return {
            name: stat?.stat.name,
            value: stat?.base_stat
        }
    })
    console.log(stats);
    return [pokemon, stats ];
}


function capitalize(str: string| undefined): string {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function PokemonPage({ params }: PokemonProps) {

    const { id } = await params;
    const output = await getPokemon(id);
    if (!output) {
        notFound();
    }
    const [pokemon, stats] = output;
    return (
        // <main className="p-8 justify-center items-center flex flex-col w-full">
        //     <h1 className="text-3xl font-bold capitalize mb-4 w-full max-w-2xl text-center">{pokemon.name}</h1>
        //     <img
        //         src={pokemon.sprites.front_default}
        //         alt={pokemon.name}
        //         width={200}
        //         height={200}
        //         className="mb-4"
        //     />
        //     <div>
        //         <h2 className="text-xl font-semibold mb-2">Types</h2>
        //         <ul>
        //             {pokemon.types.map((typeObj: any) => (
        //                 <li key={typeObj.type.name}>{typeObj.type.name}</li>
        //             ))}
        //         </ul>
        //     </div>
        //     <div className="mt-4">
        //         <h2 className="text-xl font-semibold mb-2">Abilities</h2>
        //         <ul>
        //             {pokemon.abilities.map((abilityObj: any) => (
        //                 <li key={abilityObj.ability.name}>{abilityObj.ability.name}</li>
        //             ))}
        //         </ul>
        //     </div>
        // </main>
        <>
            <div className=" grid md:grid-cols-2 gap-4 grid-cols-1 mx-auto max-w-7xl p-8 bg-slate-400">

                <Card className="bg-red-400 items-center justify-center flex flex-col">
                    <CardHeader>
                        <h2 className="text-2xl font-bold">{capitalize(pokemon.name)}</h2>
                    </CardHeader>
                    <Image
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={250}
                        height={250}
                        className="mb-4"
                    />
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-semibold mb-2">Types</h2>
                    </CardHeader>
                    <ul className="list-disc pl-5">
                        {pokemon.types.map((typeObj: any) => (
                            <li key={typeObj.type.name}>{typeObj.type.name}</li>
                        ))}
                    </ul>
                    <CardHeader>
                        <h2 className="text-xl font-semibold mb-2 mt-4">Abilities</h2>
                    </CardHeader>
                    <ul className="list-disc pl-5">
                        {pokemon.abilities.map((abilityObj: any) => (
                            <li key={abilityObj.ability.name}>{abilityObj.ability.name}</li>
                        ))}
                    </ul>
                    

                </Card>
                

            </div>
            <div className="bg-green-400 mx-auto max-w-7xl p-8 mt-6 flex items-center justify-center">
                <RadarChartRecharts stats={stats} />
            </div>

        </>
    );
}

