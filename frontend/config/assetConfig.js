//Overly complicated but
import {Asset} from 'expo-asset';

const asset_modules = {
    personality_avatars: {
        AI: require('../assets/imgs/personalities/AI.png'),
        Cthulhu: require('../assets/imgs/personalities/Cthulhu.png'),
        Dracula: require('../assets/imgs/personalities/Dracula.png'),
        Hercules: require('../assets/imgs/personalities/Hercules.png'),
        "Mickey Mouse": require('../assets/imgs/personalities/MickeyMouse.png'),
        Popeye: require('../assets/imgs/personalities/Popeye.png'),
        "Robin Hood": require('../assets/imgs/personalities/RobinHood.png'),
        Sherlock: require('../assets/imgs/personalities/Sherlock.png'),
        Tarzan: require('../assets/imgs/personalities/Tarzan.png'),
        Thor: require('../assets/imgs/personalities/Thor.png'),
        Zorro: require('../assets/imgs/personalities/Zorro.png')
    },
    logos: {
        banner: require('../assets/imgs/logos/banner.png')
    },
    util: {
        not_found: require('../assets/imgs/not-found.png')
    }
};

export const personalityOptions = Object.keys(asset_modules.personality_avatars);

const _assets = {
    personality_avatars: {},
    logos: {},
    util: {}
};

(async function download_assets() {
    for(const [group_name, asset_group] of Object.entries(asset_modules)) {
        for(const [asset_name, asset] of Object.entries(asset_group)) {
            Asset.fromModule(asset).downloadAsync().then((asset) => {
                _assets[group_name][asset_name] = asset;
            });
        }
    };
})();

const proxyHandler = (target, property) => {
    if(target[property].downloaded) {
        return target[property];
    } else {
        return _assets.util.not_found;
    }
}

export const assets = {
    personality_avatars: new Proxy(_assets.personality_avatars, proxyHandler),
    logos: new Proxy(_assets.logos, proxyHandler),
    util: new Proxy(_assets.util, proxyHandler)
}