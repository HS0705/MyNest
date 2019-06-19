from flask import Flask, redirect, request, render_template, session, json, flash
from jinja2 import StrictUndefined
from yelp_api import (get_apartment_info,get_doctor_info,get_restaurant_info,
                        get_store_info,get_school_info)
import os
from model import connect_to_db, db, User,Favorites

app = Flask(__name__)
# app.jinja_env.undefined = StrictUndefined
# app.jinja_env.auto_reload = True

# Required to use Flask sessions and the debug toolbar
app.secret_key = os.environ.get('app_key')

@app.route('/')
def home_page():
    """Renders Homepage"""

    return render_template("homepage.html")

@app.route('/register', methods=['GET'])
def register_form():
    """Show form for user signup."""

    return render_template("register_form.html")


@app.route('/register', methods=['POST'])
def register_process():
    """Process registration."""

    # Get form variables
    email = request.form["email"]
    password = request.form["password"]

    new_user = User(email=email, password=password)

    db.session.add(new_user)
    db.session.commit()

    flash(f"User {email} added.")
    return redirect("/")


@app.route('/login', methods=['GET'])
def login_form():
    """Show login form."""

    return render_template("login_form.html")


@app.route('/login', methods=['POST'])
def login_process():
    """Process login."""

    # Get form variables
    email = request.form["email"]
    password = request.form["password"]

    user = User.query.filter_by(email=email).first()

    if not user:
        flash("No such user")
        return redirect("/login")

    if user.password != password:
        flash("Incorrect password")
        return redirect("/login")

    session["user_id"] = user.user_id

    flash("Logged in")
    return redirect('/')

@app.route('/logout')
def logout():
    """Log out."""

    del session["user_id"]
    flash("Logged Out.")
    return redirect("/")
    
@app.route('/search')
def click():
    """Renders apartments page """
    address=request.args['address']
    if not session.get("user_id"):
        return redirect('/login')
    else:    
        all_favorites = Favorites.query.filter_by(user_id=session["user_id"]).all()
        # import pdb; pdb.set_trace()
        list_apt=[]
        for a in all_favorites:
            list_apt.append(a.apt_id) 
        return render_template("apartments.html",
                                        address=address,
                                        list_apt=list_apt)
    
@app.route('/favorite', methods=['POST'])
def apt_data():
    """posting the  apartment id marked as favorite to favorites table in  database"""

    data=request.get_json()
    all_favorites = Favorites.query.filter_by(user_id=session["user_id"]).all()
    # import pdb; pdb.set_trace()
    for a in all_favorites:
        if a.apt_id == data:
            return "Already Exist"
    apt_favorite=Favorites(apt_id=data,user_id=session["user_id"])
    db.session.add(apt_favorite)
    db.session.commit()
    return 'OK'



@app.route('/information/<formatted_address>')

def get_information(formatted_address):
    """Renders information page  for the selected apartmemt"""
    apartment=get_apartment_info(formatted_address)
    doctors = get_doctor_info(formatted_address)
    restaurants = get_restaurant_info(formatted_address)
    stores = get_store_info(formatted_address)
    schools = get_school_info(formatted_address)
    
    return render_template("information.html",
                                apartment_address=formatted_address,
                                apartments=apartment,
                                doctors=doctors,
                                restaurants=restaurants,
                                stores=stores,
                                schools=schools)


if __name__ == "__main__":


    app.debug = False

    connect_to_db(app)


    app.run(host="0.0.0.0")
