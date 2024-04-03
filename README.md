# Web Development Project 5 - LocalDrafts

## Check it out here! -> [Local Drafts](https://lumberger22.github.io/LocalDrafts/)

Submitted by: **Lucas Umberger**

**Local Drafts is an innovative web application designed for beer enthusiasts and casual drinkers alike, offering a dynamic and user-friendly platform to discover breweries in their immediate vicinity. By harnessing the power of location-based technology, Local Drafts displays a detailed map pinpointing nearby breweries, ranging from well-known establishments to hidden gems off the beaten path. The user can filter their results by name search or by brewery type.**

 - Languages: JavaScript, HTML, CSS
 - Framework: React
 - APIs used:
     - Open Brewery DB --> [Documentation](https://www.openbrewerydb.org/documentation)
     - Google Maps JS API --> [Documentation](https://developers.google.com/maps/documentation/javascript)

Time spent: **24** hours spent in total

## User Features

The following **required** functionality is completed:

- [x] **The list displays a list of data fetched using an API call**
- [x] **Data uses the useEffect React hook and async/await syntax**
- [x] **The app dashboard includes at least three summary statistics about the data such as nearest brewery, breweries shown, and a map pinpointing breweries shown based on latitude and   longitude**
- [x] **A search bar allows the user to search for an item in the fetched data**
- [x] **Multiple different filters (2+) allow the user to filter items in the database by specified categories**
- [ ] **The app includes at least one unique chart developed using the fetched data that tell an interesting story**
- [x] **Clicking on an item in the list view displays more details about it**
- [x] **Clicking on an item has a direct, unique link to that item's detail view page**

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types such as a text input, a selection, or a slider

The following **additional** features are implemented:

* [x] All filtered breweries are displayed on a map and can be interacted with
* [x] Brewery Detail Cards are linked to brewery website if provided in API call
* [x] Header sidebar provides navigational links to parts of the page

## Video Walkthrough

Here's a walkthrough of implemented user features:

![](LocalDrafts_walkthrough.gif)

GIF created with ScreenToGif

## Challenges

  - One of the biggest challenges I had was getting the map to display on the screen with the markers. I originally was using a deprecated react-google-maps API because I did not know about the Google Maps Platform that has a JS Maps API. I then switched to it and was able to render the map successfully. I then had to figure out how to get the Markers on the screen and map through them. I was able to pass props to the map so that when it is updated in App.jsx, the map rerenders and markers update.
  - Another challenge I had was with getting the filters to work on the list and filteredResults arrays. To get to the solution I decided on, the stucture went through several revisions that involved changing methods and adding different variables. I orignially was using the filtered results starting at zero and when a filter was changed I would put the filtered results into the array. This however caused errors with trying to load the filtered results when no results were found. I ended up starting with filteredResults being the full json, and trimming it down if a filter was changed.
  - Working on the second part of the project, where I implemented the detail cards that are linked to the dashboard listing, I had trouble getting the results to save for the user. By this I mean that when the user applied a filter to the inital brewery list, went to the detail page, and went back to the dashboard, the filters were reset. I wanted to keep the filters on for usability. I initally was going to pass a state prop in between links but could not effectively pass the selected types list and search input string. I ended up using the sessionStorage to hold the filters and updated them each time the page was reset.

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
