'''
    using find_all does not work on an individual class url so this will be using a different implementation
'''

import urllib.request
import requests
from bs4 import BeautifulSoup

def benWork(soup):


    # looks for "div" and looks for "class" called course first
    text = soup.find_all("div", {"class": "container"})
    print(type(text))

    #finding the paragraph we need is in text[3]

    '''
    for i in range(len(text)):
        print(f"\n\n line: {i} \n\n")
        elementTag = text[i].get_text()
        print(elementTag)
    '''

    elementTag =  text[3].get_text()
    print(elementTag)
        
    # print(type(text))

def main():
    url = "https://apps.ualberta.ca/catalogue/course/cmput/201"
    # url = "https://apps.ualberta.ca/catalogue/course/cmput"

    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    benWork(soup)

main()
