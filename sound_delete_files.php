<?php
// --------------------------------------------------------------------
/*
	sound_delete_files.php

					May/05/2014

*/
// --------------------------------------------------------------------
$path="/var/www/data_base/common/php_common";
set_include_path (get_include_path() . PATH_SEPARATOR . $path);
//
include	"cgi_manipulate.php";
// include ('list_files_exec.php');

$arry_param = cgi_manipulate ();

echo '*** sound_delete_files.php ***<br />';
// var_dump ($arry_param[0]);

foreach ($arry_param as $val_aa)
	{
	$file_delete = "./sound_data/" . $val_aa;

	unlink ($file_delete);

	echo $file_delete;
	echo "<br />";
	echo $val_aa;
	echo ' *** deleted ***<br />';
	};


// --------------------------------------------------------------------
?>
