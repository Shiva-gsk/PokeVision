"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Captured, Pokemon } from "@/types";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { off } from "process";
import { db } from "@/lib/db";
import { useSession } from "next-auth/react";
import { create } from "domain";
import { getPokemon } from "@/data/pokemon";

// // Mock data for Pokédex entries
// const pokemonEntries = [
//   {
//     id: 25,
//     name: "Pikachu",
//     type: "Electric",
//     captured: true,
//     date: "2023-05-15",
//   },
//   {
//     id: 1,
//     name: "Bulbasaur",
//     type: "Grass",
//     captured: true,
//     date: "2023-05-10",
//   },
//   {
//     id: 7,
//     name: "Squirtle",
//     type: "Water",
//     captured: true,
//     date: "2023-05-12",
//   },
//   {
//     id: 4,
//     name: "Charmander",
//     type: "Fire",
//     captured: false,
//     date: null,
//   },
//   {
//     id: 133,
//     name: "Eevee",
//     type: "Normal",
//     captured: false,
//     date: null,
//   },
// ];

// Map Pokémon types to colors
const typeColors: Record<string, string> = {
  Normal: "bg-gray-400",
  Fire: "bg-red-500",
  Water: "bg-blue-500",
  Electric: "bg-yellow-400",
  Grass: "bg-green-500",
  Ice: "bg-cyan-300",
  Fighting: "bg-red-700",
  Poison: "bg-purple-600",
  Ground: "bg-yellow-700",
  Flying: "bg-indigo-300",
  Psychic: "bg-pink-500",
  Bug: "bg-lime-500",
  Rock: "bg-yellow-800",
  Ghost: "bg-indigo-700",
  Dragon: "bg-purple-800",
  Dark: "bg-gray-800",
  Steel: "bg-gray-500",
  Fairy: "bg-pink-300"
};

