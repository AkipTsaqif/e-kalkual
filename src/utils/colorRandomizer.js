export const colorRandomizer = () => {
	var hexColor = Math.floor(Math.random() * 0xffffff);
	var color = "#" + hexColor.toString(16);

	return color;
};
