
export const imagePet = (pet)=>{

		switch (pet) {
        	case 'dog':
        		return (require(`../assets/images/dog.png`));
        	case 'cat':
        		return (require(`../assets/images/cat.png`));
        	case 'horse':
        		return (require(`../assets/images/horse.png`));
        	case 'hamster':
        		return (require(`../assets/images/hamster.png`));
        	case 'fish':
        		return (require(`../assets/images/fish.png`));
        	default:
            	return (require(`../assets/images/logo.png`));
        }
}