export default function PokedexPage() {
  const [pokemonEntries, setPokemon] = useState<Pokemon[]>([]);
  const [searchPokemon, setSearchPokemon] = useState<Pokemon[]>([]);
  // const [offset, setOffset] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [capturedPokemon, setCapturedPokemon] = useState<Captured []>([]);
   const [searchTerm, setSearchTerm] = useState<string>("");
   const { data: session } = useSession();
  // const [limit, setLimit] = useState(10);
  let offset = (currentPage-1) * 10;

  useEffect(()=>{
    async function loadCaptured() {

      const captured = await getPokemon();
       const list: Captured[] = [];
       captured.map((poke) => {
         list.push({
           id: poke.id,
           image: poke.imgUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`,
           type: poke.type ? poke.type.split("/") : ["Unknown"],
           createdAt: poke.createdAt.toLocaleDateString() || null,
         });
       });
       setCapturedPokemon(list);
    }
    loadCaptured();

  }, [session]);
  

  useEffect(() => {
    async function fetchSearchPokemon() {
     
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
      const data = await res.json();
      const pokemonData = await Promise.all(
        data.results.filter((pokemon: any) => {
          const id = pokemon.url.split("/").slice(-2)[0];
          if (searchTerm) {
            return (
              pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || id.includes(searchTerm)
            );
          }
          return false;
        }).map(async (pokemon: any, index: number) => {
          const id = pokemon.url.split("/").slice(-2)[0];
          const captured = capturedPokemon.filter((poke) => poke.id == id);
          return {
            id,
            name: pokemon.name,
            type: captured.length > 0 ? captured[0].type[0] : "Unknown",
            type2: captured.length > 0 ? captured[0].type[1] : null,
            image: captured.length > 0 ? captured[0].image : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            captured: captured.length > 0,
            createdAt: captured.length > 0 ? captured[0].createdAt : null,
          };
        })
      );
      setSearchPokemon(pokemonData);
      console.log(capturedPokemon)
    }
    fetchSearchPokemon();
  }, [capturedPokemon, searchTerm]);

  useEffect(() => {
    async function fetchPokemon() {
     
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
      const data = await res.json();
      const pokemonData = await Promise.all(
        data.results.map(async (pokemon: any, index: number) => {
          const id = index + 1 + offset;
          const captured = capturedPokemon.filter((poke) => poke.id === id);
          return {
            id,
            name: pokemon.name,
            type: captured.length > 0 ? captured[0].type[0] : "Unknown",
            type2: captured.length > 0 ? captured[0].type[1] : null,
            image: captured.length > 0 ? captured[0].image : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            captured: captured.length > 0,
            createdAt: captured.length > 0 ? captured[0].createdAt : null,
          };
        })
      );
      setPokemon(pokemonData);
      // console.log(capturedPokemon)
    }
    fetchPokemon();
  }, [offset, currentPage, capturedPokemon]);

  if (pokemonEntries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Pokédex</h1>
        <p className="text-center text-gray-500">
          No Pokémon found. Start capturing some!
        </p>
      </div>
    );
  }
  const totalPages = 1000;
 
  const maxPageButtons = 3;

  const getPageNumbers = () => {
    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxPageButtons - 1);

    // adjust start if we're near the end
    if (end - start < maxPageButtons - 1) {
      start = Math.max(1, end - maxPageButtons + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    // <div className="container mx-auto px-4 py-8">
    //   {/* Update the heading with the gradient effect */}
    //   <h1 className="text-3xl font-bold text-center text-gradient-pokemon mb-8">
    //     Your Pokédex
    //   </h1>

    //   <div className="max-w-3xl mx-auto">
    //     <div className="relative mb-6">
    //       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    //       <Input
    //         placeholder="Search Pokémon by name or number..."
    //         className="pl-10"
    //       />
    //     </div>

    //     {/* Make the Pokédex grid more responsive */}
    //     <div className="grid grid-cols-1 gap-3 sm:gap-4">
    //       {pokemonEntries.map((pokemon) => (
    //         <Link href={`/pokedex/${pokemon.id}`} key={pokemon.id}>
    //           <Card
    //             className={`cursor-pointer transition-all hover:shadow-md ${
    //               !pokemon.captured ? "opacity-60 grayscale" : ""
    //             }`}
    //           >
    //             <CardContent className="p-3 sm:p-4 flex items-center">
    //               <div className="relative h-12 w-12 sm:h-16 sm:w-16 mr-3 sm:mr-4 flex-shrink-0">
    //                 <Image
    //                   src={pokemon.image}
    //                   alt={pokemon.name}
    //                   fill
    //                   className="object-contain"
    //                 />
    //               </div>
    //               <div className="flex-1">
    //                 <div className="flex justify-between items-start">
    //                   <div>
    //                     <h3 className="font-medium text-sm sm:text-base">
    //                       {pokemon.name}
    //                     </h3>
    //                     <div className="flex items-center mt-1">
    //                       <Badge
    //                         className={`${
    //                           typeColors[pokemon.type] || "bg-gray-400"
    //                         } hover:${
    //                           typeColors[pokemon.type] || "bg-gray-400"
    //                         } text-xs`}
    //                       >
    //                         {pokemon.type}
    //                       </Badge>
    //                       <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
    //                         #{pokemon.id.toString().padStart(3, "0")}
    //                       </span>
    //                     </div>
    //                   </div>
    //                   <div className="text-right text-xs text-gray-500 dark:text-gray-400">
    //                     {pokemon.captured ? (
    //                       <>
    //                         <span className="block">Captured</span>
    //                         <span>{pokemon.date}</span>
    //                       </>
    //                     ) : (
    //                       <span>Not captured</span>
    //                     )}
    //                   </div>
    //                 </div>
    //               </div>
    //             </CardContent>
    //           </Card>
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <div className="m-4">
      <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold text-center text-gradient-pokemon mb-8">
        Your Pokédex
      </h1>
       <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search Pokémon by name or number..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            />
        </div>
            </div>
      {(searchTerm.length) >0? <PokeList pokemonEntries={searchPokemon} /> :<> <PokeList pokemonEntries={pokemonEntries} />
      
      <Pagination>
        <PaginationItem>
          <PaginationPrevious
            
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          />
        </PaginationItem>

        {getPageNumbers().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
             
              isActive={pageNum === currentPage}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
          
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          />
        </PaginationItem>
      </Pagination>
      </>}


    </div>
  );
}

function PokeList({ pokemonEntries }: { pokemonEntries: Pokemon[] }) {
  if (pokemonEntries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Pokédex</h1>
        <p className="text-center text-gray-500">
          No Pokémon found. Start capturing some!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Update the heading with the gradient effect */}
      

      <div className="max-w-3xl mx-auto">
       

        {/* Make the Pokédex grid more responsive */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {pokemonEntries.map((pokemon) => (
            <Link href={`/pokedex/${pokemon.id}`} key={pokemon.id}>
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${!pokemon.captured ? "opacity-60 grayscale" : ""
                  }`}
              >
                <CardContent className="p-3 sm:p-4 flex items-center">
                  <div className="relative h-12 w-12 sm:h-16 sm:w-16 mr-3 sm:mr-4 flex-shrink-0">
                    <Image
                      src={pokemon.image}
                      alt={pokemon.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">
                          {pokemon.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Badge
                            className={`${typeColors[pokemon.type] || "bg-gray-400"
                              } hover:${typeColors[pokemon.type] || "bg-gray-400"
                              } text-xs`}
                          >
                            {pokemon.type}
                          </Badge>
                          {pokemon.type2 && (
                            <Badge
                              className={`${typeColors[pokemon.type2] || "bg-gray-400"
                                } hover:${typeColors[pokemon.type2] || "bg-gray-400"
                                } text-xs`}
                            >
                              {pokemon.type2}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            #{pokemon.id.toString().padStart(3, "0")}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                        {pokemon.captured ? (
                          <>
                            <span className="block">Captured</span>
                            <span>{pokemon.createdAt}</span>
                          </>
                        ) : (
                          <span>Not captured</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
