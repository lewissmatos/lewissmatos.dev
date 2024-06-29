"use client";
import ProjectsList from "@/components/Projects/ProjectsList";
import React, { useEffect, useState } from "react";

const page = () => {
	return (
		<main className="flex flex-col gap-6 pb-4">
			<ProjectsList />
		</main>
	);
};

export default page;
