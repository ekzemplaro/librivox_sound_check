// -----------------------------------------------------------------------
//	sound_check.js
//
//					Jun/29/2013
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** sound_check *** start *** Jun/29/2013 ***<br />");

	sound_form_proc ();

	file_list_get_proc ();

	jQuery ("button#clear").click (function ()
		{
		jQuery(".contents").html ("<br />");
		jQuery(".comment").html ("<br />");
		jQuery("#outarea_bb").html ("<br />");
		jQuery("#outarea_dd").html ("<br />");
		jQuery("#outarea_ff").html ("<br />");
		jQuery("#outarea_gg").html ("<br />");
		});

	jQuery("#outarea_hh").html
		("*** sound_check *** end *** Jun/29/2013 ***<br />");

});

// -----------------------------------------------------------------------
function file_list_get_proc ()
{
	jQuery.getJSON ("./file_mp3_list.php",function (data_list)
		{
		var str_list = mp3_list_gen_proc (data_list);
		jQuery(".list_file").html (str_list);
		button_delete_monitor ();
		});
}

// -----------------------------------------------------------------------
function mp3_list_gen_proc (data_list)
{
	var str_list = "<table>";
	data_list.sort ();
	var str_aa = '<a href=\"sound_data/';

	for (var it in data_list)
		{
		var fname = data_list[it]["fname"];
		var size_aa = data_list[it]["size"];
		var date_aa = data_list[it]["date"];

		var id_in = data_list[it]["fname"];
		str_list += "<tr><td>";
		str_list += str_aa;
		str_list += id_in;
		str_list += '\">';
		str_list += id_in;
		str_list += '</a>';
		str_list += "</td><td>";
		str_list += size_aa;
		str_list += "</td><td>";
		str_list += date_aa;
		str_list += "</td><td>";
		str_list += '<input type="checkbox" id="' + id_in + '">';
		str_list += "</td></tr>";
		}

	str_list += "</table>";
	return	str_list;
}

// -----------------------------------------------------------------------
function button_delete_monitor ()
{

	jQuery ("button#delete").click (function ()
	{
		jQuery("#outarea_bb").html ("<br />");
		jQuery("#outarea_dd").html ("<br />");

		var nnx = jQuery(".list_file :checked").length;

		jQuery("#outarea_ff").text ("*** delete *** " + nnx);

		var arry = [];
		jQuery('.list_file :checked').each(function(){
			var file = this.id;
			arry.push(file);
			});

		delete_files_exec_proc (arry);
	});
}

// -----------------------------------------------------------------------
function delete_files_exec_proc (arry)
{
	var out_str_bb = "";

	for (it in arry)
		{
		out_str_bb += arry[it] + "<br />";
		}

	jQuery("#outarea_gg").html (out_str_bb);


	var url_delete = "./sound_delete_files.php";

	jQuery.post (url_delete,{my_data: arry},function (data_receive)
		{
		var out_str = "url_delete: " + url_delete + "<br />";
		out_str += "*** delete_files_exec_proc #outarea_ff ***<p />";
		jQuery("#outarea_ff").html (out_str);
		jQuery("#outarea_gg").html (data_receive);
		var data = null;

//	kokode sai hyoji

		file_list_get_proc ();

		});

}
// -----------------------------------------------------------------------
