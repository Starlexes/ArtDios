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



export const itemsPerPage = 12;

// Router names

export const catalog = '/catalog/';

export const products = '/products/';

export const galleryRoute = '/gallery/';

export const contactsRoute = '/contacts/';

export const promotionRoute = '/promotions/';

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

export const selectArrow = () => (
	<svg width="14.484375" height="8.484375" viewBox="0 0 14.4844 8.48438" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="Rectangle 23" x="14.484375" y="1.414062" rx="1.000000" width="10.000000" height="2.000000" transform="rotate(135 14.484375 1.414062)" fill="#181818" fillOpacity="1.000000"/>
		<rect id="Rectangle 24" x="1.414062" rx="1.000000" width="10.000000" height="2.000000" transform="rotate(45 1.414062 0.000000)" fill="#181818" fillOpacity="1.000000"/>
	</svg>

);

export const filtersIcon = () => (
	<svg width="16.000000" height="9.000000" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="Rectangle 427" y="1.000000" width="16.000000" height="1.000000" fill="#FFFFFF" fillOpacity="1.000000"/>
		<rect id="Rectangle 428" x="16.000000" y="8.000000" width="16.000000" height="0.999999" transform="rotate(-180 16.000000 8.000000)" fill="#FFFFFF" fillOpacity="1.000000"/>
		<circle id="Ellipse 69" cx="4.500000" cy="1.500000" r="1.500000" fill="#CF5C1C" fillOpacity="1.000000"/>
		<circle id="Ellipse 69" cx="4.500000" cy="1.500000" r="1.000000" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.000000"/>
		<circle id="Ellipse 70" r="1.500000" transform="matrix(-1 -8.74228e-08 8.74228e-08 -1 10.5 7.5)" fill="#CF5C1C" fillOpacity="1.000000"/>
		<circle id="Ellipse 70" r="1.000000" transform="matrix(-1 -8.74228e-08 8.74228e-08 -1 10.5 7.5)" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.000000"/>
	</svg>

);

export const closeFilters = () => (
	<svg width="20.000000" height="20.000000" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="Rectangle 382" x="18.183594" rx="1.285624" width="2.571248" height="25.712486" transform="rotate(45.0005 18.183594 0.000000)" fill="#383838" fillOpacity="1.000000"/>
		<rect id="Rectangle 383" y="1.816406" rx="1.285624" width="2.571248" height="25.712486" transform="rotate(-45.0005 0.000000 1.816406)" fill="#383838" fillOpacity="1.000000"/>
	</svg>

);

export const countChars =5;

//Product Card
export const leftArrowImage = () => (
	<svg width="22.941406" height="39.941406" viewBox="0 0 22.9414 39.9414" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="Rectangle 4194" rx="2.000000" width="4.000000" height="28.000000" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 22.9414 2.82812)" fill="#2B2C30" fillOpacity="1.000000"/>
		<rect id="Rectangle 4195" rx="2.000000" width="4.000000" height="28.000000" transform="matrix(-0.707107 0.707107 0.707107 0.707107 2.82812 17.3125)" fill="#2B2C30" fillOpacity="1.000000"/>
	</svg>

);

export const rightArrowImage = () => (
	<svg width="22.941406" height="39.941406" viewBox="0 0 22.9414 39.9414" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="Rectangle 4194" y="2.828125" rx="2.000000" width="4.000000" height="28.000000" transform="rotate(-45 0.000000 2.828125)" fill="#2B2C30" fillOpacity="1.000000"/>
		<rect id="Rectangle 4195" x="20.113281" y="17.312500" rx="2.000000" width="4.000000" height="28.000000" transform="rotate(45 20.113281 17.312500)" fill="#2B2C30" fillOpacity="1.000000"/>
	</svg>


);


// Contacts 

export const phoneContacts = () => (
	<svg width="38.757812" height="38.667969" viewBox="0 0 38.7578 38.668" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path id="Vector 189" d="M2.25 5.29C0.14 7.4 -0.1 10.75 1.7 13.13L9.93 24.12C11.25 25.86 12.79 27.41 14.53 28.72L25.52 36.96C27.91 38.75 31.25 38.51 33.36 36.4L37.86 31.9C38.25 31.51 38.25 30.87 37.86 30.48L30.39 23.01C30 22.62 29.37 22.62 28.98 23.01L25.75 26.24C25.45 26.54 24.98 26.62 24.6 26.42L23.21 25.73C18.76 23.51 15.15 19.9 12.92 15.44L12.23 14.06C12.03 13.67 12.11 13.21 12.42 12.91L15.64 9.68C16.03 9.29 16.03 8.66 15.64 8.26L8.17 0.79C7.78 0.4 7.14 0.4 6.75 0.79L2.25 5.29Z" stroke="#F2F2F2" strokeOpacity="1.000000" strokeWidth="1.000000"/>
	</svg>
);

