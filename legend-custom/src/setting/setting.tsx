import { React } from 'jimu-core';
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components';
import { AllWidgetSettingProps } from 'jimu-for-builder';

export default function Setting(
  props: AllWidgetSettingProps<{}>
): React.ReactElement {

  const onMapSelected = (useMapWidgetIds: string[]) => {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: useMapWidgetIds
    });
  }

  return <div className="sample-js-api-widget-setting p-2">
    <MapWidgetSelector onSelect={onMapSelected} useMapWidgetIds={props.useMapWidgetIds} />
  </div>
}