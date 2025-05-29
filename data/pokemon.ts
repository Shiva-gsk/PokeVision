'use server'
import { db } from "@/lib/db";
import { auth } from "@/auth"

export async function getPokemon() {
    const session = await auth();
    // Ensure session is available
    if(session){
        const poke = await db.pokemon.findMany({
            where: { userId: session?.user?.id },
        });
        console.log(session.user.id);
        console.log("lol");
        return poke;
    }
    console.log("here");
    return [];
}