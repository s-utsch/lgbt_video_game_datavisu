import csv
import sys

FILENAME=sys.argv[1]

gay = 0.0
lesbian = 0.0
bi = 0.0
trans = 0.0
nb = 0.0
nc = 0.0
total = 0.0
with open(FILENAME, "r") as f:
	csvreader = csv.DictReader(f)
	for row in csvreader:
		gay = gay + float(row['gay'])
		lesbian = lesbian + float(row['lesbian'])
		bi = bi + float(row['bisexual'])
		trans = trans + float(row['trans'])
		nb = nb + float(row['non-binary'])
		nc = nc + float(row['non-conforming'])
		total = float(row['gay']) + float(row['lesbian']) + float(row['bisexual']) + float(row['trans']) + float(row['non-binary']) + float(row['non-conforming'])
		print "{ group: \"Gay\", category: " +  str(row['year']) + ", measure: " + str(row['gay']) + "}, ";
		print "{ group: \"Lesbian\", category: " +  str(row['year']) + ", measure: " + str(row['lesbian']) + "}, ";
		print "{ group: \"Bisexual\", category: " +  str(row['year']) + ", measure: " + str(row['bisexual']) + "}, ";
		print "{ group: \"Trans\", category: " +  str(row['year']) + ", measure: " + str(row['trans']) + "}, ";
		print "{ group: \"Non binary\", category: " +  str(row['year']) + ", measure: " + str(row['non-binary']) + "}, ";
		print "{ group: \"Non conf.\", category: " +  str(row['year']) + ", measure: " + str(row['non-conforming']) + "}, ";
		print "{ group: \"All\", category: " +  str(row['year']) + ", measure: " + str(total) + "}, ";


total = gay + lesbian + bi + trans + nb + nc
print "measure: " + str(gay/total);
print "measure: " + str(lesbian/total);
print "measure: " + str(bi/total);
print "measure: " + str(trans/total);
print "measure: " + str(nb/total);
print "measure: " + str(nc/total);

print "{ group: all, category: measure: " + str(gay/total);
print "measure: " + str(lesbian/total);
print "measure: " + str(bi/total);
print "measure: " + str(trans/total);
print "measure: " + str(nb/total);
print "measure: " + str(nc/total);

adv = 0.0
rpg = 0.0
shooter = 0.0
fight = 0.0
simu = 0.0
action = 0.0
with open("genres.csv", "r") as f:
	csvreader = csv.DictReader(f)
	for row in csvreader:
		total = float(row['gay']) + float(row['lesbian']) + float(row['bisexual']) + float(row['trans']) + float(row['non-binary']) + float(row['non-conforming'])
		if (str(row['genre']) == "adventure"):
			adv = adv + total
		if (str(row['genre']) == "rpg"):
			rpg = rpg + total			
		if (str(row['genre']) == "shooter"):
			shooter = shooter + total
		if (str(row['genre']) == "fighting"):
			fight = fight + total						
		if (str(row['genre']) == "simulation"):
			simu = simu + total			
		if (str(row['genre']) == "action"):
			action = action + total			

		print "{ group: \"Gay\", category: " +  str(row['genre']) + ", measure: " + str(row['gay']) + "}, ";
		print "{ group: \"Lesbian\", category: " +  str(row['genre']) + ", measure: " + str(row['lesbian']) + "}, ";
		print "{ group: \"Bisexual\", category: " +  str(row['genre']) + ", measure: " + str(row['bisexual']) + "}, ";
		print "{ group: \"Trans\", category: " +  str(row['genre']) + ", measure: " + str(row['trans']) + "}, ";
		print "{ group: \"Non-binary\", category: " +  str(row['genre']) + ", measure: " + str(row['non-binary']) + "}, ";
		print "{ group: \"Gender non-conforming\", category: " +  str(row['genre']) + ", measure: " + str(row['non-conforming']) + "}, ";


print "{ group: \"All\", category: \"Adventure\", measure: " + str(adv) + "}, ";
print "{ group: \"All\", category: \"RPG\", measure: " + str(rpg) + "}, ";
print "{ group: \"All\", category: \"Shooter\", measure: " + str(shooter) + "}, ";
print "{ group: \"All\", category: \"Fighting\", measure: " + str(fight) + "}, ";
print "{ group: \"All\", category: \"Simulation\", measure: " + str(simu) + "}, ";
print "{ group: \"All\", category: \"Action\", measure: " + str(action) + "}, ";
