import { Global } from '@emotion/react';

const Fonts = () => (
	<Global
		styles={`
      /* latin */
      @font-face {
        font-family: 'Roboto_400Regular';
        font-weight: 700;
             }
          `}
	/>
);

export default Fonts;
