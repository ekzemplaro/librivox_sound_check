#! /bin/bash
#
#	get_mp3.sh
#
#						Nov/20/2013
#
# --------------------------------------------------------------------
file_mp3=$1
path_file="sound_data/"$file_mp3
#url_file="http://upload.librivox.org/share/uploads/tests/"$file_mp3
#url_file="http://dev.librivox.org/uploads/tests/"$file_mp3
#url_file="http://librivox.org/uploads/tests/"$file_mp3
url_file="https://librivox.org/uploads/tests/"$file_mp3
#
#
if [ ! -e $path_file ]
then
	wget -q -P sound_data --no-check-certificate $url_file
#	rm -f $path_file
fi
#
# --------------------------------------------------------------------

