import { appDataDisplayName, appDataSocialLinks } from "./app-data.global";

export const portfolioData = {
	fullName: appDataDisplayName,
	role: "Fullstack Developer",
	aboutMe:
		"I consider myself as a person who loves learning. I'm always looking for something new to learn (not only in the IT world), and for new challenges and opportunities to grow. I'm passionate about technology and I am always looking for ways to improve my skills. I'm a team player and I am always willing to help others. I like Maths, Chess, and Dominoes.",
	technicalAboutMe:
		"When talking about my technical skills, I have experience in web development, mobile development, and backend development. I have worked with different technologies and frameworks, such as React.js, Node.js, Flutter, .Net Core, Angular2+, and more. I have strong understanding of Domain Driven Design, Clean Architecture, and SOLID principles. I've held the role of Development Team Lead, analyzing project requirements, defining and developing deliverables, and more.",
	basedAt: "Santo Domingo, Dominican Republic",
	socialLinks: appDataSocialLinks,
	workExperience: [
		{
			roleTitle: "Development Team Lead & Full-stack Developer",
			company: "Ab-InBev (Cervecería Nacional Dominicana)",
			responsibilities: [
				"Developed software features to enhance products functionality and user experience.",
				"Analyzed project requirements, defined deliverables, and assigned tasks to team members.",
				"Managed and coordinated team member activities to ensure timely project completion.",
				"Identified, diagnosed, and resolved product issues to maintain optimal performance.",
			],
			counties: ["Santo Domingo, DR", "Paraná, Brazil"],
			startDate: "2022",
			endDate: null,
		},
		{
			roleTitle: "Middle Web Developer",
			company: "Cervecería Nacional Dominicana",
			responsibilities: [
				"Developed new features.",
				"Co-designed development flows.",
				"Resolved product issues to maintain optimal performance.",
			],
			counties: ["Santo Domingo, DR"],
			startDate: "2020",
			endDate: "2022",
		},
	],
	skills: [
		{
			tag: "Programming languages",
			skills: ["Javascript/Typescript", "Dart", "C#", "Python", "SQL"],
		},
		{
			tag: "Frameworks",
			skills: ["React.js", "Node.js", "Flutter", ".Net Core", "Angular2+"],
		},
		{
			tag: "Database",
			skills: [
				"PostgreSQL",
				"Supabase",
				"Firebase",
				"IsarDB",
				"MongoDB",
				"SQL Server",
				"MySQL",
			],
		},
		{
			tag: "Tools",
			skills: ["PowerBI", "PowerApps", "Excel", "Azure DevOps"],
		},
		{
			tag: "Platforms",
			skills: [
				"VS Code",
				"Visual Studio",
				"JetBrains Rider",
				"Azure Data Studio",
			],
		},
		{
			tag: "Languages",
			skills: [
				"Spanish (Native)",
				"English (Intermediate - Advanced)",
				"Portuguese (Basic)",
			],
		},
		{
			tag: "Soft Skills",
			skills: [
				"Communication",
				"Leadership",
				"Teamwork",
				"Self-taught",
				"Problem-solving",
				"Adaptability",
				"Attention to detail",
			],
		},
	],
	educationBackground: [
		{
			degree: "Software Engineering",
			institution: "Universidad APEC",
			startDate: "2023",
			endDate: null,
			description:
				"Software Analysis and Design, Web development, Computer Systems, Data Structures and Algorithms, DB design, Mathematics, Statistics, Physics, Project administration.",
		},
		{
			degree: "English Immersion Program",
			institution: "Instituto Dominico-Americano",
			startDate: "2022",
			endDate: "2022",
			description:
				"Writing, Reading, Grammar, Listening, Conversation, Themed Presentations, Socializing.",
		},
		{
			degree: "Computer Science",
			institution: "UCATEBA",
			startDate: "2019",
			endDate: "2021",
			description:
				"Introduction to Computer Systems, Data Structures and Algorithms, DB design and administration, Programming Fundamentals, Mathematics, Statistics.",
		},
	],
};

export const projectsData = [{}];
