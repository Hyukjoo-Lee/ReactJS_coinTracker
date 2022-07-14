
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App'
import { customTheme, theme } from './theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <div>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </div>
);
