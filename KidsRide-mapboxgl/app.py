from flask import Flask, render_template, redirect,request
from flask_pymongo import PyMongo
import json
#import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/KidsRidedb3"
mongo = PyMongo(app)

# Home route to render home page
@app.route("/")
def index():
    return render_template("index.html")

#  /map  route to render marker cluster on map based on clusterslogic.js   
@app.route("/map",endpoint='map')
def map():
    return render_template("Marker_Clusters.html")

#  /directions   route to render driving directions on map based on directionslogic.js 
@app.route("/directions",endpoint='directions')
def directions():
    return render_template("directions.html")

# /data route to return mongo db data to clusterslogic.js  and directionslogic.js 
@app.route("/data")
def data():
    documents = mongo.db.activityData20.find()
    response = []
    for document in documents:
        #document['_id'] = str(document['_id'])
        response.append(document)
    return json.dumps(response)

if __name__ == "__main__":
    app.run(debug=True)
