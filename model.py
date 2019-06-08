from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """User of ratings website."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    email = db.Column(db.String(64), nullable=True)
    password = db.Column(db.String(64), nullable=True)

class Favorites(db.Model):

    __tablename__="favorites"

    id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    apt_id=db.Column(db.String(200),
                        nullable=False)
    user_id=db.Column(db.Integer,db.ForeignKey('users.user_id'),nullable=False)

    user = db.relationship("User",
                           backref=db.backref("favorites",
                                              order_by=apt_id))

def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our PostgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///nest'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will
    # leave you in a state of being able to work with the database
    # directly.

    from server import app
    connect_to_db(app)
    print("Connected to DB.")
