import requests
from bs4 import BeautifulSoup
from courseClass import Course
import GetPrereqCorereq
import json

def getCoursePrefixes(soup):
    course_soup = soup.find_all("a", {"class": "d-block"})
    for i in range(len(course_soup)):
        course_soup[i] = course_soup[i].get_text(strip=True)
        j = 0
        while (j < len(course_soup[i]) and course_soup[i][j] != '-'):
            j += 1
        course_soup[i] = course_soup[i][:j-1].replace(' ', '_')
    return course_soup


def getSoup(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    return soup

def getCourseNumbers(soup, course_prefix):
    course_soup = soup.find_all("a")
    course_nums = []

    prefix_length = len(course_prefix)

    for i_course in course_soup:
        i_course = i_course.get_text(strip=True)
        if (len(i_course) > prefix_length):
            if (i_course[:prefix_length] == course_prefix):
                course_nums.append(i_course[:prefix_length + 4])
    return course_nums


def getCourseNames(course_list):
    all_courses = []
    url_base = "https://apps.ualberta.ca/catalogue/course/"

    for i_course in course_list:
        print(url_base + i_course)
        i_soup = getSoup(url_base + i_course)
        i_course_nums = getCourseNumbers(i_soup, i_course)
        all_courses = all_courses + i_course_nums

    print(all_courses)
    return all_courses

def main():
    soup = getSoup("https://apps.ualberta.ca/catalogue/course")
    course_list = getCoursePrefixes(soup)
    all_courses = getCourseNames(course_list)

    write_file = open("static/js/JSON/allCourses.json", 'w')
    write_file.write(json.dumps(all_courses))
    write_file.close()

if __name__ == "__main__":
    main()