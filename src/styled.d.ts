// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        // Explain your theme shape
        textColor?: string;
        bgColor: string;
        accentColor: string;
    }
}
