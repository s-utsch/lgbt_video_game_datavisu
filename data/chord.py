# -*- coding: utf-8 -*-

import pandas as pd 
import sys
import pyquery
import string
import traceback
import MySQLdb

def getAllData(filename):
	archive = pd.read_csv(filename)
	# archive = archive.sort(['game'])

	return archive

if __name__ == '__main__':
	archive = getAllData(sys.argv[1]);
	pd.set_option('display.max_rows', len(archive))
	# print(archive['content'])
	# printOutCSV(archive['game'], "gamesNames")

	archive2 = pd.DataFrame.copy(archive);

	lesbian_to_gay=0;
	lesbian_to_bi=0;
	lesbian_to_trans=0;
	lesbian_to_nb=0;
	lesbian_to_nc=0
	gay_to_bi=0
	gay_to_trans=0
	gay_to_nb=0
	gay_to_nc=0
	bi_to_trans=0
	bi_to_nb=0
	bi_to_nc=0
	trans_to_nb=0
	trans_to_nc=0
	nb_to_nc=0

	print "[" + "\'Lesbian\', \'Gay\'," + str(lesbian_to_gay) + "]" 

	for index1, c1 in archive.iterrows():
		for index2, c2 in archive2.iterrows():
			if (c1['content_id'] != c2['content_id']):
				if ("lesbian" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("gay" in str(c2['char_sexuality']))):
					lesbian_to_gay += 1;
				if ("lesbian" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("bisexual" in str(c2['char_sexuality']))):
					lesbian_to_bi += 1;
				if ("lesbian" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("trans" in str(c2['char_gender']))):
					lesbian_to_trans += 1;
				if ("lesbian" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("binary" in str(c2['char_gender']))):
					lesbian_to_nb += 1;
				if ("lesbian" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("conforming" in str(c2['char_gender']))):
					lesbian_to_nc += 1;
			

				if ("gay" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("bisexual" in str(c2['char_sexuality']))):
					gay_to_bi += 1;
				if ("gay" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("trans" in str(c2['char_gender']))):
					gay_to_trans += 1;
				if ("gay" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("binary" in str(c2['char_gender']))):
					gay_to_nb += 1;
				if ("lesbian" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("conforming" in str(c2['char_gender']))):
					gay_to_nc += 1;
				
				if ("bi" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("trans" in str(c2['char_gender']))):
					bi_to_trans += 1;
				if ("bi" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("binary" in str(c2['char_gender']))):
					bi_to_nb += 1;
				if ("bi" in (str(c1['char_sexuality'])) and (c1['game_id'] == c2['game_id']) and ("conforming" in str(c2['char_gender']))):
					bi_to_nc += 1;
	
				if ("trans" in (str(c1['char_gender'])) and (c1['game_id'] == c2['game_id']) and ("binary" in str(c2['char_gender']))):
					trans_to_nb += 1;
				if ("trans" in (str(c1['char_gender'])) and (c1['game_id'] == c2['game_id']) and ("conforming" in str(c2['char_gender']))):
					trans_to_nc += 1;

				if ("binary" in (str(c1['char_gender'])) and (c1['game_id'] == c2['game_id']) and ("conforming" in str(c2['char_gender']))):
					nb_to_nc += 1;


	print "lesbian to gay:" + str(lesbian_to_gay)

	print "[" + "\'Lesbian\', \'Gay\'," + str(lesbian_to_gay) + "]," 
	print "[" + "\'Lesbian\', \'Bisexual\'," + str(lesbian_to_bi) + "],"
	print "[" + "\'Lesbian\', \'Trans\'," + str(lesbian_to_trans) + "],"
	print "[" + "\'Lesbian\', \'Non-binary\'," + str(lesbian_to_nb) + "],"
	print "[" + "\'Lesbian\', \'Non-conforming\'," + str(lesbian_to_nc) + "],"

	print "[" + "\'Gay\', \'Lesbian\'," + str(lesbian_to_gay) + "]," 
	print "[" + "\'Gay\', \'Bisexual\'," + str(gay_to_bi) + "],"
	print "[" + "\'Gay\', \'Trans\'," + str(gay_to_trans) + "],"
	print "[" + "\'Gay\', \'Non-binary\'," + str(gay_to_nb) + "],"
	print "[" + "\'Gay\', \'Non-conforming\'," + str(gay_to_nc) + "],"

	print "[" + "\'Bisexual\', \'Lesbian\'," + str(lesbian_to_bi) + "]," 
	print "[" + "\'Bisexual\', \'Gay\'," + str(gay_to_bi) + "],"
	print "[" + "\'Bisexual\', \'Trans\'," + str(bi_to_trans) + "],"
	print "[" + "\'Bisexual\', \'Non-binary\'," + str(bi_to_nb) + "],"
	print "[" + "\'Bisexual\', \'Non-conforming\'," + str(bi_to_nc) + "],"

	print "[" + "\'Trans\', \'Lesbian\'," + str(lesbian_to_trans) + "]," 
	print "[" + "\'Trans\', \'Gay\'," + str(gay_to_trans) + "],"
	print "[" + "\'Trans\', \'Bisexual\'," + str(bi_to_trans) + "],"
	print "[" + "\'Trans\', \'Non-binary\'," + str(trans_to_nb) + "],"
	print "[" + "\'Trans\', \'Non-conforming\'," + str(trans_to_nc) + "],"

	print "[" + "\'Non-binary\', \'Lesbian\'," + str(lesbian_to_nb) + "]," 
	print "[" + "\'Non-binary\', \'Gay\'," + str(gay_to_nb) + "],"
	print "[" + "\'Non-binary\', \'Bisexual\'," + str(bi_to_nb) + "],"
	print "[" + "\'Non-binary\', \'Trans\'," + str(trans_to_nb) + "],"
	print "[" + "\'Non-binary\', \'Non-conforming\'," + str(nb_to_nc) + "],"

	print "[" + "\'Non-conforming\', \'Lesbian\'," + str(lesbian_to_nc) + "]," 
	print "[" + "\'Non-conforming\', \'Gay\'," + str(gay_to_nc) + "],"
	print "[" + "\'Non-conforming\', \'Bisexual\'," + str(bi_to_nc) + "],"
	print "[" + "\'Non-conforming\', \'Non-binary\'," + str(nb_to_nc) + "],"
	print "[" + "\'Non-conforming\', \'Trans\'," + str(trans_to_nc) + "]"
