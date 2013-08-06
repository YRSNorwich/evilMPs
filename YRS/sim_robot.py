import random
import time
import pygame 
from pygame.locals import *
import sys


#colours
GOLD = (255,215,0)
PURPLE = (75,0,130)
RED = (255,0,0)
WHITE=(255,255,255)
BLACK = (0,0,0)


#USEFUL VARIABLES
WIDTH =500
HEIGHT =500
BACKGROUND = BLACK
robot_list = []
plant_list = []


pygame.init()
DISPLAYSURF = pygame.display.set_mode((WIDTH,HEIGHT))
textfont = pygame.font.Font("freesansbold.ttf", 16)

def event_check():
	answer = 0
	for event in pygame.event.get():
		if event.type == QUIT:
			pygame.quit()
			sys.exit()
		elif event.type == KEYDOWN:
			if event.key <255:
				answer = chr(event.key)
			else:
				answer = event.key
	return answer


class Robot(object):
	def __init__(self):
		global WIDTH
		global HEIGHT
		global BACKGROUND
		self.speed = random.randint(0,8)
		self.size = 5
		self.counter = 0
		self.direction = "up"
		self.directions = ["up","down","left","right"]

		self.direction_movementsy = {"up": -1,
									"down" : 1,
									"left" : 0,
									"right" : 0}

		self.direction_movementsx = {"up": 0,
									"down" : 0,
									"left" : -1,
									"right" : 1}






		self.x = random.randint(0,WIDTH)
		self.y = random.randint(0,HEIGHT)
		self.colour = RED

	def draw(self):
		pygame.draw.polygon(DISPLAYSURF,self.colour,((self.x,self.y),(self.x,self.y + self.size ),(self.x + self.size,self.y + self.size),(self.x + self.size,self.y)))
		pygame.display.update()

	def undraw(self):
		pygame.draw.polygon(DISPLAYSURF,BACKGROUND,((self.x,self.y),(self.x,self.y + self.size ),(self.x + self.size,self.y + self.size),(self.x + self.size,self.y)))
		pygame.display.update()

	def move(self):
		if self.counter  <6:
			self.undraw()
			self.x = self.x + self.direction_movementsx[self.direction]
			self.y = self.y + self.direction_movementsy[self.direction]
			self.draw()
		else:
			self.direction = random.choice(self.directions)
			self.counter = 0 





class Plant(object):

	def __init__(self):
		global WIDTH
		global HEIGHT
		global BACKGROUND
		self.flash_off = random.randint(0,5)
		self.flash_on = random.randint(0,5)
		self.colour = PURPLE
		self.mode = "off"
		self.size = 6
		self.x = random.randint(0,WIDTH)
		self.y = random.randint(0,HEIGHT)






	def draw(self):
		pygame.draw.polygon(DISPLAYSURF,self.colour,((self.x,self.y),(self.x,self.y + self.size ),(self.x + self.size,self.y + self.size),(self.x + self.size,self.y)))
		pygame.display.update()

	def undraw(self):
		pygame.draw.polygon(DISPLAYSURF,BACKGROUND,((self.x,self.y),(self.x,self.y + self.size ),(self.x + self.size,self.y + self.size),(self.x + self.size,self.y)))
		pygame.display.update()

	def flash(self):
		self.draw()
		time.sleep(self.flash_on)
		self.undraw()
		time.sleep(self.flash_off)





for x in xrange(20):
	plant_list.append(Plant())

for x in xrange(20):
	robot_list.append(Robot())

while True:
	for r in robot_list:
		r.move()
