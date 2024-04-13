   [![Project Banner](https://github-production-user-asset-6210df.s3.amazonaws.com/99420590/256470702-de779111-e63e-4ecc-93d1-e79edadf19ed.png)](https://hayasaka.live/)

This is a free music streaming web application built with Next.js and powered by the [savan API](https://github.com/sumitkolhe/jiosaavn-api). The app allows users to search and stream music from a vast collection of songs available on the Saavn platform.

## Features
* Search and stream music from vast collection.
* Play, pause, skip, and control the playback of songs.
* Create your own playlists.
* Add songs to your favorite.
* Auto add similar songs to queue.
* Display song details such as title, artist, album, and album artwork.
* Responsive and mobile-friendly design for a great user experience.
* Minimalistic and intuitive user interface.
***
![image](https://github.com/himanshu8443/hayasaka/assets/99420590/158bc035-463e-403b-a23a-db17b83ab7b0)
___
![image](https://github.com/himanshu8443/hayasaka/assets/99420590/864aec2b-8d60-4278-a475-9f7ee6ae7680)


***
## Installation

1. Clone the repository to your local machine.
    ```sh
    git clone https://github.com/himanshu8443/hayasaka.git
    ```

2. Install the required packages.
    ```sh
    cd hayasaka
    ```
    ```sh
    npm install
    ```

3. Set up the environment variables:
    Create env file in root dir.
   ```
    MONGODB_URL = MongoDB connection string
    DB_NAME = database name

   JWT_SECRET = JWT secret
   NEXTAUTH_URL= next auth url (http://localhost:3000 or your domain)

   
   GOOGLE_CLIENT_ID = Google client id  (https://analytify.io/get-google-client-id-and-client-secret)
   GOOGLE_CLIENT_SECRET = Google client secret


   MAIL_HOST = mail host (smtp.gmail.com)
   MAIL_USER = mail user (your gmail address)
   MAIL_PASS = mail password (google app password)

   NEXT_PUBLIC_SAAVN_API = "https://saavn.dev" # Saavn API URL create your own API from https://github.com/sumitkolhe/jiosaavn-api 
   ```

5. Start the development server.
    ```sh
    npm run dev
    ```

6. Open the project in your browser at [`http://localhost:3000`](http://localhost:3000) to view your project.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


