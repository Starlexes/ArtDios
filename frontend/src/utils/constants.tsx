export const renderArrow = () => (
	<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="1.41406" width="10" height="2" rx="1" transform="rotate(45 1.41406 0)" fill="white" />
		<rect y="13.0703" width="10" height="2" rx="1" transform="rotate(-45 0 13.0703)" fill="white" />
	</svg>
);

export const renderCross = () => (
	<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="28.2812" width="4" height="40" rx="2" transform="rotate(45 28.2812 0)" fill="white"/>
		<rect y="2.82812" width="4" height="40" rx="2" transform="rotate(-45 0 2.82812)" fill="white"/>
	</svg>
);



export const itemsPerPage = 7;

// Router names

export const catalog = '/catalog/';

export const products = '/products/';


// Pagination

export const nextSinglePage = () => (
	<svg width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="1.41406" y="28.5547" width="2" height="20" rx="1" transform="rotate(-135 1.41406 28.5547)" fill="#111111" />
		<rect y="1.41406" width="2" height="20" rx="1" transform="rotate(-45 0 1.41406)" fill="#111111" />
	</svg>
);

export const nextDoublePage = () => (
	<svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="9.41406" y="28.5547" width="2" height="20" rx="1" transform="rotate(-135 9.41406 28.5547)" fill="#111111" />
		<rect x="8" y="1.41406" width="2" height="20" rx="1" transform="rotate(-45 8 1.41406)" fill="#111111" />
		<rect x="1.41406" y="28.5547" width="2" height="20" rx="1" transform="rotate(-135 1.41406 28.5547)" fill="#111111" />
		<rect y="1.41406" width="2" height="20" rx="1" transform="rotate(-45 0 1.41406)" fill="#111111" />
	</svg>
);

export const prevDoublePage = () => (
	<svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="14.1406" width="2" height="20" rx="1" transform="rotate(45 14.1406 0)" fill="#111111" />
		<rect x="15.5547" y="27.1406" width="2" height="20" rx="1" transform="rotate(135 15.5547 27.1406)" fill="#111111" />
		<rect x="22.1406" width="2" height="20" rx="1" transform="rotate(45 22.1406 0)" fill="#111111" />
		<rect x="23.5547" y="27.1406" width="2" height="20" rx="1" transform="rotate(135 23.5547 27.1406)" fill="#111111" />
	</svg>
);

export const prevSinglePage = () => (
	<svg width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="14.1406" width="2" height="20" rx="1" transform="rotate(45 14.1406 0)" fill="#111111" />
		<rect x="15.5547" y="27.1406" width="2" height="20" rx="1" transform="rotate(135 15.5547 27.1406)" fill="#111111" />
	</svg>
);

// Filters

export const orderASC = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="10" cy="10" r="10" fill="#40D128" />
		<rect x="17.2969" y="7.16797" width="11.5621" height="1.65173" rx="0.825864" transform="rotate(135 17.2969 7.16797)" fill="white" />
		<rect x="4.16406" y="8.47656" width="8.25864" height="1.65173" rx="0.825864" transform="rotate(45 4.16406 8.47656)" fill="white" />
	</svg>
);

export const orderDSC = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="10" cy="10" r="10" fill="#DA5F1A" />
		<rect x="17.2969" y="7.16797" width="11.5621" height="1.65173" rx="0.825864" transform="rotate(135 17.2969 7.16797)" fill="white" />
		<rect x="4.16406" y="8.47656" width="8.25864" height="1.65173" rx="0.825864" transform="rotate(45 4.16406 8.47656)" fill="white" />
	</svg>
);

export const checked = () => (
	<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="1.0625" y="2.84375" width="8.55157" height="1.5" rx="0.75" transform="rotate(45 1.0625 2.84375)" fill="#DA5F1A" />
		<rect x="15.1172" y="1.14062" width="12.6622" height="1.5" rx="0.75" transform="rotate(135.859 15.1172 1.14062)" fill="#DA5F1A" />
	</svg>
);


export const countChars = 3;
