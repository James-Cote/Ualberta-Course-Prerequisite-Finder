from courseClass import Course
import json

def dumpCourseToJSON(course_list, json_file):
    nodeDataArray = []
    linkDataArray = []

    # Find the corresponding level
    node_level = {}

    # Fancy Colors
    color_i = 0

    for i_course in course_list:
        # Adding to level dictionary
        if (i_course.name not in node_level):
            node_level[i_course.name] = 0

        if (i_course.prereqs == None or len(i_course.prereqs) == 0):
            continue

        print(i_course.name, "prereqs", i_course.prereqs, type(i_course.prereqs))

        for colors in i_course.prereqs:
            if (type(colors) != list):
                continue
            for j_course in colors:
                # Add all connections to the link data file
                linkDataArray.append({"from":i_course.name, "to":j_course, "line_color":color_i})
                # Level Calculation
                if (j_course in node_level):
                    if (node_level[i_course.name] >= node_level[j_course]):
                        node_level[j_course] = node_level[i_course.name] + 1
                else:
                    node_level[j_course] = node_level[i_course.name] + 1
            # Next color group (finished this or fucntionality)
            color_i = color_i + 1


    # Make Node Array based on level
    mapped_nodes = list(node_level.items())
    mapped_nodes.sort(key = lambda x: x[1])
    print(mapped_nodes)
    for i_node in mapped_nodes:
        nodeDataArray.append({"key":i_node[0], "level":i_node[1]}) 
    
    # Write the JSON file
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

    dumpCourseToJSON(courses, "static/js/JSON/diagramData.json")

if __name__ == "__main__":
    main()