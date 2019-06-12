import requests
import json
import os

url = 'https://api.yelp.com/v3/businesses/search'
api_key = os.environ.get('yelp_api_key')
headers = {'Authorization': 'Bearer %s' % api_key}

def get_apartment_info(formatted_address):
    """Renders apartment  information page for the selected apartment
        (formatted_address)"""
    apartment_address=formatted_address    
    params ={'term':'apartments',
              'location':apartment_address,
              'radius':100,
              'limit':5,
              'sort_by':'distance'
              }
 
    api_req = requests.get(url, params=params, headers=headers)
    api_data = json.loads(api_req.text)
    apartment = api_data["businesses"]   
    return apartment


def get_doctor_info(formatted_address):
    """Renders doctor information page for the selected apartment
        (formatted_address)"""
    apartment_address=formatted_address    
    params ={'term':'doctors',
              'location':apartment_address,
              'radius':1000,
              'limit':10,
              'sort_by':'distance'}
 
    api_req = requests.get(url, params=params, headers=headers)
    api_data = json.loads(api_req.text)
    doctors = api_data["businesses"]   
    return doctors


def get_restaurant_info(formatted_address):
    """Renders restaurants information page for the selected apartment
        (formatted_address)"""
    apartment_address=formatted_address    
    params = {'term':'restaurants',
              'location':apartment_address,
              'radius':1000,
              'limit':10,
              'sort_by':'distance'}
 
    api_req = requests.get(url, params=params, headers=headers)
 
    api_data = json.loads(api_req.text)
 
    restaurants = api_data["businesses"]
    return restaurants

def get_store_info(formatted_address):
    """Renders information page for the selected apartment(formatted_address)"""

    apartment_address=formatted_address
    params = {'term':'shopping',
              'location':apartment_address,
              'radius':1000,
              'limit':10,
              'sort_by':'distance'}
 
    api_req = requests.get(url, params=params, headers=headers)
 
    api_data = json.loads(api_req.text)
 
    stores = api_data["businesses"]
    
    return stores

def get_school_info(formatted_address):
    """Renders school information page for the selected apartment
        (formatted_address)"""
    apartment_address=formatted_address    
    params ={'term':'schools',
              'location':apartment_address,
              'radius':1000,
              'sort_by':'distance',
              'categories':'elementary'}
 
    api_req = requests.get(url, params=params, headers=headers)
    api_data = json.loads(api_req.text)
    schools = api_data["businesses"]   
    return schools