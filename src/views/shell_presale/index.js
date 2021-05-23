import ClamIslandBank from '../../assets/locations/clam_island_bank.png';
import './index.scss';
import CharacterSpeak from '../../components/characters';

import ConnectPool from '../../components/ConnectPool.js';

import Bank from '../../assets/locations/bank_animated.mp4';

const ShellPresale = () => {
    return (
        <>
          <div id="env-wrapper">
            <video autoPlay muted loop id="env">
                <source src={Bank} type="video/mp4" />
            </video>
          </div>
          <div className="shell-presale">
              <ConnectPool />
              <CharacterSpeak character={'tanja'} speech={'shell_presale'}/>
          </div>
        </>
    );
};

export default ShellPresale;
