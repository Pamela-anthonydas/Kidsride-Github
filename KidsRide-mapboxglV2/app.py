from flask import Flask, render_template, redirect,request
from flask_pymongo import PyMongo
import json
#import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/KidsRidedb1"
mongo = PyMongo(app)

#mongo = PyMongo(app, uri="mongodb://localhost:27017/weather_app")

# Or set inline



@app.route("/")
def index():
    #mars_data = mongo.db.collection.find_one()
    return render_template("index.html")
	
	#destination_data = mongo.db.collection.find_one()
	#return render_template("index.html", vacation=destination_data)
    
@app.route("/map",endpoint='map')
def map():
    return render_template("Marker_Clusters.html")

@app.route("/directions",endpoint='directions')
def directions():
    return render_template("Marker_Clusters2.html")

@app.route("/data")
def data():
    #mars_data  = mongo.db.mars_data 
    # mars= scrape_mars.scrape()
    # mongo.db.collection.update({}, mars, upsert=True)
    # return redirect("/", code=302)

    # names=mongo.db.activityData2.find( {} )
    # #return render_template('Marker_Clusters.html', names=names)
    # return jsonify(names)

    # data = mongo.db.activityData2.find_one()
    # return render_template('Marker_Clusters.html', data=data)
    #return jsonify(data)
    # db = client[KidsRidedb1]
    # collection = db[activityData2]
    # documents = activityData2.find()
    documents = mongo.db.activityData2.find()
    response = []
    for document in documents:
        #document['_id'] = str(document['_id'])
        response.append(document)
    return json.dumps(response)

    # myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    # mydb = myclient["KidsRidedb1"]
    # mycol = mydb["activityData2"]

    # for x in mycol.find({},{ "_id": 0, "name": 1, "address": 1 }):
    #     print(x)

    # for category,name,address,city,state, location,reviews, url,contactPhone in results:
    #     kids_dict = {}
    #     kids_dict["category"] = category
    #     kids_dict["name"] = name
    #     kids_dict["address"] = address
    #     kids_dict["city"] = city
    #     kids_dict["state"] = state
    #     kids_dict["location"] = location
    #     kids_dict["reviews"] = reviews
    #     kids_dict["url"] = url
    #     kids_dict["contactPhone"] = contactPhone
    #     prcp_data.append(kids_dict)

    # return jsonify(prcp_data)



if __name__ == "__main__":
    app.run(debug=True)
