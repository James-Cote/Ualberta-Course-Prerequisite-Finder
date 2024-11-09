'''
This baby program should grow into the program to sort courses into the tree of prereqs/coreqs. 
FOR NOW, all this code does is take ONE course and find its prereqs and coreqs.
For one course code,
2D array: 1 array for prereqs, 1 array for coreqs

EXAMPLE TEXT:
"
CMPUT 206 - Introduction to Digital Image Processing


View Available Classes



3 units (fi 6)(EITHER, 3-0-3)
An introduction to basic digital image processing theory, and the tools that make advanced image manipulation possible for ordinary users. Image processing is important in many applications: editing and processing photographs, special effects for movies, drawing animated characters starting with photographs, analyzing and enhancing remote imagery, and detecting suspects from surveillance cameras. Image processing building blocks and fundamental algorithms of image processing operations are introduced using Python libraries. Prerequisites: one of CMPUT 101, 174, or 274; one of MATH 100, 114, 117, 134, 144, or 154; and one of STAT 151, 161, 181, 235, 265, SCI 151, or MATH 181.
"
'''

def prereq_coreq(parent_text):
    '''
    Inputs: parent_text (a huge block of text that includes the course name and description, type str)
    Outputs: two lists in a tuple 
    '''
    #parent_text=parent_course.split()
    #get the course code
    for idx in range(len(parent_text)):
        if parent_text[idx].isdigit():  #find the first number in the text, which is the course number
            parent_code_num = parent_text[idx:idx+3]
            parent_code_name = parent_text[:idx-1]
            break
    
    for word in range(len(parent_text))

text= '''CMPUT 206 - Introduction to Digital Image Processing


View Available Classes



3 units (fi 6)(EITHER, 3-0-3)
An introduction to basic digital image processing theory, and the tools that make advanced image manipulation possible for ordinary users. Image processing is important in many applications: editing and processing photographs, special effects for movies, drawing animated characters starting with photographs, analyzing and enhancing remote imagery, and detecting suspects from surveillance cameras. Image processing building blocks and fundamental algorithms of image processing operations are introduced using Python libraries. Prerequisites: one of CMPUT 101, 174, or 274; one of MATH 100, 114, 117, 134, 144, or 154; and one of STAT 151, 161, 181, 235, 265, SCI 151, or MATH 181.
'''
prereq_coreq(text)
