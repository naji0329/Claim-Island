import Farms from "./views/farms/Farms";
import Home from "./views/home/Home";
import Bank from "./views/bank/Bank";
import ClamPresale from "./views/clam_presale";
import Shop from "./views/shop";
import ClamClaimer from "./views/clam_claimers";
import Saferoom from "./views/saferoom/Saferoom";
// import Vault from "./views/vault/Vault";
// import ShellPresale from "./views/shell_presale";
// import ShellVoting from "./views/shell_voting";

const ROUTES = [
  { title: "Home", url: "/", component: Home, exact: true, icon: "home.svg", order: 1 },
  {
    title: "Saferoom",
    url: "/saferoom",
    component: Saferoom,
    exact: false,
    icon: "saferoom.svg",
    order: 4,
  },
  { title: "Clam Presale", url: "/clam-presale", component: ClamPresale, exact: true },
  { title: "Shop", url: "/shop", component: Shop, exact: true, icon: "shop.svg", order: 5 },
  { title: "Clam Claimer", url: "/clam-claimer", component: ClamClaimer, exact: true },
  // TODOs
  { title: "Farms", url: "/farms", component: Farms, exact: true, icon: "farm.svg", order: 3 },
  { title: "Bank", url: "/bank", component: Bank, exact: true, icon: "bank.svg", order: 2 },
  // { title: "Vault", url: "/vault/", component: Vault },
  // { title: "Vault", url: "/vault/:tokenId", component: Vault },
  // { title: "Shell Presale", url: "/shell-presale", component: ShellPresale },
  // { title: "Shell Voting", url: "/shell-voting", component: ShellVoting },
];

export default ROUTES;
