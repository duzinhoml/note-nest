import { useSettings } from '../../context/SettingsContext.jsx';

import Options from './Options.jsx';
import Decision from './Decision.jsx';

function SmallSettings({ user }) {
    const { settingsSelection } = useSettings();

    return (
        <>
            {!settingsSelection ? <Options/> : <Decision user={user}/>}
        </>
    );
};

export default SmallSettings;