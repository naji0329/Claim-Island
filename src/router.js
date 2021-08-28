import Farms from "./views/farms/Farms";
import Home from "./views/home/Home";
import Bank from "./views/bank/Bank";
import ClamPresale from "./views/clam_presale";
import Shop from "./views/shop";
import ClamClaimer from "./views/clam_claimers";
// import ClamViewer from "./views/clam_viewer/ClamViewer";
import Saferoom from "./views/saferoom/Saferoom";
// import Vault from "./views/vault/Vault";
// import ShellPresale from "./views/shell_presale";
// import ShellVoting from "./views/shell_voting";

const ROUTES = [
  { title: "Home", url: "/", component: Home, exact: true },
  { title: "Saferoom", url: "/saferoom", component: Saferoom, exact: false },
  { title: "Clam Presale", url: "/clam-presale", component: ClamPresale, exact: true },
  { title: "Shop", url: "/shop", component: Shop, exact: true },
  { title: "Clam Claimer", url: "/clam-claimer", component: ClamClaimer, exact: true },
  // { title: "Clam Viewer", url: "/clam-viewer", component: ClamViewer },
  // TODOs
  { title: "Farms", url: "/farms", component: Farms, exact: true },
  { title: "Bank", url: "/bank", component: Bank, exact: true },
  // { title: "Vault", url: "/vault/", component: Vault },
  // { title: "Vault", url: "/vault/:tokenId", component: Vault },
  // { title: "Shell Presale", url: "/shell-presale", component: ShellPresale },
  // { title: "Shell Voting", url: "/shell-voting", component: ShellVoting },
];

export default ROUTES;
