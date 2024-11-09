import urllib.request
import requests
from bs4 import BeautifulSoup

def benWork(soup):
    # looks for "div" and looks for "class" called course first
    text = soup.find("div", {"class": "course first"})
    text = text.get_text()
    print(text)
    print(type(text))

def main():
    url = "https://apps.ualberta.ca/catalogue/course/cmput"

    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    benWork(soup)
