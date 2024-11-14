import individualURLFinder as iFinder
from courseClass import Course
import json

def getDataFromJSON(json_file):
    r_file = open(json_file, 'r')
    data = json.load(r_file)
    r_file.close()
    return data

def createEdges(all_courses):
    edges = {}
    j = 0
    for i_course in all_courses:
        if (j > 50):
            break
        j += 1

        print("COURSE CODE: ", i_course)
        course_code = iFinder.convertCourseCode(i_course)
        if (course_code == "INVALID"):
            print("INVALID", i_course)
        else:
            edges[course_code[0]] = course_code[1]
    return edges

def main():
    all_courses = getDataFromJSON('static/js/JSON/allCourses.json')
    course_edges = createEdges(all_courses)
    
    write_file = open("static/js/JSON/allCoursesPrereqs.json", 'w')
    write_file.write(json.dumps(course_edges))
    write_file.close()

if __name__ == '__main__':
    main()