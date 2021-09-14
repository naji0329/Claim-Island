import Nacre from "assets/characters/captain_nacre.png";
import Al from "assets/characters/al.png";
import Tanja from "assets/characters/tanja.png";
import Diego from "assets/characters/diego.png";

import { FARM_SPEECH, FARM_BUTTONS } from "./speeches/farms";
import { BANK_SPEECH, BANK_BUTTONS } from "./speeches/bank";
import { CLAM_SHOP_SPEECH, CLAM_SHOP_BUTTONS } from "./speeches/clam_shop";
import { SAFEROOM_SPEECH, SAFEROOM_BUTTONS } from "./speeches/saferoom";
import { WELCOME_SPEECH, WELCOME_BUTTONS } from "./speeches/welcome";
import { SHELL_PRESALE_SPEECH, SHELL_PRESALE_BUTTONS } from "./speeches/shell_presale";
import { CLAM_PRESALE_BUTTONS, CLAM_PRESALE_SPEECH } from "./speeches/clam_presale";
import { SHELL_VOTING_SPEECH, SHELL_VOTING_BUTTONS } from "./speeches/shell_voting";
import { CLAM_CLAIMERS_SPEECH, CLAM_CLAIMERS_BUTTONS } from "./speeches/clam_claimers";
import { OTHER_SPEECH, OTHER_BUTTONS } from "./speeches/other";

export const CHARACTERS = {
  nacre: {
    name: "Captain Nacre",
    charImg: Nacre,
  },
  diego: {
    name: "Diego",
    charImg: Diego,
  },
  tanja: {
    name: "Tanja",
    charImg: Tanja,
  },
  al: {
    name: "Al",
    charImg: Al,
  },
};

export const SPEECHES = {
  ...CLAM_CLAIMERS_SPEECH,
  ...SHELL_VOTING_SPEECH,
  ...CLAM_PRESALE_SPEECH,
  ...SHELL_PRESALE_SPEECH,
  ...WELCOME_SPEECH,
  ...BANK_SPEECH,
  ...FARM_SPEECH,
  ...CLAM_SHOP_SPEECH,
  ...SAFEROOM_SPEECH,
  ...OTHER_SPEECH,
};

export const BUTTONS = {
  ...CLAM_CLAIMERS_BUTTONS,
  ...SHELL_VOTING_BUTTONS,
  ...CLAM_PRESALE_BUTTONS,
  ...SHELL_PRESALE_BUTTONS,
  ...WELCOME_BUTTONS,
  ...BANK_BUTTONS,
  ...FARM_BUTTONS,
  ...SAFEROOM_BUTTONS,
  ...CLAM_SHOP_BUTTONS,
  ...OTHER_BUTTONS,
};
