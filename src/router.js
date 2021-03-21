import Farms from './views/farms/Farms';
import Nest from './views/nest/Nest';
import Home from './views/home/Home';
import Vault from './views/vault/Vault';
import Bank from './views/bank/Bank';

const ROUTES = [
    { title: 'Home', url: '/', component: Home },
    { title: 'Farms', url: '/farms', component: Farms },
    { title: 'Vault', url: '/vault', component: Vault },
    { title: 'Nest', url: '/nest', component: Nest },
    { title: 'Bank', url: '/bank', component: Bank },
];

export default ROUTES;