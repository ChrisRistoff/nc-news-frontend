# Overview

Forum on which users are able to login, register, browse articles, post or delete comments, and vote on other users'
content.

#### [Deployed link](https://krasen-news.netlify.app/)

The site is hosted on Netlify, and the backend is hosted on Render and AWS. Frontend requests are made to the backend on
Render, which then makes requests to the database.

#### Note: The backend hosted on Render spins down after 30 minutes of inactivity, so the first request may take a few seconds to complete.

When users interact with the site, requests are made to my Northcoders News API. A link to the GitHub and documentation
of that can be found below.

#### [GitHub link](https://github.com/krasenHristov/nc-news)

#### [Documentation link](http://ec2-35-179-90-244.eu-west-2.compute.amazonaws.com/api/docs/)

# Local Setup Instructions

### Prerequisites

- Node.js v21.4.0
- Vite v5.0.3

### Cloning the Repository

Begin by clicking on the CODE button above and copying the URL. Then, navigate to the directory into which you would
like to clone the repository, and run this command:

```git clone <URL> && cd nc-news-frontend```

Then run the following command:

```npm install && npm run dev```