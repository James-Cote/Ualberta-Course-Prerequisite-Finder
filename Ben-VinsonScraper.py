import urllib.request
import requests
from bs4 import BeautifulSoup

def benWork(soup):
    # looks for "div" and looks for "class" called course first
    text = soup.find_all("div", {"class": "course first"})
    # print(type(text))

    str;
    for i in range(len(text)):
        elementTag = text[i].get_text()
        print(elementTag)
        
    # print(type(text))

def main():
    # url = "https://apps.ualberta.ca/catalogue/course/cmput/201"
    url = "https://apps.ualberta.ca/catalogue/course/cmput"

    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    benWork(soup)

main()
