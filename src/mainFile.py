import individualURLFinder as iFinder
from courseClass import Course

COURSELIST = []
COURSENAMELIST = []


def createLayer(givenT):
    '''
    This is a function that will recursively find all of the prerequisite courses as given 
    by givenT
    '''
    print("givenT: ", givenT)
    # cases for if givenT is not valid
    if not givenT:
        return
    if givenT[1] == None:
        return
    if len(givenT[1]) == 0:
        return

    courseName = givenT[0] #original course
    prereqs = givenT[1]

    if courseName in COURSENAMELIST:
        return

    course = Course(courseName, prereqs)
    

    for i in range(len(course.prereqs)):    # looping through all ANDs
        if len(course.prereqs[i]) > 1: #  more than one course is a prereq
            for j in range(len(course.prereqs[i])):    # looping through all ORs
                courseCode = course.prereqs[i][j]
                prereqsList = iFinder.convertCourseCode(courseCode) # converts the coursecode into the prereqs list of that course
                print("1 createlayer")
                createLayer(prereqsList)
        elif len(course.prereqs[i]) == 1: # only one course is a prereq
            courseCode = course.prereqs[0][0]
            prereqsList = iFinder.convertCourseCode(courseCode)

            if prereqsList == 'INVALID':
                return
            print("2 createlayer")
            createLayer(prereqsList)
        elif len(course.prereqs[i]) == 0:
            return
        else:
            print("BreakCase")

    COURSELIST.append(course)
    COURSENAMELIST.append(courseName)

def userInput(name):
    COURSELIST.clear()
    prereqsList = iFinder.convertCourseCode(name)
    
    createLayer(prereqsList)
    
    for i in COURSELIST:
        print(i.name)

def main():
    userInput = 'MATH 315'

    prereqsList = iFinder.convertCourseCode(userInput)
    print("3 createlayer")
    createLayer(prereqsList)
    
    
    for i in COURSELIST:
        print(i.name)
    #print(COURSELIST)

main()