import React from 'react';

export type CityContextValue = {
  defaultTilesTypes: string[] | null;
  setDefaultTilesTypes: (value: string[] | null) => void;
  hasTiles: boolean;
};

const CityContext = React.createContext<CityContextValue | undefined>(undefined);

export const useCity = (): CityContextValue => {
  const ctx = React.useContext(CityContext);
  if (!ctx) {
    throw new Error('useCity deve essere usato dentro <CityProvider>');
  }
  return ctx;
};

export const CityProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [defaultTilesTypes, setDefaultTilesTypes] = React.useState<string[] | null>(null);

  const value = React.useMemo(
    () => ({
      defaultTilesTypes,
      setDefaultTilesTypes,
      hasTiles: Array.isArray(defaultTilesTypes) && defaultTilesTypes.length > 0,
    }),
    [defaultTilesTypes],
  );

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};
