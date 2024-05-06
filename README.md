# Seed-Swap
The functionality of this website comes from the fact that in the pepper world, growers tend to trade specific strains of peppers with each other not with money but with other pepper strains


we used bootstrap, bcrypt, express, express-session, handlebars, mongodb, multer, and xss sanitization.

to get things up and running, first get mondgo running on your computer. run "npm i" in the directory, then "npm run seed" to seed data, and then "npm run start" to get the server running. head over to localhost:3000 to use the platform.

worth noting that the files tradesValidation.js, usersValidation.js, and pepperValidation all have xss protection/sanitization written in their functions.

there is no way to give yourself moderator privileges through the frontend. to give yourself mdoerator privileges, you must either adjust the moderator boolean field in the respective mongoDb document in the users collection, or calling the await usersData.createUser function in seed.js with the moderator field set to true.

github repo at:
https://github.com/EricY090/Seed-Swap--in-progress