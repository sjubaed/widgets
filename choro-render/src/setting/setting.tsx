import { IMConfig, React, jsx } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps} from 'jimu-for-builder';
import { JimuMapViewSelector, SettingSection, MapWidgetSelector } from 'jimu-ui/advanced/setting-components';

const Setting = (props: AllWidgetSettingProps<any>) => {

    const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
        props.onSettingChange({
            id: props.id,
            useMapWidgetIds: useMapWidgetIds
        });
    };


    return <div className="widget-setting-demo">
        <SettingSection
            className="map-selector-selection"
            title={"Select Map Widget"}
        >
        <MapWidgetSelector
            useMapWidgetIds={props.useMapWidgetIds}
            onSelect={onMapWidgetSelected}
        />
        </SettingSection>
    </div>;
};



export default Setting;

// export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<any>, any> {

//     onMapWidgetSelected = (useMapWidgetIds: string[]) => {
//         this.props.onSettingChange({
//             id: this.props.id,
//             useMapWidgetIds: useMapWidgetIds
//         });
//     };
//     render () {
//         return <div className="widget-setting-demo">
//         <SettingSection
//             className="map-selector-selection"
//             title={"Select Map Widget"}
//             >
//             <MapWidgetSelector
//                 useMapWidgetIds={this.props.useMapWidgetIds}
//                 onSelect={this.onMapWidgetSelected}
//             />
//         </SettingSection>
//         </div>;
//     }

// }