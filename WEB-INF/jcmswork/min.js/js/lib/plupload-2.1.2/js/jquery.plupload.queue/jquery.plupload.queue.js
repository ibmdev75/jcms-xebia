(function(c,e){var d={};function a(f){return plupload.translate(f)||f}function b(g,f){f.contents().each(function(h,j){j=c(j);if(!j.is(".plupload")){j.remove()}});f.prepend('<div class="plupload_wrapper plupload_scroll"><div id="'+g+'_container" class="plupload_container"><div class="plupload"><div class="plupload_header"><div class="plupload_header_content"><div class="plupload_header_title">'+a("Select files")+'</div><div class="plupload_header_text">'+a("Add files to the upload queue and click the start button.")+'</div></div></div><div class="plupload_content"><div class="plupload_filelist_header"><div class="plupload_file_name">'+a("Filename")+'</div><div class="plupload_file_action">&nbsp;</div><div class="plupload_file_status"><span>'+a("Status")+'</span></div><div class="plupload_file_size">'+a("Size")+'</div><div class="plupload_clearer">&nbsp;</div></div><ul id="'+g+'_filelist" class="plupload_filelist"></ul><div class="plupload_filelist_footer"><div class="plupload_file_name"><div class="plupload_buttons"><a href="#" class="plupload_button plupload_add" id="'+g+'_browse">'+a("Add Files")+'</a><a href="#" class="plupload_button plupload_start">'+a("Start Upload")+'</a></div><span class="plupload_upload_status"></span></div><div class="plupload_file_action"></div><div class="plupload_file_status"><span class="plupload_total_status">0%</span></div><div class="plupload_file_size"><span class="plupload_total_file_size">0 b</span></div><div class="plupload_progress"><div class="plupload_progress_container"><div class="plupload_progress_bar"></div></div></div><div class="plupload_clearer">&nbsp;</div></div></div></div></div><input type="hidden" id="'+g+'_count" name="'+g+'_count" value="0" /></div>')}c.fn.pluploadQueue=function(f){if(f){this.each(function(){var m,l,n,h;l=c(this);n=l.attr("id");if(!n){n=plupload.guid();l.attr("id",n)}h=l.html();b(n,l);f=c.extend({dragdrop:true,browse_button:n+"_browse",container:n},f);if(f.dragdrop){f.drop_element=n+"_filelist"}m=new plupload.Uploader(f);d[n]=m;function k(o){var q;if(o.status==plupload.DONE){q="plupload_done"}if(o.status==plupload.FAILED){q="plupload_failed"}if(o.status==plupload.QUEUED){q="plupload_delete"}if(o.status==plupload.UPLOADING){q="plupload_uploading"}var p=c("#"+o.id).attr("class",q).find("a").css("display","block");if(o.hint){p.attr("title",o.hint)}}function g(){c("span.plupload_total_status",l).html(m.total.percent+"%");c("div.plupload_progress_bar",l).css("width",m.total.percent+"%");c("span.plupload_upload_status",l).html(e.sprintf(a("Uploaded %d/%d files"),m.total.uploaded,m.files.length))}function i(){var p=c("ul.plupload_filelist",l).html(""),q=0,o;c.each(m.files,function(s,r){o="";if(r.status==plupload.DONE){if(r.target_name){o+='<input type="hidden" name="'+n+"_"+q+'_tmpname" value="'+plupload.xmlEncode(r.target_name)+'" />'}o+='<input type="hidden" name="'+n+"_"+q+'_name" value="'+plupload.xmlEncode(r.name)+'" />';o+='<input type="hidden" name="'+n+"_"+q+'_status" value="'+(r.status==plupload.DONE?"done":"failed")+'" />';q++;c("#"+n+"_count").val(q)}p.append('<li id="'+r.id+'"><div class="plupload_file_name"><span>'+r.name+'</span></div><div class="plupload_file_action"><a href="#"></a></div><div class="plupload_file_status">'+r.percent+'%</div><div class="plupload_file_size">'+plupload.formatSize(r.size)+'</div><div class="plupload_clearer">&nbsp;</div>'+o+"</li>");k(r);c("#"+r.id+".plupload_delete a").click(function(t){c("#"+r.id).remove();m.removeFile(r);t.preventDefault()})});c("span.plupload_total_file_size",l).html(plupload.formatSize(m.total.size));if(m.total.queued===0){c("span.plupload_add_text",l).html(a("Add Files"))}else{c("span.plupload_add_text",l).html(e.sprintf(a("%d files queued"),m.total.queued))}c("a.plupload_start",l).toggleClass("plupload_disabled",m.files.length==(m.total.uploaded+m.total.failed));p[0].scrollTop=p[0].scrollHeight;g();if(!m.files.length&&m.features.dragdrop&&m.settings.dragdrop){c("#"+n+"_filelist").append('<li class="plupload_droptext">'+a("Drag files here.")+"</li>")}}function j(){delete d[n];m.destroy();l.html(h);m=l=h=null}m.bind("UploadFile",function(o,p){c("#"+p.id).addClass("plupload_current_file")});m.bind("Init",function(o,p){if(!f.unique_names&&f.rename){l.on("click","#"+n+"_filelist div.plupload_file_name span",function(v){var t=c(v.target),r,u,q,s="";r=o.getFile(t.parents("li")[0].id);q=r.name;u=/^(.+)(\.[^.]+)$/.exec(q);if(u){q=u[1];s=u[2]}t.hide().after('<input type="text" />');t.next().val(q).focus().blur(function(){t.show().next().remove()}).keydown(function(x){var w=c(this);if(x.keyCode==13){x.preventDefault();r.name=w.val()+s;t.html(r.name);w.blur()}})})}c("#"+n+"_container").attr("title","Using runtime: "+p.runtime);c("a.plupload_start",l).click(function(q){if(!c(this).hasClass("plupload_disabled")){m.start()}q.preventDefault()});c("a.plupload_stop",l).click(function(q){q.preventDefault();m.stop()});c("a.plupload_start",l).addClass("plupload_disabled")});m.bind("Error",function(o,r){var p=r.file,q;if(p){q=r.message;if(r.details){q+=" ("+r.details+")"}if(r.code==plupload.FILE_SIZE_ERROR){alert(a("Error: File too large:")+" "+p.name)}if(r.code==plupload.FILE_EXTENSION_ERROR){alert(a("Error: Invalid file extension:")+" "+p.name)}p.hint=q;c("#"+p.id).attr("class","plupload_failed").find("a").css("display","block").attr("title",q)}if(r.code===plupload.INIT_ERROR){setTimeout(function(){j()},1)}});m.bind("PostInit",function(o){if(o.settings.dragdrop&&o.features.dragdrop){c("#"+n+"_filelist").append('<li class="plupload_droptext">'+a("Drag files here.")+"</li>")}});m.init();m.bind("StateChanged",function(){if(m.state===plupload.STARTED){c("li.plupload_delete a,div.plupload_buttons",l).hide();m.disableBrowse(true);c("span.plupload_upload_status,div.plupload_progress,a.plupload_stop",l).css("display","block");c("span.plupload_upload_status",l).html("Uploaded "+m.total.uploaded+"/"+m.files.length+" files");if(f.multiple_queues){c("span.plupload_total_status,span.plupload_total_file_size",l).show()}}else{i();c("a.plupload_stop,div.plupload_progress",l).hide();c("a.plupload_delete",l).css("display","block");if(f.multiple_queues&&m.total.uploaded+m.total.failed==m.files.length){c(".plupload_buttons,.plupload_upload_status",l).css("display","inline");m.disableBrowse(false);c(".plupload_start",l).addClass("plupload_disabled");c("span.plupload_total_status,span.plupload_total_file_size",l).hide()}}});m.bind("FilesAdded",i);m.bind("FilesRemoved",function(){var o=c("#"+n+"_filelist").scrollTop();i();c("#"+n+"_filelist").scrollTop(o)});m.bind("FileUploaded",function(o,p){k(p)});m.bind("UploadProgress",function(o,p){c("#"+p.id+" div.plupload_file_status",l).html(p.percent+"%");k(p);g()});if(f.setup){f.setup(m)}});return this}else{return d[c(this[0]).attr("id")]}}})(jQuery,mOxie);