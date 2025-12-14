"""
Merge two ascii art images into one side by side.
For example, if you have two images:
██   ██ ██ 
██   ██ ██ 
███████ ██ 
██   ██ ██ 
██   ██ ██
and 
─▄▀─▄▀
──▀──▀
█▀▀▀▀▀█▄
█░░░░░█─█ 
▀▄▄▄▄▄▀▀  
You can merge them into one image like this:
─▄▀─▄▀    ██   ██ ██ 
──▀──▀    ██   ██ ██ 
█▀▀▀▀▀█▄  ███████ ██ 
█░░░░░█─█ ██   ██ ██ 
▀▄▄▄▄▄▀▀  ██   ██ ██ 
"""

import sys


def main():
    if len(sys.argv) != 3:
        print("Usage: asciimerger.py <image1> <image2>")
        sys.exit(1)

    with open(sys.argv[1]) as f1, open(sys.argv[2]) as f2:
        lines1, lines2 = f1.readlines(), f2.readlines()

    longest1, longest2 = max(lines1, key=len), max(lines2, key=len)

    for line1, line2 in zip(lines1, lines2):
        line1_adj = line1[:-1] + " " * (len(longest1) - len(line1))
        line2_adj = line2[:-1] + " " * (len(longest2) - len(line2))
        print(line1_adj + line2_adj)

    for line in lines1[len(lines2) :]:
        print(line[:-1] + " " * (len(longest1) - len(line)))
    for line in lines2[len(lines1) :]:
        print(" " * (len(longest1)) + line[:-1] + " " * (len(longest2) - len(line)))


if __name__ == "__main__":
    main()