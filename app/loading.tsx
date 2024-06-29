import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<Spinner size="lg" />
		</div>
	);
};

export default Loading;
