from flask import Flask, redirect, request, render_template, session, json
from jinja2 import StrictUndefined
from yelp_api import (get_doctor_info,get_restaurant_info,get_store_info,
                        get_school_info)
import os

app = Flask(__name__)
# app.jinja_env.undefined = StrictUndefined
# app.jinja_env.auto_reload = True

# Required to use Flask sessions and the debug toolbar
app.secret_key = os.environ.get('app_key')

@app.route('/',methods=['GET','POST'])
def home_page():
    """Renders Homepage"""
    
    if request.method == 'POST':
        session['address'] = request.form['address']
        return redirect('/search')
    return render_template("homepage.html")


@app.route('/search')
def click():
    """Renders apartments page """

    return render_template("apartments.html")


@app.route('/information/<formatted_address>')

def get_information(formatted_address):
    """Renders information page  for the selected apartmemt"""

    doctors = get_doctor_info(formatted_address)
    restaurants = get_restaurant_info(formatted_address)
    stores = get_store_info(formatted_address)
    schools = get_school_info(formatted_address)
    
    return render_template("information.html",
                                apartment_address=formatted_address,
                                doctors=doctors,
                                restaurants=restaurants,
                                stores=stores,
                                schools=schools)


if __name__ == "__main__":

    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension

    app.debug = True

    app.run(host="0.0.0.0")
