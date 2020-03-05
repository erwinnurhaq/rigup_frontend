export const setCatList = (arr) => {
	return {
		type: 'CATLIST_CHANGE',
		payload: arr
	};
};

export const setNewCategories = (arr) => {
	return {
		type: 'NEWCATEGORIES_CHANGE',
		payload: arr
	};
};

export const setNewProduct = (prop, value) => {
	return {
		type: 'NEWPRODUCT_CHANGE',
		payload: { prop, value }
	};
};

export const setNewImage = (arr) => {
	return {
		type: 'IMAGE_CHANGE',
		payload: arr
	};
};

export const setInitialFormProduct = () => {
	return { type: 'INITIALFORMPRODUCT' };
};

export const setDeleteImage = (arr) => {
	return {
		type: 'IMAGEWILLDELETE',
		payload: arr
	}
}