export const mailContacts = () => (
	<svg width="41.000000" height="40.000000" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="Rectangle 4202" x="0.500000" width="40.000000" height="40.000000" fill="#C4C4C4" fillOpacity="0"/>
		<rect id="Rectangle 4202" x="1.000000" y="0.500000" width="39.000000" height="39.000000" stroke="#000000" strokeOpacity="0" strokeWidth="1.000000"/>
		<rect id="Rectangle 1" x="0.500000" y="5.000000" rx="2.000000" width="39.999996" height="30.000000" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.000000"/>
		<path id="Vector 3" d="M0.72 12.05L19.82 21.6Q20.14 21.76 20.5 21.76Q20.85 21.76 21.17 21.6L40.27 12.05L40.72 12.94L21.61 22.5Q21.09 22.76 20.5 22.76Q19.9 22.76 19.38 22.5L0.27 12.94L0.72 12.05Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
	</svg>

);

export const addressContacts = () => (
	<svg width="40.000000" height="40.000000" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="Rectangle 4203" width="40.000000" height="40.000000" fill="#C4C4C4" fillOpacity="0"/>
		<rect id="Rectangle 4203" x="0.500000" y="0.500000" width="39.000000" height="39.000000" stroke="#000000" strokeOpacity="0" strokeWidth="1.000000"/>
		<path id="Ellipse 4" d="M19.69 38.28C19.31 38.68 18.68 38.68 18.3 38.28C15.48 35.3 5 23.6 5 14.48C5 6.39 11.78 1 19 1C26.46 1 33 6.39 33 14.48C33 23.6 22.51 35.3 19.69 38.28Z" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.000000"/>
		<circle id="Ellipse 5" cx="19.000000" cy="15.000000" r="5.500000" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.000000"/>
	</svg>


);

