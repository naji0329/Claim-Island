import Farms from "./views/farms/Farms";
import Home from "./views/home/Home";
import Bank from "./views/bank/Bank";
import ClamPresale from "./views/clam_presale";
import Saferoom from "./views/saferoom/Saferoom";

const ROUTES = [
  { title: "Home", url: "/", component: Home },
  { title: "Saferoom", url: "/saferoom", component: Saferoom },
  { title: "Clam Presale", url: "/clam-presale", component: ClamPresale },
  // TODOs
  { title: "Farms", url: "/farms", component: Farms },
  { title: "Bank", url: "/bank", component: Bank },
];

export default ROUTES;
