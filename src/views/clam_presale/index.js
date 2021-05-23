
import ClamIslandShop from '../../assets/locations/clam_island_shop.png';
import './index.scss';
import CharacterSpeak from '../../components/characters';

const ClamPresale = () => {
    return (
        <div className="clam-presale">
            <CharacterSpeak character={'diego'} speech={'clam_presale'}/>
        </div>
    );
};

export default ClamPresale;