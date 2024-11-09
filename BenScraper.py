# scraper-python.py
# To run this script, paste `python scraper-python.py` in the terminal

import requests
from bs4 import BeautifulSoup


def scrape():
    
    # url = 'https://www.example.com'
    url = 'https://apps.ualberta.ca/catalogue/course/cmput201'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # print(soup.prettify)


    test = soup.find("div", {"class": "course first"})
    text = soup.get_text()
    # text.split()

    # print(type(text))
    print(text)

if __name__ == '__main__':
    scrape()
