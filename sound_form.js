// -----------------------------------------------------------------------
//	sound_form.js
//
//					Aug/23/2012
//
// -----------------------------------------------------------------------
function sound_form_proc ()
{
	jQuery('#myForm').ajaxForm(function(data_receive)
		{ 
		jQuery("#outarea_bb").html(data_receive);

		var file_mp3 = jQuery('#myForm [name=file_mp3]').val ();

		jQuery("#outarea_dd").text (file_mp3);

		var data_in = jQuery.parseJSON (data_receive);

		var str_out = "";
		var str_comment = "";

		if ("mono" in data_in)
			{
			var hantei = results_hantei_proc (data_in);
			str_out = table_gen_proc (data_in,hantei);
			str_comment = gen_commnets_proc (data_in,hantei);
			}
		else
			{
			str_out = gen_error_message_file (file_mp3);
			}

		jQuery(".contents").html (str_out);
		jQuery(".comment").html (str_comment);

		file_list_get_proc ();
		}); 
}

// -----------------------------------------------------------------------
// [4]:
function gen_error_message_file (file_mp3)
{
	var str_out = "<h2><span class=\"red\">*** error ***</span></h2>";

	var i_blank = file_mp3.indexOf (" ");

	str_out += "<blockquote>";

	if (0 < i_blank)
		{
		str_out += "Blank is included in the file name.<br />";
		}
	else
		{
		str_out += file_mp3;
		str_out += " doesn't exist in tests folder at LibriVox<br />";
		}

	str_out += "</blockquote>";

	return	str_out;
}

// -----------------------------------------------------------------------
function gen_commnets_proc (data_result,hantei)
{
	var str_message = "";
	var str_tmp = "";

	var volume_max = 2.0;
	var volume_min = -2.0;

	var flag_all = true;
	for (var unit in hantei)
		{
		str_tmp += hantei[unit] + " * ";

		if (! hantei[unit])
			{
			flag_all = false;
			}
		}

	str_tmp += "flag_all = " + flag_all;

	jQuery("#outarea_gg").html (str_tmp);

	if (flag_all)
		{
	str_message += "<h2><span class=\"green\">*** Congratulations ! ***</span></h2>";
		str_message += "<blockquote>";
		str_message += "Technical specs are OK.<br />";
		str_message += "Noises & plosives need to be check by someone.<br />";
		str_message += "</blockquote>";
		}
	else
		{
		str_message += "<span class=\"red\">";
		if (! hantei.mono)
			{
			str_message += "Must be saved in Mono.<br />";
			}

		if (volume_max <= data_result.db_change)
			{
			str_message += "The volume need to be increased.<br />";
			}
		else if (data_result.db_change <= volume_min)
			{
			str_message += "The volume need to be lowered.<br />";
			}
		str_message += "</span>";
		}

	return str_message;
}

// -----------------------------------------------------------------------
// [6]:
function results_hantei_proc (data_result)
{
	var hantei = new Object ();
	hantei.file_mp3 = false;
	hantei.mono = false;
	hantei.sample_rate = false;
	hantei.precision = false;
	hantei.export_bitrate = false;
	hantei.mpeg = false;
	hantei.db_change = false;


	hantei.file_mp3 = true;

	if (data_result.mpeg.slice(0,4) === "MPEG")
		{
		hantei.mpeg = true;
		}

	if ((data_result.export_bitrate === "127k")
		|| (data_result.export_bitrate === "128k")
		|| (data_result.export_bitrate === "129k"))
		{
		hantei.export_bitrate = true;
		}

	if (data_result.sample_rate == "44100")
		{
		hantei.sample_rate = true;
		}

	if (data_result.precision == "16-bit")
		{
		hantei.precision = true;
		}

	if (data_result.mono === "1")
		{
		hantei.mono = true;
		}

	if ((-3.0 < data_result.db_change ) && (data_result.db_change < 3.0))
		{
		hantei.db_change = true;
		}

	var str_out = "results_hantei_proc ff : ";
	str_out += data_result.file_mp3 + " ";
	str_out += hantei.file_mp3 + "<br />";

	str_out += data_result.mono + " ";
        str_out += hantei.mono + "<br />";

	jQuery("#outarea_ff").html (str_out);

	return	hantei;
}

// -----------------------------------------------------------------------
// [8]:
function table_gen_proc (data_result,hantei)
{
	var str_out = "<blockquote>";
	str_out += "<table>";
	str_out += record_gen_proc("File",data_result.file_mp3,hantei.file_mp3);


	str_out += record_gen_proc("Channel",data_result.mono,hantei.mono);
	str_out += record_gen_proc("Sample rate",data_result.sample_rate,hantei.sample_rate);
	str_out += record_gen_proc("Sample format",data_result.precision,hantei.precision);
	str_out += record_gen_proc("Export format",data_result.mpeg,hantei.mpeg);
	str_out += record_gen_proc("Export bitrate",data_result.export_bitrate,hantei.export_bitrate);

	var volume = 89.0 - data_result.db_change;

	volume += " dB";

	str_out += record_gen_proc("Volume",volume,hantei.db_change);

	str_out += "</table>";
	str_out += "</blockquote>";

	return	str_out;
}

// -----------------------------------------------------------------------
// [6-4]:
function record_gen_proc (tag,data_single,hantei_single)
{

	var str_out = "<tr><td>" + tag + "</td>";
	str_out += "<td>" + data_single + "</td>";

	var flag_class = "NG";

	if (hantei_single)
		{
		flag_class = "OK";
		}

	str_out += "<td class=\"" + flag_class + "\">" + flag_class + "</td></tr>";

	return	str_out;
}

// -----------------------------------------------------------------------
