import time
import random
import math
import plotter
# from PIL import Image

plot = plotter.Plotter()
TWO_PI = 6.2831

def lerp(a: float, b: float, t: float) -> float:

		return (1 - t) * a + t * b

def lerp_3D(v1, v2, t):
		x = v1["x"] + (v2["x"] - v1["x"]) * t
		y = v1["y"] + (v2["y"] - v1["y"]) * t
		z = v1["z"] + (v2["z"] - v1["z"]) * t
		return {"x": x,"y": y,"z": z}

def x_rotate(VEC,INC):
	dis = math.sqrt(pow(VEC["z"],2)+pow(VEC["y"],2));
	ang = math.atan2(VEC["z"],VEC["y"])+INC;
	VEC["z"] = math.sin(ang)*dis;
	VEC["y"] = math.cos(ang)*dis;
	return VEC

def y_rotate(VEC,INC):
	dis = math.sqrt(pow(VEC["x"],2)+pow(VEC["z"],2));
	ang = math.atan2(VEC["x"],VEC["z"])+INC;
	VEC["x"] = math.sin(ang)*dis;
	VEC["z"] = math.cos(ang)*dis;
	return VEC

class ShoppingCart:
		# model initiated as class with lines, XOFF, YOFF, ZOFF,	xrot, yrot,
		def __init__(self):

				anchor = {
						#front end
						"a" : {"x":-0.6, "y":-0.50, "z":-1.2},
						"b" : {"x": 0.6, "y":-0.50, "z":-1.2},
						"c" : {"x": 0.6, "y": 0.10, "z":-1},
						"d" : {"x":-0.6, "y": 0.10, "z":-1},
						# back end
						"e" : {"x":-0.7, "y": -0.7, "z": 1.3},
						"f" : {"x": 0.7, "y": -0.7, "z": 1.3},
						"g" : {"x": 0.7, "y":	 0.2, "z": 1},
						"h" : {"x":-0.7, "y":	 0.2, "z": 1}
				}

				self.line = []
				self.cropped = []

				c_ribs = 33
				for rib in range(c_ribs):
						i = rib/c_ribs
						p1 = lerp_3D(anchor["a"], anchor["e"], i)
						p2 = lerp_3D(anchor["d"], anchor["h"], i)
						p3 = lerp_3D(anchor["c"], anchor["g"], i)
						p4 = lerp_3D(anchor["b"], anchor["f"], i)
						self.line.append([p1,p2,p3,p4])

				# # long ribs
				l_ribs = 14
				for rib in range(l_ribs):

						i = rib/l_ribs
						p1 = lerp_3D(anchor["a"], anchor["b"], i)
						p2 = lerp_3D(anchor["d"], anchor["c"], i)
						p3 = lerp_3D(anchor["h"], anchor["g"], i)

						self.line.append([p1,p2,p3])

				# lat ribs
				lat_ribs = 5
				for rib in range(lat_ribs):
						for e in range(2):
								i	 = (rib+1)/lat_ribs + (e*0.02)
								p1 = lerp_3D(anchor["h"], anchor["e"], i)
								p2 = lerp_3D(anchor["d"], anchor["a"], i)
								p3 = lerp_3D(anchor["c"], anchor["b"], i)
								p4 = lerp_3D(anchor["g"], anchor["f"], i)
								p5 = lerp_3D(anchor["h"], anchor["e"], i)

								self.line.append([p1,p2,p3,p4,p5])

				# back ribs
				ribs = [0,0.1,0.2,0.5,0.6,0.9,1.0]
				for rib in ribs:
						p1 = lerp_3D(anchor["e"], anchor["f"], rib)
						p2 = lerp_3D(anchor["h"], anchor["g"], rib)
						self.line.append([p1,p2])

				# seat
				n = 30
				for rib in range(n):
						i	 = (rib/n*0.33)
						e = anchor["e"]
						f = anchor["f"]
						h = anchor["h"]
						g = anchor["g"]
						p1 = lerp_3D({"x":e["x"],"y":e["y"]+0.1,"z":e["z"]}, {"x":f["x"],"y":f["y"]+0.1,"z":f["z"]}, i+0.33)
						p2 = lerp_3D({"x":h["x"],"y":h["y"]-0.6 ,"z":h["z"]+0.1}, {"x":g["x"],"y":g["y"]-0.6 ,"z":g["z"]+0.1}, i+0.33)

						self.line.append([p1,p2])

				# handlebar
				for e in range(2):
						for i in range(2):
								yoff = e*0.025
								xoff = i*0.025

								point = [
										{"x":anchor["h"]["x"]+xoff,"y":anchor["h"]["y"]-0.0+yoff,"z":anchor["h"]["z"]+0.025},
										{"x":anchor["e"]["x"]+xoff,"y":anchor["e"]["y"]-0.0+yoff,"z":anchor["e"]["z"]+0.025},
										{"x":anchor["e"]["x"]+xoff,"y":anchor["e"]["y"]-0.2+yoff,"z":anchor["e"]["z"]+0.3},
										{"x":anchor["f"]["x"]+xoff,"y":anchor["f"]["y"]-0.2+yoff,"z":anchor["f"]["z"]+0.3},
										{"x":anchor["f"]["x"]+xoff,"y":anchor["f"]["y"]-0.0+yoff,"z":anchor["f"]["z"]+0.025},
										{"x":anchor["g"]["x"]+xoff,"y":anchor["g"]["y"]-0.0+yoff,"z":anchor["g"]["z"]+0.025},
								]

								self.line.append(point)

				# undercarriage
				for e in range(2):
						for i in range(2):
								yoff = e*0.025
								xoff = i*0.025

								point = [
										{"x":-0.7+xoff, "y": 0.6+yoff, "z": 0.3}, #"lm_l"
										{"x":-0.7+xoff, "y": 0.2+yoff, "z": 0.0}, #"um_l"
										{"x":-0.7+xoff, "y": 0.2+yoff, "z": 1.0}, #"ub_l"
										{"x":-0.7+xoff, "y": 0.6+yoff, "z": 1.3}, #"lb_l"
										{"x":-0.4+xoff, "y": 0.6+yoff, "z":-1.0}, #"lf_l"
										{"x": 0.4+xoff, "y": 0.6+yoff, "z":-1.0}, #"lf_r"
										{"x": 0.7+xoff, "y": 0.6+yoff, "z": 1.3}, #"lb_r"
										{"x": 0.7+xoff, "y": 0.2+yoff, "z": 1.0}, #"ub_r"
										{"x": 0.7+xoff, "y": 0.2+yoff, "z": 0.0}, #"um_r"
										{"x": 0.7+xoff, "y": 0.6+yoff, "z": 0.3}	#"lm_r"
								]

								self.line.append(point)

				wheel = [
						{"x":-0.6, "y": 0.75, "z":1.2}, #"bl"
						{"x": 0.6, "y": 0.75, "z":1.2}, #"br"
						{"x": 0.3, "y": 0.75, "z":-0.8},	 #"fl"
						{"x":-0.3, "y": 0.75, "z":-0.8}		 #"fr"
				]
				a = TWO_PI/20
				rad = 0.15
				for w in wheel:
						point = []
						for i in range(200):
								point.append(
										{"x": i*0.0003 + w["x"],"y": math.sin(a*i)*rad + w["y"] ,"z": math.cos(a*i)*rad + w["z"]}
								)
						self.line.append(point)
						point = []
						for i in range(100):
								point.append(
										{"x": w["x"],"y": math.sin(a*i)*(rad-i*0.0005) + w["y"] ,"z": math.cos(a*i)*(rad-i*0.0005) + w["z"]}
								)
						self.line.append(point)
						point = []
						for i in range(100):
								point.append(
										{"x": w["x"],"y": math.sin(a*i)*(rad*i*0.005) + w["y"] ,"z": math.cos(a*i)*(rad*i*0.005) + w["z"]}
								)
						self.line.append(point)

		def rotate(self, XROT, YROT):
				for e in range(len(self.line)):
						for i in range(len(self.line[e])):
								p = x_rotate(self.line[e][i], XROT)
								self.line[e][i] = y_rotate(p, YROT)
		
		def threshCheck(self, THRESH):
				line = self.line.copy()
				newLines = []
				
				for e in range(len(line)):
						if not line[e]:
								continue
								
						newLine = []
						
						for i in range(len(line[e]) - 1):
								p1 = line[e][i]
								p2 = line[e][i+1]
								
								# Case 1: Both points are submerged (Skip completely)
								if p1["y"] >= THRESH and p2["y"] >= THRESH:
										continue
										
								# Case 2: Both points are valid/unsubmerged
								elif p1["y"] <= THRESH and p2["y"] <= THRESH:
										if not newLine:
												newLine.append(p1)
										newLine.append(p2)
										
								# Case 3: Transitioning from valid to submerged (Going under/above)
								elif p1["y"] <= THRESH and p2["y"] > THRESH:
										if not newLine:
												newLine.append(p1)
										
										# Calculate exact intersection point
										t = (THRESH - p1["y"]) / (p2["y"] - p1["y"])
										intersect = {
												"x": p1["x"] + t * (p2["x"] - p1["x"]),
												"y": THRESH,
												"z": p1["z"] + t * (p2["z"] - p1["z"])
										}
										newLine.append(intersect)
										
										# Close this segment and save it
										newLines.append(newLine)
										newLine = []
										
								# Case 4: Transitioning from submerged back to valid
								elif p1["y"] > THRESH and p2["y"] <= THRESH:
										# Calculate exact intersection point
										t = (THRESH - p1["y"]) / (p2["y"] - p1["y"])
										intersect = {
												"x": p1["x"] + t * (p2["x"] - p1["x"]),
												"y": THRESH,
												"z": p1["z"] + t * (p2["z"] - p1["z"])
										}
										# Start a brand new split line segment starting at the intersection
										newLine = [intersect, p2]
		
						# If a line finishes while still valid, save the final segment
						if newLine:
								newLines.append(newLine)
								
				self.line = newLines


		def render(self, SIZE, XPOS,YPOS,XOFF,YOFF):

				fov = 0.25
				plot.penRaise()
				for e in range(len(self.line)):
						line = self.line[e]
						for i in range(len(line)):
								if e % 2 == 0:
										point = line[i].copy()
								else:
										point = line[len(line)-(i+1)].copy()
								if i == 1: 
										plot.penLower()
										
								# render 3D points
								s = 1/(1+(point["z"])*fov)
								x = (point["x"]+XOFF)*s*SIZE + XPOS
								y = (point["y"]+YOFF)*s*SIZE + YPOS
								plot.moveTo(x,y)
						plot.penRaise()

