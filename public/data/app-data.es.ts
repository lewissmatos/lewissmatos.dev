import { appDataDisplayName, appDataSocialLinks } from "./app-data.global";
export const portfolioData = {
	fullName: appDataDisplayName,
	role: "Desarrollador Fullstack",
	aboutMe:
		"Me considero una persona que ama aprender. Siempre estoy buscando algo nuevo para aprender (no solo en el mundo de la TI), y nuevos desafíos y oportunidades para crecer. Soy apasionado por la tecnología y siempre estoy buscando formas de mejorar mis habilidades. Soy un jugador de equipo y siempre estoy dispuesto a ayudar a los demás. Me gustan las matemáticas, el ajedrez y el dominó.",
	technicalAboutMe:
		"Cuando hablo de mis habilidades técnicas, tengo experiencia en desarrollo web, desarrollo móvil y desarrollo backend. He trabajado con diferentes tecnologías y frameworks, como React.js, Node.js, Flutter, .Net Core, Angular2+ y más. Tengo un sólido entendimiento de Diseño Orientado al Dominio, Arquitectura Limpia y principios SOLID. He ocupado el rol de Líder de Equipo de Desarrollo, analizando los requisitos del proyecto, definiendo y desarrollando entregables, y más.",
	avatar: "/public/images/profile.jpeg",
	basedAt: "Santo Domingo, República Dominicana",
	socialLinks: appDataSocialLinks,
	workExperience: [
		{
			roleTitle: "Líder de equipo de desarrollo y Desarrollador Full-stack",
			company: "Ab-InBev (Cervecería Nacional Dominicana)",
			responsibilities: [
				"Desarrollé características de software para mejorar la funcionalidad de los productos y la experiencia del usuario.",
				"Analicé los requisitos del proyecto, definí los entregables y asigné tareas a los miembros del equipo.",
				"Gestioné y coordiné las actividades de los miembros del equipo para asegurar la finalización oportuna del proyecto.",
				"Identifiqué, diagnostiqué y resolví problemas del producto para mantener un rendimiento óptimo.",
			],
			counties: ["Santo Domingo, RD", "Paraná, Brasil"],
			startDate: "2022",
			endDate: null,
		},
		{
			roleTitle: "Desarrollador Web Intermedio",
			company: "Cervecería Nacional Dominicana",
			responsibilities: [
				"Desarrollé nuevas características.",
				"Co-diseñé flujos de desarrollo.",
				"Resolví problemas del producto para mantener un rendimiento óptimo.",
			],
			counties: ["Santo Domingo, RD"],
			startDate: "2020",
			endDate: "2022",
		},
	],
	skills: [
		{
			tag: "Lenguajes de programación",
			skills: ["Javascript/Typescript", "Dart", "C#", "Python", "SQL"],
		},
		{
			tag: "Frameworks",
			skills: ["React.js", "Node.js", "Flutter", ".Net Core", "Angular2+"],
		},
		{
			tag: "Bases de Datos",
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
			tag: "Herramientas",
			skills: ["PowerBI", "PowerApps", "Excel", "Azure DevOps"],
		},
		{
			tag: "Plataformas",
			skills: [
				"VS Code",
				"Visual Studio",
				"JetBrains Rider",
				"Azure Data Studio",
			],
		},
		{
			tag: "Lenguajes",
			skills: [
				"Español (Nativo)",
				"Inglés (Intermedio - Avanzado",
				"Portugués (Básico)",
			],
		},
		{
			tag: "Habilidades Blandas",
			skills: [
				"Comunicación",
				"Liderazgo",
				"Trabajo en equipo",
				"Autodidacta",
				"Resolución de problemas",
				"Adaptabilidad",
				"Atención a los detalles",
			],
		},
	],
	educationBackground: [
		{
			degree: "Ingeniería de Software",
			institution: "Universidad APEC",
			startDate: "2023",
			endDate: null,
			description:
				"Análisis y diseño de software, desarrollo web, sistemas informáticos, estructuras de datos y algoritmos, diseño de bases de datos, matemáticas, estadísticas, física, administración de proyectos.",
		},
		{
			degree: "Programa de Inmersión en Inglés",
			institution: "Instituto Dominico-Americano",
			startDate: "2022",
			endDate: "2022",
			description:
				"Escritura, lectura, gramática, escucha, conversación, presentaciones temáticas, socialización.",
		},
		{
			degree: "Ciencias de la Computación",
			institution: "UCATEBA",
			startDate: "2019",
			endDate: "2021",
			description:
				"Introducción a los sistemas informáticos, estructuras de datos y algoritmos, diseño y administración de bases de datos, fundamentos de programación, matemáticas, estadísticas.",
		},
	],
};
