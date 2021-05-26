import tkinter as tk
from PIL import Image,ImageTk,ImageFilter

temp = Image.open("街.jpg")
outputFile = temp.resize((900,600),Image.ANTIALIAS)
outputFile.save("display8.jpg")