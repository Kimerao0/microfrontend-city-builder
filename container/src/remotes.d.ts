/* team blue   */ declare module 'team_blue/MainExport';
/* team red    */
/* team purple */
/* team green  */

declare module 'team_blue/registry' {
  import type { ComponentType } from 'react';
  export type WidgetLoader = () => Promise<{ default: ComponentType<any> }>;
  export type WidgetMeta = { id: string; label: string; load: WidgetLoader };
  export const registry: WidgetMeta[];
  const _default: WidgetMeta[];
  export default _default;
}
