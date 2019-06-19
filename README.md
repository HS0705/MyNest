# MyNest 

This application is intended to help you decide what should be your next Nest.
All you have to do is enter the city where you want to move in and this app will 
find you the apartments in that city and all the related information. The data 
is restricted only for cities in USA.

### Steps:

*   New users should Register
*   Users should Log in to use the application
*   Start typing the city name and once options are shown choose the city name, 
    click on Search button
*   Apartments are displayed on map as well as in the list panel. Scroll the 
    list panel to see all the apartments
*   Click on Next page button to see more results for that city. Once all the 
    results have been populated the Next page button is disabled.
*   Mark the apartment  as favorite by clicking on Save button. Apartment Id 
    marked as favorite are saved on the database
*   To get related information for any apartment click on the Get Info button
*   Information page has tabs that shows the respective data(Apartments, Doctors,
    Shopping,Restaurants and Schools)
*   Details button shows the Yelp page for that business.

### Prerequisites:

*   Python3  already installed.
*   Create  database using `psql createdb databasename` command
*   Run `python3 model.py` 
*   Run `db.create_all()` command once you run the model.py
*   Requires all the mentioned dependencies in requirements.txt 
*   Google Maps `API key` and `Yelp API` key to run this project.

### Installation:

Run  `pip3 install -r requirements.txt` in command prompt.





