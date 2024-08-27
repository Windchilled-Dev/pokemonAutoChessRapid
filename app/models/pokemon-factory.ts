import { ArraySchema, MapSchema } from "@colyseus/schema"
import { Emotion, IPlayer } from "../types"
import { Pkm, PkmFamily, PkmIndex } from "../types/enum/Pokemon"
import { logger } from "../utils/logger"
import { Pokemon, PokemonClasses } from "./colyseus-models/pokemon"
import { PVEStage, Boblems } from "./pve-stages"
import { DungeonDetails, DungeonPMDO } from "../types/enum/Dungeon"
import { resetArraySchema } from "../utils/schemas"


export default class PokemonFactory {
  static makePveBoard(
    pveStage: PVEStage,
    shinyEncounter: boolean,
    player: IPlayer
  ): MapSchema<Pokemon> {
    const pokemons = new MapSchema<Pokemon>()
    let pveBoard = pveStage.board
    let map = player.map

    if(pveStage.regionalUnits){
      const regionalSpawns = [[2,1],[3,2],[7,1]]
      
      const regionSynergies = DungeonDetails[map]?.synergies

      
      const boblems = new ArraySchema<Pkm>()
      regionSynergies.forEach((type) => {
        boblems.push(Boblems[type])
      })

      for(let i=0; i<boblems.length; i++){
        pveBoard.push([boblems[i], regionalSpawns[i][0], regionalSpawns[i][1]])
      }

    }
    
    pveStage.board.forEach(([pkm, x, y]) => {
      const pokemon = PokemonFactory.createPokemonFromName(pkm, {
        selectedEmotion: pveStage.emotion ?? Emotion.NORMAL,
        selectedShiny: shinyEncounter
      })
      pokemon.positionX = x
      pokemon.positionY = y
      pokemons.set(pokemon.id, pokemon)
    })
    return pokemons
  }

  // transforms a pokemon into another pokemon,
  // transferring its items and position to
  // the new pokemon
  static transformPokemon(before: Pokemon, afterName: Pkm, player?: IPlayer) {
    const transformation = this.createPokemonFromName(afterName, player)
    transformation.positionX = before.positionX
    transformation.positionY = before.positionY
    transformation.items = before.items
    return transformation
  }

  static getPokemonBaseEvolution(name: Pkm) {
    switch (name) {
      case Pkm.VAPOREON:
      case Pkm.JOLTEON:
      case Pkm.FLAREON:
      case Pkm.ESPEON:
      case Pkm.UMBREON:
      case Pkm.LEAFEON:
      case Pkm.SYLVEON:
      case Pkm.GLACEON:
        return Pkm.EEVEE
      case Pkm.SHEDINJA:
        return Pkm.NINCADA
      case Pkm.WORMADAM_PLANT:
        return Pkm.BURMY_PLANT
      case Pkm.WORMADAM_SANDY:
        return Pkm.BURMY_SANDY
      case Pkm.WORMADAM_TRASH:
        return Pkm.BURMY_TRASH
      default:
        return PkmFamily[name]
    }
  }

  static createPokemonFromName(
    name: Pkm,
    config?: IPlayer | { selectedShiny?: boolean; selectedEmotion?: Emotion }
  ): Pokemon {
    if (config && "pokemonCollection" in config) {
      config = config.pokemonCollection.get(PkmIndex[name])
    }
    const shiny = config && config.selectedShiny ? true : false
    const emotion =
      config && config.selectedEmotion ? config.selectedEmotion : Emotion.NORMAL
    if (name in PokemonClasses) {
      const PokemonClass = PokemonClasses[name]

      return new PokemonClass(shiny, emotion)
    } else {
      logger.warn(`No pokemon with name "${name}" found, return MissingNo`)
      return new Pokemon(shiny, emotion)
    }
  }
}
