!function(b){var a=function(){b(document).on("focusin",".sortable-lazy :input",function(){var d=b(this).closest(".sortable-lazy");if(d.hasClass("wdg-tabpane")){d=d.closest(".widget").find("UL.wdg-tab.sortable-lazy")}b.jalios.Sortable.buildSortable(d);d.children().each(function(e){b(this).data("jalios.sortable",e)})});b(document).on("jalios:sortable",c)};var c=function(f){var h=b.jalios.Event.match(f,"sortable");if(!h){return}var g=b(h.container);if(!g||!g.hasClass("wdg-tab")){return}var e=h.ui.item;var d=g.children().map(function(){return b(this).data("jalios.sortable")}).get();JCMS.form.Widget.reorder(e[0],d)};b(document).ready(function(d){a()})}(window.jQuery);