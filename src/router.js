import Farms from "./views/farms/Farms";
// import Nest from './views/nest/Nest';
import Home from "./views/home/Home";
import Vault from "./views/vault/Vault";
import Bank from "./views/bank/Bank";
import ShellPresale from "./views/shell_presale";
import ShellVoting from "./views/shell_voting";
import ClamPresale from "./views/clam_presale";

const ROUTES = [
  { title: "Home", url: "/", component: Home },
  { title: "Farms", url: "/farms", component: Farms },
  { title: "Vault", url: "/vault", component: Vault },
  // { title: 'Nest', url: '/nest', component: Nest },
  { title: "Bank", url: "/bank", component: Bank },
  { title: "Shell Presale", url: "/shell-presale", component: ShellPresale },
  { title: "Shell Voting", url: "/shell-voting", component: ShellVoting },
  { title: "Clam Presale", url: "/clam-presale", component: ClamPresale },
];

export default ROUTES;
