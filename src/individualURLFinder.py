'''
    This python program takes in a url for an individual class from the Ualberta course catalog and will store 
    the paragraph that includes the information, specifically with the co/prerequisites
'''

import urllib.request
import requests
from bs4 import BeautifulSoup
from IndividualPara import isolateParagraph
import Course

import GetPrereqCorereq

BASEURL = "https://apps.ualberta.ca/catalogue/course" 
COURSEDICT = {}

def createLayer(givenT):
    original = givenT[0] #original course
    prereqs = givenT[1]
    # coreqs = givenT[2]

    course = Course(original, prereqs)

    for i in range(course.dependencyCount):
        dependencyName = course.pre[i]
        paragraph = isolateParagraph(nextURL(dependencyName))

def isolateParagraph(soup):
    '''
        looks through the html file and finds "containers"
    '''
    
    # soup.find_all returns a list of containers that include different parts of the website
    text = soup.find_all("div", {"class": "container"})
    #elementTag =  text[3].get_text() #container at text[3] contains the paragraph we want
    
    # Tag contains the course number and the course description which contains information about prereq
    elementTag = text[3]
    
    courseNumber = elementTag.find("h1", {"class": "m-0"}).get_text().strip() # Find the course number as text
    
    courseDesc = elementTag.find_all("p")[1].get_text().strip()     # Finds the description of the course
    #print(courseDesc)
    
    courseInfo = courseNumber + '\n' + courseDesc
    
    print(courseInfo)
    
    #print(elementTag)



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
