import { FeatureItem } from './type'

type HasFeatureType = Pick<FeatureItem, 'value' | 'method'>

function usePermission() {
    const isHasPermission = (entityFeature: HasFeatureType, listFeature: HasFeatureType[]) => {
        let flag = false;

        listFeature.forEach((feat: HasFeatureType) => {
            if (feat['value'] === entityFeature['value'] && feat['method'] === entityFeature['method']) {
                flag = true;
            }
        });

        return flag;
    }

    return { isHasPermission }
}

export default usePermission