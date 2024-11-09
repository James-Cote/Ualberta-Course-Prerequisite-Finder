import heapq as heap

def write_topological_sort(edges, file_name):
    w_file = open(file_name, 'w')

    # Create the topological number of edges
    num_dependicies = {}
    top_list = []  # Starting nodes
    for node, linked_edges in edges.items():
        if (linked_edges.empty()):
            top_list.append([0, node])
        for depend_node in linked_edges:
            if (depend_node in num_dependicies):
                num_dependicies[depend_node] = 

def main():

    dependicies = {
        "CMPUT 175": ["CMPUT 174"],
        "CMPUT 201": ["CMPUT 175"],
        "CMPUT 174": []
    }

    write_topological_sort(dependicies, "test.txt")

if __name__ == "__main__":
    main()