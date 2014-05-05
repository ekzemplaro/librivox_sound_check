<?php
// --------------------------------------------------------------------
/*
	sound_check.php

					Nov/23/2012

	must be installed

		mp3gain
		sox
		libsox-fmt-mp3
*/
// --------------------------------------------------------------------
$path="/var/www/data_base/common/php_common";
set_include_path (get_include_path() . PATH_SEPARATOR . $path);

// --------------------------------------------------------------------
// $file_mp3 = "1_min_test_hollya.mp3";

$file_mp3 = ltrim ($_POST['file_mp3']);

data_fetch_proc ($file_mp3);

$result = sound_spec_proc ($file_mp3);

$str_json = json_encode ($result);

print	$str_json;

// --------------------------------------------------------------------
// [2]:
function data_fetch_proc ($file_mp3)
{
	$command_aa = "./get_mp3.sh " . $file_mp3;

	system ($command_aa);
}

// --------------------------------------------------------------------
// [6]:
function sound_spec_proc ($file_mp3)
{
	$result = array ();

	$result['file_mp3'] = $file_mp3;

	$path = "sound_data/" . $file_mp3;

	$result = sound_spec_proc_file ($path,$result);

	$result = sound_spec_proc_gain ($path,$result);

	return	$result;
}

// --------------------------------------------------------------------
// [6-4]:
function sound_spec_proc_file ($file_mp3,$result)
{
	$command_aa = "soxi " . $file_mp3;
	$str_aa = command_execute_proc ($command_aa);
	$lines = explode ("\n",$str_aa);

	$count = count($lines);

	for ($it = 0; $it < $count; $it++)
		{
		$line = $lines[$it];

		if (3 < strlen ($line))
			{
			$mtx = explode (":",rtrim ($line));
			if (1 < count ($mtx))
			{
			$key = rtrim ($mtx[0]);
			$value = ltrim ($mtx[1]);
			switch ($key)
				{
				case	"Channels":
					$result['mono'] = $value;
					break;

				case	"Sample Rate":
					$result['sample_rate'] = $value;
					break;

				case	"Precision":
					$result['precision'] = $value;
					break;

				case	"Bit Rate":
					$result['export_bitrate'] = $value;
					break;

				case	"Sample Encoding":
					$result['mpeg'] = $value;
					break;

				}
			}
			}
		}

	return	$result;
}

// --------------------------------------------------------------------
// [6-8]:
function sound_spec_proc_gain ($file_mp3,$result)
{
	$command_bb = "mp3gain " . $file_mp3;
	$str_bb = command_execute_proc ($command_bb);

	$lines = explode ("\n",$str_bb);

	$mtx = explode (":",$lines[1]);
	$result['db_change'] = ltrim ($mtx[1]);

	return	$result;
}

// --------------------------------------------------------------------
// [6-4-8]:
function command_execute_proc ($command_in)
{
	$handle = popen ($command_in,'r');
	$str_in = fread($handle, 2096);
	pclose($handle);
	return $str_in;
}

// --------------------------------------------------------------------
?>
