# Articles managment - CRUD React Application

This is a simple web application for managing a list of articles. The project consists of three pages:

1. Articles List Page: Displays a list of articles with the ability to search by description and title. Users also can pin article, which will make it appear first in the list. Only one pinned item allowed. Clicking on the edit button will redirect you to another page with the data of the selected article for editing.

2. Add/Edit Article Page: Allows creating new articles. The form contains fields for entering the title, author, image, and descripion. Article data is stored on the fake server.

3. Articles List Page(Data from External Source). Clicking on the 'Add 10 new articles' button allows the user to retrieve an additional 10 articles. The articles are not repeated if the user clicks the button several times.

## Steps to run the project:

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install`.
3. Start the application by running `npm start`.
4. Open your web browser and navigate to http://localhost:3000/ to access the application.
5. On another terminal run data base `json-server db.json -p 4000 -w`

Technologies:
 - React
 - TypeScript
 - React Router
 - Redux/toolkit
 - Bulma


