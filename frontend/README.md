# Interview Creation Portal IBA - Frontend

Create a simple app where admins can create interviews by selecting participants, interview start time and end time

### Deployed here : https://interview-creation-portal-ibaf.herokuapp.com/

## Basic Requirements

- An interview creation page where the admin can create an interview by selecting participants, start time and end time. Backend should throw error with proper error message if:
  - Any of the participants is not available during the scheduled time (i.e, has another interview scheduled)
  - No of participants is less than 2
- An interviews list page where admin can see all the upcoming interviews.
- Note: No need to add a page to create Users/Participants. Create them directly in the database

## How to build and run this project

- Clone this repository.
- Execute `npm install`
- Make sure [backend](https://github.com/Ashish0077/InterviewCreationPortal_IBA) is running.
- Execute `npm start`.
- App will start running at `http://localhost:3001/`

<br>
NOTE: We can change the API_URL and PORT from src/config/config.js