export const socialContacts = () => (
	<svg width="40.000000" height="40.000000" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="Rectangle 4205" width="40.000000" height="40.000000" fill="#C4C4C4" fillOpacity="0"/>
		<rect id="Rectangle 4205" x="0.500000" y="0.500000" width="39.000000" height="39.000000" stroke="#000000" strokeOpacity="0" strokeWidth="1.000000"/>
		<ellipse id="Ellipse 46" cx="20.109375" cy="7.101562" rx="5.473621" ry="5.603093" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.000000"/>
		<mask id="mask_62_12951" fill="white">
			<path id="Subtract" d="M26.5547 37.9766L37.0625 37.9766C37.6094 37.9766 38.0547 37.5273 38.0391 36.9766C37.9062 32.8516 36.9375 17.3789 29.625 17.3789C27.4219 17.3789 25.7891 18.793 24.5859 20.875C27.0156 25.6914 27.4531 34.0977 27.5391 36.9766C27.5547 37.5273 27.1094 37.9766 26.5547 37.9766Z" clipRule="evenodd" fill="" fillOpacity="1.000000" fillRule="evenodd"/>
		</mask>
		<path id="Subtract" d="M26.5547 37.4766L37.0625 37.4766Q37.2656 37.4766 37.4062 37.332Q37.5469 37.1914 37.5391 36.9922Q37.4609 34.6289 37.2031 32.2305Q36.7969 28.5938 36.0391 25.7617Q35.0781 22.1445 33.6016 20.1602Q31.9141 17.8789 29.625 17.8789Q26.8906 17.8789 25.0156 21.125L24.5859 20.875L25.0312 20.6523Q26.6484 23.8438 27.4375 29.5859Q27.7188 31.6328 27.8828 33.8906Q27.9922 35.4648 28.0391 36.9648Q28.0469 37.2695 27.9297 37.5547Q27.8203 37.8242 27.6172 38.0352Q27.4062 38.2422 27.1406 38.3594Q26.8594 38.4766 26.5547 38.4766L26.5547 37.4766ZM26.5547 38.4766L26.5547 37.9766L26.5547 37.4766Q26.7578 37.4766 26.8984 37.332Q27.0391 37.1914 27.0391 36.9922Q26.9922 35.5156 26.8828 33.9609Q26.7266 31.7383 26.4453 29.7227Q26.0938 27.1875 25.5781 25.1406Q24.9609 22.7344 24.1406 21.1016L24.0156 20.8594L24.1562 20.625Q25.1641 18.8789 26.4297 17.9414Q27.875 16.8789 29.625 16.8789Q31.0859 16.8789 32.3359 17.6211Q33.4688 18.293 34.4062 19.5625Q35.9922 21.7031 37.0078 25.5039Q37.7891 28.4062 38.1953 32.1211Q38.4609 34.5586 38.5391 36.9609Q38.5469 37.2695 38.4375 37.5508Q38.3281 37.8242 38.1172 38.0352Q37.9141 38.2422 37.6406 38.3594Q37.3672 38.4766 37.0625 38.4766L26.5547 38.4766Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero"/>
		<mask id="mask_62_12952" fill="white">
			<path id="Subtract" d="M12.5547 37.9766L1.99219 37.9766C1.4375 37.9766 0.992188 37.5273 1.00781 36.9766C1.14062 32.8516 2.10938 17.3789 9.42188 17.3789C11.6484 17.3789 13.2891 18.8164 14.4922 20.9375C12.0938 25.7617 11.6562 34.1094 11.5781 36.9766C11.5625 37.5273 12.0078 37.9766 12.5547 37.9766Z" clipRule="evenodd" fill="" fillOpacity="1.000000" fillRule="evenodd"/>
		</mask>
		<path id="Subtract" d="M12.5547 38.4766L1.99219 38.4766Q1.67969 38.4766 1.40625 38.3594Q1.13281 38.2422 0.929688 38.0352Q0.71875 37.8242 0.609375 37.5508Q0.5 37.2695 0.507812 36.9609Q0.585938 34.5586 0.851562 32.1211Q1.26562 28.4062 2.03906 25.5039Q3.05469 21.7031 4.64062 19.5625Q5.57812 18.293 6.71094 17.6211Q7.96094 16.8789 9.42188 16.8789Q11.1875 16.8789 12.6406 17.9609Q13.9219 18.9141 14.9297 20.6875L15.0625 20.9219L14.9453 21.1602Q14.125 22.7969 13.5234 25.1992Q13.0078 27.2344 12.6562 29.7578Q12.3828 31.7656 12.2266 33.9766Q12.1172 35.5234 12.0781 36.9922Q12.0703 37.1914 12.2109 37.332Q12.3516 37.4766 12.5547 37.4766L12.5547 38.4766ZM12.5547 37.4766L12.5547 37.9766L12.5547 38.4766Q12.25 38.4766 11.9766 38.3594Q11.7031 38.2422 11.5 38.0352Q11.2891 37.8242 11.1797 37.5547Q11.0703 37.2695 11.0781 36.9648Q11.1172 35.4727 11.2266 33.9062Q11.3906 31.6602 11.6641 29.625Q12.4531 23.9102 14.0469 20.7109L14.4922 20.9375L14.0625 21.1836Q12.1797 17.8789 9.42188 17.8789Q7.13281 17.8789 5.44531 20.1602Q3.97656 22.1445 3.00781 25.7617Q2.25 28.5938 1.84375 32.2305Q1.58594 34.6289 1.50781 36.9922Q1.5 37.1914 1.64062 37.332Q1.78125 37.4766 1.99219 37.4766L12.5547 37.4766Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero"/>
		<path id="Rectangle 4161" d="M12.27 38C12.27 38 12.27 17.4 20.11 17.4C27.95 17.4 27.95 38 27.95 38L12.27 38Z" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.000000"/>
	</svg>
);

export const hoursContacts = () => (
	<svg width="40.000000" height="40.000000" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="Rectangle 4206" width="40.000000" height="40.000000" fill="#C4C4C4" fillOpacity="0"/>
		<rect id="Rectangle 4206" x="0.500000" y="0.500000" width="39.000000" height="39.000000" stroke="#000000" strokeOpacity="0" strokeWidth="1.000000"/>
		<circle id="Ellipse 54" cx="20.000000" cy="19.000000" r="18.500000" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.000000"/>
		<path id="Vector 64" d="M34 19L20.25 19C20.1 19 20 18.88 20 18.75L20 5" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.000000" stroke-linecap="round"/>
	</svg>


);