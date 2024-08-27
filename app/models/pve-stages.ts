import { Emotion } from "../types"
import {
  ItemComponents,
  CraftableItems,
  Item,
  NonSpecialItemComponents,
  ShinyItems
} from "../types/enum/Item"
import { Pkm } from "../types/enum/Pokemon"
import { pickNRandomIn, pickRandomIn } from "../utils/random"
import Player from "./colyseus-models/player"
import { Synergy } from "../types/enum/Synergy"
import { DungeonDetails, DungeonPMDO } from "../types/enum/Dungeon"

export type PVEStage = {
  regionalUnits?: boolean
  name: string
  avatar: Pkm
  emotion?: Emotion
  shinyChance?: number
  getRewards?: (player: Player) => Item[]
  getRewardsPropositions?: (player: Player) => Item[]
  board: [pkm: Pkm, x: number, y: number][]
  getBoblems?: (player: Player) => Pkm[]
}

export const Boblems: Record<
  (Synergy)[number],
  Pkm
> = {
  [Synergy.NORMAL]: Pkm.AIPOM,
  [Synergy.GRASS]: Pkm.TANGELA,
  [Synergy.FIRE]: Pkm.GROWLITHE,
  [Synergy.WATER]: Pkm.PSYDUCK,
  [Synergy.ELECTRIC]: Pkm.VOLTORB,
  [Synergy.FIGHTING]: Pkm.SCRAGGY,
  [Synergy.PSYCHIC]: Pkm.SLOWPOKE,
  [Synergy.DARK]: Pkm.ZORUA,
  [Synergy.STEEL]: Pkm.ALOLAN_DIGLETT,
  [Synergy.GROUND]: Pkm.SANDSHREW,
  [Synergy.POISON]: Pkm.EKANS,
  [Synergy.DRAGON]: Pkm.BAGON,
  [Synergy.FIELD]: Pkm.HISUI_GROWLITHE,
  [Synergy.MONSTER]: Pkm.CRANIDOS,
  [Synergy.HUMAN]: Pkm.IMPIDIMP,
  [Synergy.AQUATIC]: Pkm.CORPHISH,
  [Synergy.BUG]: Pkm.VENONAT,
  [Synergy.FLYING]: Pkm.RUFFLET,
  [Synergy.FLORA]: Pkm.FLABEBE,
  [Synergy.ROCK]: Pkm.ARCHEN,
  [Synergy.GHOST]: Pkm.HISUI_ZORUA,
  [Synergy.FAIRY]: Pkm.HATENNA,
  [Synergy.ICE]: Pkm.SPHEAL,
  [Synergy.FOSSIL]: Pkm.ANORITH,
  [Synergy.SOUND]: Pkm.WOOBAT,
  [Synergy.ARTIFICIAL]: Pkm.NOSEPASS,
  [Synergy.LIGHT]: Pkm.CHINCHOU,
  [Synergy.WILD]: Pkm.BIDOOF,
  [Synergy.BABY]: Pkm.CLEFFA,
  [Synergy.AMORPHOUS]: Pkm.GRIMER
}

