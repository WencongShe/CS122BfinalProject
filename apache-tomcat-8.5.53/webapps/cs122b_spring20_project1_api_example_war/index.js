/**
 * This example is following frontend and backend separation.
 *
 * Before this .js is loaded, the html skeleton is created.
 *
 * This .js performs two steps:
 *      1. Use jQuery to talk to backend API to get the json data.
 *      2. Populate the data to correct html elements.
 */


/**
 * Handles the data returned by the API, read the jsonObject and populate data into html elements
 * @param resultData jsonObject
 */
function handleMovieResult(resultData) {
    console.log("handleStarResult: populating star table from resultData");

    // Populate the star table
    // Find the empty table body by id "star_table_body"
    let movieTableBodyElement = jQuery("#movie_table_body");

    for (let i = 0; i < resultData.length ; i++) {
        let rowHTML = "";
        rowHTML += "<tr>";
        rowHTML += "<th>" +
                    '<a href = "single-movie.html?id=' + resultData[i]['movie_id'] + '">' + resultData[i]["movie_title"] + '</a>' +
                    "</th>";
        rowHTML += "<th>" + resultData[i]["movie_year"] + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_director"] + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_rating"] + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_genres"] + "</th>";
        if (resultData[i]["num_movie_star"]>2){
            rowHTML += "<th>"
                + '<a href="single-star.html?id=' + resultData[i]['star_id1'] + '">' + resultData[i]["movie_star1"] + '</a>'+ " , "
                + '<a href="single-star.html?id=' + resultData[i]['star_id2'] + '">' + resultData[i]["movie_star2"] + '</a>'+ " , "
                + '<a href="single-star.html?id=' + resultData[i]['star_id3'] + '">' + resultData[i]["movie_star3"] + '</a>'+ "</th>";
            //--------------
        }
        else{
            if(resultData[i]["num_movie_star"]==2){
                rowHTML += "<th>"
                     + '<a href="single-star.html?id=' + resultData[i]['star_id1'] + '">' + resultData[i]["movie_star1"] + '</a>' + " , "
                     + '<a href="single-star.html?id=' + resultData[i]['star_id2'] + '">' + resultData[i]["movie_star2"] + '</a>' + "</th>";
                //--------------
            }
            else if(resultData[i]["num_movie_star"]==1){
                rowHTML += "<th>"
                    + '<a href="single-star.html?id=' + resultData[i]['star_id1'] + '">' + resultData[i]["movie_star1"] + '</a>'+ "</th>";
                //--------------
            }
            else{}
        }
        rowHTML += "</tr>";

        // Append the row created to the table body, which will refresh the page
        movieTableBodyElement.append(rowHTML);
    }
}

/**
 * Once this .js is loaded, following scripts will be executed by the browser
 */

// Makes the HTTP GET request and registers on success callback function handleStarResult
jQuery.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/movies", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMovieResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});