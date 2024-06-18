"use client";
import { useLocale } from "@/hooks/useLocale";
import { Link } from "@nextui-org/react";
import { format } from "date-fns";
import React from "react";

const Footer = () => {
	const currentYear = format(new Date(), "yyyy");
	const { translate } = useLocale();
	return (
		<div className=" py-10 flex justify-between">
			<span>
				© {currentYear}
				<Link
					color="foreground"
					href="https://www.linkedin.com/in/lewissmatos"
					target="_blank"
					rel="noreferrer"
					isBlock
					className="text font-bold"
				>
					<span className="l">lewissmatos. </span>
				</Link>
				{translate("footer.almostAllRightsReserved")}
			</span>
			<Link
				color="foreground"
				href="mailto:lewissmatos@gmail.com"
				target="_blank"
				rel="noreferrer"
				isBlock
				className="text font-bold"
			>
				<span className="l">{translate("contact")}</span>
			</Link>
		</div>
	);
};

export default Footer;
