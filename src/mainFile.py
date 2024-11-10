import individualURLFinder as iFinder
from courseClass import Course

COURSELIST = []


def createLayer(givenT):
    print("givenT: ", givenT)

    if givenT[1] == None:
        return
    if len(givenT[1]) == 0:
        return

    courseName = givenT[0] #original course
    prereqs = givenT[1]

    if courseName in COURSELIST:
        return

    course = Course(courseName, prereqs)
    

    for i in range(len(course.prereqs)):    # looping through all ANDs
        if len(course.prereqs[i]) > 1:
            for j in range(len(course.prereqs[i])):    # looping through all ORs
                courseCode = course.prereqs[i][j]
                prereqsList = iFinder.convertCourseCode(courseCode)
                createLayer(prereqsList)
        elif len(course.prereqs[i]) == 1:
            courseCode = course.prereqs[0][0]
            prereqsList = iFinder.convertCourseCode(courseCode)

            if prereqsList == 'INVALID':
                return
            createLayer(prereqsList)
        elif len(course.prereqs[i]) == 0:
            return
        else:
            print("BreakCase")

    COURSELIST.append(course)


def main():
    userInput = 'CMPUT 201'

    prereqsList = iFinder.convertCourseCode(userInput)

    createLayer(prereqsList)
    
    
    for i in COURSELIST:
        print(i.name)
    #print(COURSELIST)

main()