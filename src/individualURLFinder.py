'''
    This python program takes in a url for an individual class from the Ualberta course catalog and will store 
    the paragraph that includes the information, specifically with the co/prerequisites
'''

import urllib.request
import requests
from bs4 import BeautifulSoup
from IndividualPara import isolateParagraph

import GetPrereqCorereq

BASEURL = "https://apps.ualberta.ca/catalogue/course" 



def nextURL(classCode: str) -> str:
    '''
        Takes a class code as input and returns the associated URL as a string
        ex: classCode = 'CMPUT 201'
        returns: "https://apps.ualberta.ca/catalogue/course/CMPUT/201" 
    '''
    codeList = classCode.split()
    if (len(codeList) != 2):
        print("invalid course")
        return 1
    
    newURL = BASEURL
    for i in range(2):
        newURL = newURL + '/' + codeList[i]

    print(newURL)
    return newURL

def main():
    # ensure the url ends in a 3 number class code
    # userInput = input("Please input your course: ")
    userInput = 'CMPUT 201'

    newURL = nextURL(userInput)
    
    r = requests.get(newURL)
    soup = BeautifulSoup(r.content, 'html.parser')
    isolateParagraph(soup)

main()
