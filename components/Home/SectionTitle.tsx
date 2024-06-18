import React from "react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
	return (
		<h3 className="text-2xl sm:text-2xl md:text-3xl text-center font-bold">
			{children}
		</h3>
	);
};

export default SectionTitle;
