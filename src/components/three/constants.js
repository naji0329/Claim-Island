export const ISLANDS_NAMES = {
  lighthouse: "lighthouse",
  farm: "farm",
  vault: "vault",
  market: "market",
  bank: "bank",
}

export const ISLAND_OBJECTS = [
  {
    objectUrl: "glb_files/Bank_Island_draco.glb",
    type: "island",
    name: ISLANDS_NAMES.bank,
    clickable: true,
    url: "/bank",
    buoyancy: { factor: 2, init: -5 }
  },
  {
    objectUrl: "glb_files/farm_island_draco.glb",
    type: "island",
    name: ISLANDS_NAMES.farm,
    clickable: true,
    url: "/farms",
  },
  {
    objectUrl: "glb_files/Market_Island_draco.glb",
    type: "island",
    name: ISLANDS_NAMES.market,
    clickable: true,
    url: "/shop",
    buoyancy: { factor: 2, init: 2 }
  },
  {
    objectUrl: "glb_files/Vault_Island_draco.glb",
    type: "island",
    name: ISLANDS_NAMES.vault,
    clickable: true,
    url: "/saferoom",
    buoyancy: { factor: 2, init: -4 }
  },
  {
    objectUrl: "glb_files/Info_Island_draco.glb",
    type: "island",
    name: ISLANDS_NAMES.lighthouse,
    clickable: true,
    url: "/info",
    buoyancy: { factor: 2, init: 2 }
  },
  {
    objectUrl: "glb_files/bank_sign.glb",
    type: "island",
    name: "bank_sign",
    buoyancy: { factor: 2, init: -5 }
  },
  {
    objectUrl: "glb_files/farm_sign.glb",
    type: "island",
    name: "farm_sign"
  },
  {
    objectUrl: "glb_files/safe_sign.glb",
    type: "island",
    name: "safe_sign",
    buoyancy: { factor: 2, init: 2 }
  },
  {
    objectUrl: "glb_files/info_sign.glb",
    type: "island",
    name: "info_sign"
  },
  {
    objectUrl: "glb_files/shop_sign.glb",
    type: "island",
    name: "shop_sign",
    buoyancy: { factor: 2, init: 2 }
  },
  {
    objectUrl: "glb_files/Bridges.glb",
    type: "bridge",
    name: "bridge",
    buoyancy: { factor: 2, init: 30 }
  },
  {
    objectUrl: "glb_files/Rocks.glb",
    type: "rocks",
  },
  {
    objectUrl: "glb_files/Boats_draco.glb",
    type: "boats",
    name: "boats",
    buoyancy: { factor: 1.5, init: 1 }
  },
  {
    objectUrl: "glb_files/ship-2_draco.glb",
    type: "ship",
    name: "ship",
    buoyancy: { factor: 4, init: 35 }
  },
  {
    objectUrl: "glb_files/sailboat.glb",
    type: "sailboat",
    name: "sailboat",
    buoyancy: { factor: 2, init: 38 }
  },
  {
    objectUrl: "glb_files/seagull.glb",
    type: "seagull",
  },
  {
    objectUrl: "glb_files/dolphin.glb",
    type: "dolphin",
  },
];
