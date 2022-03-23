import React, { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

const FourSix = lazy(() => import('../FourSix'));
const FrenchPress = lazy(() => import('../FrenchPress'));
const MainMenu = lazy(() => import('../MainMenu'));

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<p>loading</p>}>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/four-six" element={<FourSix />} />
        <Route path="/french-press" element={<FrenchPress />} />
      </Routes>
    </Suspense>
  );
};

export default App;
