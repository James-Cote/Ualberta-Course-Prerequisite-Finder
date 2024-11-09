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

def nextURL():
    pass
        
def main():
    baseURL = "https://apps.ualberta.ca/catalogue/course" 

    # ensure the url ends in a 3 number class code
    userInput = input("Please input your course: ")
    # userInput = 'CMPUT 201'

    inputList = userInput.split()

    print(inputList[1])
    if (len(inputList) != 2):
        print("invalid course")
        return 1

    newURL = baseURL
    for i in range(2):
        newURL = newURL + '/' + inputList[i]
    
    print(newURL)
    
    r = requests.get(newURL)
    soup = BeautifulSoup(r.content, 'html.parser')
    isolateParagraph(soup)

main()