export const PVEStages: { [turn: number]: PVEStage } = {
  1: {
    regionalUnits: true,
    name: "pkm.MAGIKARP",
    avatar: Pkm.MAGIKARP,
    board: [
      [Pkm.MAGIKARP, 3, 1],
      [Pkm.MAGIKARP, 5, 1],
      
    ],
    shinyChance: 1 / 40,
    getRewards(player: Player) {
      const randomComponents = pickNRandomIn(ItemComponents, 3)
      return randomComponents
    }
  },

  /*2: {
    name: "pkm.RATTATA",
    avatar: Pkm.RATTATA,
    board: [
      [Pkm.RATTATA, 3, 1],
      [Pkm.RATTATA, 5, 1]
    ],
    getRewards(player) {
      const randomComponent = pickRandomIn(
        NonSpecialItemComponents.filter(
          (i) => player.randomComponentsGiven.includes(i) === false
        )
      )
      player.randomComponentsGiven.push(randomComponent)
      return [randomComponent]
    }
  },

  3: {
    name: "pkm.SPEAROW",
    avatar: Pkm.SPEAROW,
    board: [
      [Pkm.SPEAROW, 3, 1],
      [Pkm.SPEAROW, 5, 1],
      [Pkm.SPEAROW, 4, 2]
    ],
    getRewards(player) {
      const randomComponent = pickRandomIn(
        NonSpecialItemComponents.filter(
          (i) => player.randomComponentsGiven.includes(i) === false
        )
      )
      player.randomComponentsGiven.push(randomComponent)
      return [randomComponent]
    }
  },*/

  6: {
    name: "horde_battle",
    avatar: Pkm.RATICATE,
    board: [
      [Pkm.RATICATE, 3, 1],
      [Pkm.RATTATA, 5, 1],
      [Pkm.SPEAROW, 2, 2],
      [Pkm.RATTATA, 6, 1],
      [Pkm.SPEAROW, 4, 2]
    ],
    shinyChance: 1 / 40,
    getRewards(player: Player) {
      const randomComponents = pickNRandomIn(ItemComponents, 3)
      return randomComponents
    }
  },
  

  10: {
    regionalUnits: true,
    name: "pkm.GYARADOS",
    avatar: Pkm.GYARADOS,
    shinyChance: 1 / 40,
    board: [[Pkm.GYARADOS, 4, 2]],
    getRewards(player: Player) {
      const randomComponents = pickNRandomIn(ItemComponents, 1)
      return randomComponents
    }
  },

  13: {
    name: "pkm.MEWTWO",
    avatar: Pkm.MEWTWO,
    emotion: Emotion.DETERMINED,
    shinyChance: 0, // can't propose shiny items because item proposition on stage 15
    board: [
      [Pkm.MEWTWO, 4, 2],
      [Pkm.MEW, 7, 1]
    ],
    getRewards(player: Player) {
      return [pickRandomIn(NonSpecialItemComponents)]
    }
  },

  19: {
    name: "tower_duo",
    avatar: Pkm.LUGIA,
    emotion: Emotion.DETERMINED,
    shinyChance: 1 / 40,
    board: [
      [Pkm.LUGIA, 3, 1],
      [Pkm.HO_OH, 5, 1]
    ],
    getRewards(player: Player) {
      return [pickRandomIn(NonSpecialItemComponents)]
    }
  },

  24: {
    name: "legendary_birds",
    avatar: Pkm.ZAPDOS,
    board: [
      [Pkm.ZAPDOS, 2, 2],
      [Pkm.MOLTRES, 4, 2],
      [Pkm.ARTICUNO, 6, 2]
    ],
    getRewardsPropositions(player: Player) {
      return pickNRandomIn(CraftableItems, 3)
    }
  },

  28: {
    name: "legendary_beasts",
    avatar: Pkm.SUICUNE,
    emotion: Emotion.DETERMINED,
    board: [
      [Pkm.ENTEI, 2, 2],
      [Pkm.RAIKOU, 4, 2],
      [Pkm.SUICUNE, 6, 2]
    ],
    getRewardsPropositions(player: Player) {
      return pickNRandomIn(CraftableItems, 3)
    }
  },

  32: {
    name: "super_ancients",
    avatar: Pkm.RAYQUAZA,
    emotion: Emotion.DETERMINED,
    board: [
      [Pkm.PRIMAL_KYOGRE, 2, 2],
      [Pkm.MEGA_RAYQUAZA, 4, 2],
      [Pkm.PRIMAL_GROUDON, 6, 2]
    ],
    getRewardsPropositions(player: Player) {
      return pickNRandomIn(CraftableItems, 3)
    }
  },

  36: {
    name: "legendary_giants",
    avatar: Pkm.REGICE,
    emotion: Emotion.DETERMINED,
    board: [
      [Pkm.REGIELEKI, 2, 2],
      [Pkm.REGICE, 2, 3],
      [Pkm.REGIGIGAS, 3, 3],
      [Pkm.REGIROCK, 4, 3],
      [Pkm.REGISTEEL, 5, 3],
      [Pkm.REGIDRAGO, 5, 2]
    ],
    getRewardsPropositions(player: Player) {
      return pickNRandomIn(CraftableItems, 3)
    }
  },

  40: {
    name: "pkm.ARCEUS",
    avatar: Pkm.ARCEUS,
    emotion: Emotion.INSPIRED,
    board: [
      [Pkm.DIALGA, 2, 3],
      [Pkm.GIRATINA, 4, 3],
      [Pkm.PALKIA, 6, 3],
      [Pkm.ARCEUS, 4, 1]
    ],
    getRewardsPropositions(player: Player) {
      return pickNRandomIn(ShinyItems, 3)
    }
  }
}
