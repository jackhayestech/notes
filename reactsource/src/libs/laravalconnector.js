export function getNotesMeta(sessionID,callback)
{
    var xmlHttp = new XMLHttpRequest();
    var url = 'http://localhost/api/notes/getmeta/' + sessionID;
    xmlHttp.open( "GET", url, true ); // false for synchronous request
    xmlHttp.responseType = 'json';
    xmlHttp.onload = function() 
    {
        var status = xmlHttp.status;
        if (status === 200) 
        {
            callback(null, xmlHttp.response);
        } 
        else 
        {
            callback(status, xmlHttp.response);
        }
    };
    xmlHttp.send();
}