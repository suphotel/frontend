import React, {useEffect, useState} from 'react';
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import Router from "./router";
import {getColorSchemePreference, setColorSchemePreference} from "./utils/color-schemes";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = (value?: ColorScheme) => {
    const colorSchemeValue = value || (colorScheme === 'light' ? 'dark' : 'light');
    setColorSchemePreference(colorSchemeValue)
    setColorScheme(colorSchemeValue);
  };

  useEffect(() => {
    const colorSchemeValue = getColorSchemePreference();
    if (colorSchemeValue) {
      setColorScheme(colorSchemeValue as ColorScheme);
    }
  }, [])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
        <Router/>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
