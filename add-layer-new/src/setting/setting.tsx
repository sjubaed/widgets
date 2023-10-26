import { React } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import { MapWidgetSelector } from "jimu-ui/advanced/setting-components";


const Setting = (props: AllWidgetSettingProps<any>) => {
	// *** ADD ***
	const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
  		props.onSettingChange({
    		id: props.id,
    		useMapWidgetIds: useMapWidgetIds
  		});
	};

  return <div className="widget-setting-demo">
  	<MapWidgetSelector useMapWidgetIds={props.useMapWidgetIds} onSelect={onMapWidgetSelected} />
  </div>;
};

export default Setting;
