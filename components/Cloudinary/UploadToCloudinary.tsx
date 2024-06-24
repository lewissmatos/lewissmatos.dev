import { useLocale } from "@/hooks/useLocale";
import { Button } from "@nextui-org/react";
import { CldUploadWidget } from "next-cloudinary";
import { FC, useEffect, useState } from "react";

import React from "react";
type UploadToCloudinaryProps = {
	options?: any;
	onUploadCover?: (url: string | undefined) => void;
	onUploadScreenshots?: (url: string | undefined) => void;
	defaultValues?: string[];
};
const UploadToCloudinary: FC<UploadToCloudinaryProps> = ({
	options,
	onUploadCover,
	onUploadScreenshots,
	defaultValues,
}) => {
	const { translate } = useLocale();
	const [elements, setElements] = useState<string[] | null>(
		defaultValues?.length ? defaultValues : null
	);
	useEffect(() => {
		if (defaultValues?.length) {
			setElements(defaultValues);
		}
	}, [defaultValues]);
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
			}}
			options={{
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
						{elements?.length ? (
							<div className="flex flex-col">
								<span>
									{translate(
										onUploadCover
											? "addProjectForm.updateCoverImage"
											: "addProjectForm.updateScreenshots"
									)}
								</span>
								<span className="text text-xs">
									{translate("addProjectForm.elementsAttached")}
								</span>
							</div>
						) : (
							<div className="flex flex-row">
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
