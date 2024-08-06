import React, { createContext, useState } from 'react';

export const PackageContext = createContext();

const PackageProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);

  return (
    <PackageContext.Provider value={{ packages, setPackages }}>
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;