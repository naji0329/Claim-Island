import ClamIslandBank from '../../assets/locations/clam_island_bank.png';
import './index.scss';
import CharacterSpeak from '../../components/characters';

import ConnectPool from '../../components/ConnectPool.js';

const ShellPresale = () => {
    return (
        <div className="shell-presale">
            <ConnectPool />
            <CharacterSpeak character={'tanja'} speech={'shell_presale'}/>
        </div>
    );
};

export default ShellPresale;