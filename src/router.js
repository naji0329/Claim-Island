import Farms from "./views/farms/Farms";
// import Nest from './views/nest/Nest';
import Home from "./views/home/Home";
import Vault from "./views/vault/Vault";
import ClamViewer from "./views/clam_viewer/ClamViewer";
import Bank from "./views/bank/Bank";
import ShellPresale from "./views/shell_presale";
import ShellVoting from "./views/shell_voting";
import ClamPresale from "./views/clam_presale";
import Saferoom from "./views/saferoom/Saferoom";

const ROUTES = [
  { title: "Home", url: "/", component: Home },
  { title: "Farms", url: "/farms", component: Farms },
  { title: "Saferoom", url: "/saferoom", component: Saferoom },
  { title: "Vault", url: "/vault/", component: Vault },
  { title: "Vault", url: "/vault/:tokenId", component: Vault },
  { title: "Clam Viewer", url: "/clam-viewer", component: ClamViewer },
  // { title: 'Nest', url: '/nest', component: Nest },
  { title: "Bank", url: "/bank", component: Bank },
  { title: "Shell Presale", url: "/shell-presale", component: ShellPresale },
  { title: "Shell Voting", url: "/shell-voting", component: ShellVoting },
  { title: "Clam Presale", url: "/clam-presale", component: ClamPresale },
];

export default ROUTES;