def cropmarks(X,Y,FRAME_W,FRAME_H,COLS,ROWS):
		row = 0
		col = 0
		leng = 500
		while row<=ROWS:
			x = X + 0
			y = Y + (row*FRAME_H)
			plot.line(x,y,x-leng,y)
			row += 1
		row -= 1
		while col<=COLS:
			x = X+(col*FRAME_W)
			y = Y+(ROWS*FRAME_H)
			plot.line(x,y,x,y+leng)
			col += 1
		col -= 1
		while row>=0:
			x = X+(COLS*FRAME_W)
			y = Y+(row*FRAME_H)
			plot.line(x,y,x+leng,y)
			row -= 1
		while col>=0:
			x = X+(col*FRAME_W)
			y = Y+0
			plot.line(x,y,x,y-leng)
			col -= 1

try:
		random.seed(2)
		frame_w = 15000
		frame_h = 11000
		rows = 2
		cols = 2
		width = cols*frame_w
		height = rows*frame_h
		
		#cropmarks(0,0,frame_w,frame_h,cols,rows)
		
		for row in range(rows):
			for col in range(cols):
				x = col*frame_w + (frame_w*0.5)
				y = row*frame_h + (frame_h*0.65)
				cart = ShoppingCart()
				cart.rotate(random.random()*3,random.random()*3)
				cart.rotate(random.random()*3,random.random()*3)
				cart.rotate(random.random()*3,random.random()*3)
				cart.threshCheck(0.2)
				cart.render(2500, x+frame_w*0.2, y,  0.15, 0.2)
				cart.render(2500, x-frame_w*0.2, y, -0.15, 0.2)

		print("end")
		plot.moveTo(0,0)



except KeyboardInterrupt:
		plot.penRaise()
		plot.moveTo(0,0)
		time.sleep(2)
		print("force quit + return")