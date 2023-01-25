/**
 * Array to visualize the structure of the database users-array
 */
let usersScript = [
	{
		name: "Eugen Oswald",
		surname: "Oswald",
		picture: "eugen.jpg",
		email: "oswald.eugen@test.com",
		phone: "888 123 123",
		password: "xxxxx",
		color: "#1fd7c1",
	},
	{
		name: "Kate Rina",
		surname: "Rina",
		picture: "kate.jpg",
		email: "kateRollin@xxx.com",
		phone: "333444555",
		password: "cheeseee",
		color: "#ff8a00",
	},

	{
		name: "Guest Guest",
		surname: "Guest",
		picture: "randomprofilepicture.webp",
		email: "guest@test.de",
		phone: "",
		password: "none123",
		color: "#4e963d",
	},
];

/**
 * Array to visualize the structure of the database tasks-array
 */
let tasksScript = [
	{
		id: 0,
		title: "Lasst uns starten :)",
		category: "Design", // Design, Marketing, Sales, Backoffice, Media usw.
		categorycolor: "#091931",
		description: "Hier wird ein unnötiger Beschreibungstext stehen, der von dem User festgelegt wird",
		dueDate: "30-10-2010",
		priority: "Medium", // Urgent, Medium, Low
		status: "To do", // To do, In progress, Awaiting feedback, Done
		assignedTo: ["oswald.eugen@test.com"], // Email of users Array (ist eindeutig)
		subTasks: ["Putzen", "Spülen", "Saubermachen"],
	}
];
