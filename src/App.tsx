import React from 'react';
import {MantineProvider} from '@mantine/core';

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <div>Welcome on Suphotel frontend</div>
        </MantineProvider>
    );
}

export default App;
