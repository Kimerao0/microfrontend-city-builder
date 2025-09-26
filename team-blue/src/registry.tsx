import type { ComponentType } from 'react';

export type WidgetLoader = () => Promise<{ default: ComponentType<any> }>;

export type WidgetMeta = {
  id: string;
  label: string;
  load: WidgetLoader; // dynamic import del widget
};

// Ogni voce punta a un modulo realmente separato così Vite può fare code-splitting.
export const registry: WidgetMeta[] = [
  {
    id: 'team-blue:widget',
    label: 'Team Blue',
    load: () => import('./components/Test1'),
  },
  {
    id: 'team-blue:another',
    label: 'Another',
    load: () => import('./components/Test2'),
  },
];

export default registry;
