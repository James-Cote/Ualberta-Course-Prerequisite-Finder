'''
    This python program takes in a url for an individual class from the Ualberta course catalog and will store 
    the paragraph that includes the information, specifically with the co/prerequisites
'''

import urllib.request
import requests
from bs4 import BeautifulSoup

def isolateParagraph(soup):
    '''
        looks through the html file and finds "containers"
    '''
    
    # soup.find_all returns a list of containers that include different parts of the website
    text = soup.find_all("div", {"class": "container"})
    # print(type(text))

    '''
    redundant code used to find the correct container
    for i in range(len(text)):
        print(f"\n\n line: {i} \n\n")
        elementTag = text[i].get_text()
        print(elementTag)
    '''

    elementTag =  text[3].get_text() #container at text[3] contains the paragraph we want
    print(elementTag)
        
def main():

    # ensure the url ends in a 3 number class code
    url = "https://apps.ualberta.ca/catalogue/course/cmput/201"

    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    isolateParagraph(soup)

main()
