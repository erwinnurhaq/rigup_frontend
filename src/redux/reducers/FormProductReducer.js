const initialState = {
	catList: [],
	newCategories: [0],
	newProduct: { brandId: 0, name: '', description: '', weight: 0, wattage: 0, price: 0, stock: 0 },
	newImage: [],
	deleteImage: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'CATLIST_CHANGE':
			return { ...state, catList: action.payload };
		case 'NEWCATEGORIES_CHANGE':
			return { ...state, newCategories: action.payload };
		case 'NEWPRODUCT_CHANGE':
			return { ...state, newProduct: { ...state.newProduct, [action.payload.prop]: action.payload.value } };
		case 'IMAGE_CHANGE':
			return { ...state, newImage: action.payload };
		case 'INITIALFORMPRODUCT':
			return {
				...initialState,
				catList: [state.catList[0]]
			};
		case 'FORMDETAILPRODUCT':
			return { ...state, ...action.payload }
		case 'IMAGEWILLDELETE':
			return { ...state, deleteImage: action.payload }
		default:
			return state;
	}
};
