function toggleEditArea(a){var b;var c=function(e,d){if(e.className.indexOf("hidden")>=0){b=true;e.removeClassName("hidden");a.src="types/PortletMenu/images/editSelect.gif"}else{b=false;e.addClassName("hidden");a.src="types/PortletMenu/images/edit.gif"}};$$("A.editArea").each(c);$$("IMG.editArea").each(c);setTimeout(function(){try{Ajax.setWaitState(true);new Ajax.Request("types/PortletMenu/updateSessionEditState.jsp",{method:"get",onSuccess:function(e){Ajax.setWaitState(false)},parameters:{editState:b}})}catch(d){alert(I18N.glp("warn.json.sessiontimeout"));Ajax.setWaitState(false)}},10)};