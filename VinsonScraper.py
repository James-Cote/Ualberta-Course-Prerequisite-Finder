import urllib.request
import requests
from bs4 import BeautifulSoup

url = "https://apps.ualberta.ca/catalogue/course/cmput"

r = requests.get(url)

soup = BeautifulSoup(r.content, 'html.parser')

test = soup.find("div", {"class": "course first"})
#print(test.prettify())