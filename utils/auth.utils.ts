export const getParamFromUrl = (url: string, param: string): string => {
	const paramsArr = url.split("?")[1]?.split("&") || [];

	const params = paramsArr.map((param: string) => {
		return {
			[param.split("=")[0]]: param.split("=")[1],
		};
	});

	const result = params.find((p) => p[param]);
	return result ? result[param] : "";
};
