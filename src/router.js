import Farms from "./views/farms/Farms";
import Home from "./views/home/Home";
import Bank from "./views/bank/Bank";
import ClamPresale from "./views/clam_presale";
// import ClamViewer from "./views/clam_viewer/ClamViewer";
import Saferoom from "./views/saferoom/Saferoom";
// import Vault from "./views/vault/Vault";
// import ShellPresale from "./views/shell_presale";
// import ShellVoting from "./views/shell_voting";

const ROUTES = [
  { title: "Home", url: "/", component: Home },
  { title: "Saferoom", url: "/saferoom", component: Saferoom },
  { title: "Clam Presale", url: "/clam-presale", component: ClamPresale },
  // { title: "Clam Viewer", url: "/clam-viewer", component: ClamViewer },
  // TODOs
  { title: "Farms", url: "/farms", component: Farms },
  { title: "Bank", url: "/bank", component: Bank },
  // { title: "Vault", url: "/vault/", component: Vault },
  // { title: "Vault", url: "/vault/:tokenId", component: Vault },
  // { title: "Shell Presale", url: "/shell-presale", component: ShellPresale },
  // { title: "Shell Voting", url: "/shell-voting", component: ShellVoting },
];

export default ROUTES;
