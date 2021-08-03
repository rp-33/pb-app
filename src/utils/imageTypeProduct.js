
export const imageTypeProduct = (type)=>{
	switch (type) {
        case 'boutique':
        	return (require(`../assets/images/boutique.png`));
        case 'daycare':
        	return (require(`../assets/images/daycare.png`));
        case 'food':
        	return (require(`../assets/images/food.png`));
        case 'supermarket':
        	return (require(`../assets/images/supermarket.png`));
        default:
           	return (require(`../assets/images/logo.png`));
    }
}