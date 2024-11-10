from courseClass import Course
import json

def dumpCourseToJSON(course_list, json_file):
    nodeDataArray = []
    linkDataArray = []

    for i_course in course_list:
        # Add the node to the node data file
        nodeDataArray.append({"key":i_course.name})
        color_i = 0
        for colors in i_course.prereqs:
            # Get the color of the prereqs
            color_code = "#990000"
            if (color_i == 1):
                color_code = "#009900"
            elif (color_i == 2):
                color_code = "#000099"
            color_i += 1

            for j_course in colors:
                # Add all connections to the link data file
                linkDataArray.append({"from":i_course.name, "to":j_course, "color":color_code})
    
    write_file = open(json_file, 'w')

    all_data = [nodeDataArray, linkDataArray]
    write_file.write(json.dumps(all_data))

    write_file.close()


def main():
    courses = []
    courses.append(Course("MATH 315", [["MATH 305"], ["MATH 303", "MATH 304"]]))
    courses.append(Course("MATH 305", []))
    courses.append(Course("MATH 304", [["MATH 100"]]))
    courses.append(Course("MATH 303", [["MATH 100"]]))
    courses.append(Course("MATH 100", []))

    dumpCourseToJSON(courses, "../static/js/JSON/diagramData.json")

if __name__ == "__main__":
    main()