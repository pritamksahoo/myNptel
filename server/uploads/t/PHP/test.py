import cv2 as cv
import math
img = cv.imread('image.jpg')
# print(img[0])

for i in range(len(img)):
    for j in range(len(img[i])):
        for k in range(3):
            img[i][j][k] = (pow(img[i][j][k], 1.5))%255
cv.imshow('image',img)
cv.waitKey(0)
