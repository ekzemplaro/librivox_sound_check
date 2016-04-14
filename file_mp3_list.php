<?php
// --------------------------------------------------------------------
/*
	file_mp3_list.php

					May/06/2013

*/
// --------------------------------------------------------------------
$result = file_list_mp3_proc ();

$str_json = json_encode ($result);

print	$str_json;

// --------------------------------------------------------------------
// [6]:
function file_list_mp3_proc ()
{
	$result = array ();


	$path = "sound_data/";

	$res_dir = opendir($path);

while( $file_name = readdir( $res_dir ) ){

	if (stripos ($file_name,".mp3"))
		{
		$path_file = $path . $file_name;
		$unit_aa = array ();
		$date_aa = date ("Y-m-d H:i",filemtime ($path_file));
		$size_aa = round (filesize ($path_file) / 1024) . "KB";
		$unit_aa['fname'] = $file_name;
		$unit_aa['date'] = $date_aa;
		$unit_aa['size'] = $size_aa;
		$result[] = $unit_aa;
		}
}

	closedir ($res_dir);

	return	$result;
}

// --------------------------------------------------------------------
?>
