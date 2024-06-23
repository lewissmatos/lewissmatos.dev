import { useLocale } from "@/hooks/useLocale";
import { useAppSelector } from "@/redux/appStore";
import { Button } from "@nextui-org/react";
import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";
import { FC, useState } from "react";

import React from "react";
type UploadToCloudinaryProps = {
	options?: any;
	onUploadCover?: (url: string | undefined) => void;
	onUploadScreenshots?: (url: string | undefined) => void;
};
const UploadToCloudinary: FC<UploadToCloudinaryProps> = ({
	options,
	onUploadCover,
	onUploadScreenshots,
}) => {
	const [elements, setElements] = useState<string[] | null>(null);
	const { translate } = useLocale();
	const theme = useAppSelector((state) => state.preferences.theme);
	return (
		<CldUploadWidget
			uploadPreset="lewissmatos-site"
			onSuccess={(result, { widget }) => {
				const url = (result?.info as unknown as any)?.secure_url;
				const name = (result?.info as unknown as any)?.display_name;
				if (!url) return;
				onUploadCover?.(url);
				onUploadScreenshots?.(url);
				setElements((prevValue) => {
					if (!prevValue) return [name];
					return [...prevValue, name];
				});
				// widget.close();
			}}
			options={{
				theme,
				...options,
			}}
		>
			{({ open }) => {
				function handleOnClick() {
					setElements(null);
					onUploadCover?.(undefined);
					open();
				}
				return (
					<Button onClick={handleOnClick} size="lg">
						{elements ? (
							<div className="flex flex-col gap-1">
								<span>
									{translate(
										onUploadCover
											? "addProjectForm.updateCoverImage"
											: "addProjectForm.updateScreenshots"
									)}
								</span>
								<span className="text text-xs">{elements?.join(", ")}</span>
							</div>
						) : (
							<div className="flex flex-row gap-1">
								<span className="icon-[material-symbols--upload] text-xl"></span>
								<span>
									{translate(
										onUploadCover
											? "addProjectForm.uploadCoverImage"
											: "addProjectForm.uploadScreenshots"
									)}
								</span>
							</div>
						)}
					</Button>
				);
			}}
		</CldUploadWidget>
	);
};

export default UploadToCloudinary;
