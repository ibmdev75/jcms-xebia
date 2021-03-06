$(function() {

  module("jalios-common:strip()");

    test("should remove duplicate blanks", function() {
      equals($.jalios.Common.strip('Sample string example'), 'Sample string example', 'done');
    });

    test("should remove duplicate blanks", function() {
      equals($.jalios.Common.strip(' Sample   string  example   '), 'Sample string example', 'done');
    });
    
    test("should remove duplicate blanks", function() {
      equals($.jalios.Common.strip('  Sample string example'), 'Sample string example', 'done');
    });
    
    test("should remove duplicate blanks", function() {
      equals($.jalios.Common.strip('Sample string example   '), 'Sample string example', 'done');
    });
    
    test("should remove duplicate blanks", function() {
      equals($.jalios.Common.strip('Sample  string    example'), 'Sample string example', 'done');
    });
    
  module("jalios-common:blank()");
  
    test("should return true", function() {
      ok($.jalios.Common.blank(' '), 'is blank');
    });
  
    test("should return true", function() {
      ok($.jalios.Common.blank(undefined), 'is blank');
    });
    
    test("should return true", function() {
      ok($.jalios.Common.blank(false), 'is blank');
    });
    
    test("should return false", function() {
      ok(!$.jalios.Common.blank('hello world'), 'is not blank');
    });
    
  module("jalios-properties:get()");
  
  test("should return JCMS Javascript property", function() {
     same($.jalios.Properties.get('myplugin.some-feature.duration'), 42);
  });
  
  test("Properties test should be run by accessing html test suite through appserver for proper validation, not with mock file", function() {
    same(undefined, JCMS_Properties.mock);
  });
  
  module("jalios-http:encode()");
  
  test("should encode parameter", function() {
    same($.jalios.Http.encode('héllo wôrld'), 'h%C3%A9llo%20w%C3%B4rld', 'done');
  });
  
  module("jalios-http:decode()");
  
  test("should decode parameter", function() {
    same($.jalios.Http.decode('h%C3%A9llo+w%C3%B4rld'), 'héllo wôrld', 'done');
  });
  
  module("jalios-http:toQueryParams()");
    
    test("should parse url to object", function() {
      same($.jalios.Http.toQueryParams(undefined), {}, 'done');
    });
    
    test("should parse url to object", function() {
      same($.jalios.Http.toQueryParams('http://my.server/webapp/file.jsp'), {}, 'done');
    });

    test("should parse url to object", function() {
      same($.jalios.Http.toQueryParams('http://my.server/webapp/file.jsp?'), {}, 'done');
    });

    test("should parse url to object", function() {
      same($.jalios.Http.toQueryParams('http://my.server/webapp/file.jsp?paramA=value1'), {'paramA' : 'value1'}, 'done');
    });
    
    test("should parse url to object", function() {
      same($.jalios.Http.toQueryParams('http://my.server/webapp/file.jsp?paramA=value1&paramA=value2'), {'paramA' : ['value1','value2']}, 'done');
    });
    
    test("should parse url to object", function() {
      same($.jalios.Http.toQueryParams('http://my.server/webapp/file.jsp?paramA=value1&paramB=value1&paramA=value2'), {'paramA' : ['value1','value2'], 'paramB' : 'value1'}, 'done');
    });
    
    test("should parse url to object - test DEVJCMS-109", function() {
      same($.jalios.Http.toQueryParams('http://my.server/webapp/file.jsp?paramA=word1+word2&paramB=42+%2B+23&paramA=value2'), 
          {'paramA' : ['word1 word2','value2'], 'paramB' : '42 + 23'}, 'done');
    });
    
  module("jalios-http:getBaseUrl()");  
  
    test("should return the base URL", function() {
      
      var base = "http://my.base.url/webapp/";
      
      $('HEAD').append('<base href="'+base+'" />');
      same($.jalios.Http.getBaseUrl(), base, 'done');
      $('BASE').remove();
    });
    
  module("jalios-http:getUrlWithUpdatedParam()");  
  
    var url  = 'http://my.server/webapp/file.jsp?paramA=value1&paramB=value1&paramA=value2';
    test("should update url with parameters", function() {
      var url1 = 'http://my.server/webapp/file.jsp?paramC=value3&paramA=value1&paramB=value1&paramA=value2';
      same($.jalios.Http.getUrlWithUpdatedParam(url, 'paramC', 'value3'), url1, 'done');
    });
    
    test("should update url with parameters", function() {
      var url2 = 'http://my.server/webapp/file.jsp?paramA=value1&paramB=value1&paramA=value9&';
      same($.jalios.Http.getUrlWithUpdatedParam(url, 'paramA', 'value9'), url2, 'done'); 
    });
    
    test("should update url with parameters", function() {  
      var url3 = 'http://my.server/webapp/file.jsp?paramA=value1&paramB=value9&paramA=value2';
      same($.jalios.Http.getUrlWithUpdatedParam(url, 'paramB', 'value9'), url3, 'done'); 
    });
  
  module("jalios-dom:markResource()");  
    
    test("should mark given resources", function() {
      ok( $.jalios.DOM.markResource('path/to/resource'), 'is marked');
      ok(!$.jalios.DOM.markResource('path/to/resource'), 'is not marked again');
    });
  
  module("jalios-dom:loadStyleSheet()");
    
    test("should load a given stylesheet", function() {
      ok($.jalios.DOM.loadStyleSheet('assets/test.css','print','2'), 'is loaded');
      same($('HEAD LINK[media=print]').attr('href'),'assets/test.css?v=2','has link tag');
    });
    
  module("jalios-dom:loadJavaScript()");
  
    test("should load a given stylesheet", function() {
    
      $(document).on('jalios:ready', function(event){
        ok(true,'trigger jalios:ready');
        start();
      });
      stop(5000);
      
      ok($.jalios.DOM.loadJavaScript('assets/test.js','2'), 'is loaded');
      // jQuery magic, no tags in header
    });
    
    
  module("jalios-common:fn.exists()");
  
    test("should return false no query", function() {
      ok(!$().exists(), "don't exists");
    });
    
    test("should return true if DOM element exists", function() {
      ok($('#testExists').exists(), 'exists');
    });
    
    test("should return false wrong query", function() {
      ok(!$('#testExists2').exists(), "don't exists");
    });
    
  module("jalios-common:fn.identify()");
    
    test("should default on id", function() {
      equals($('#testIdentify').identify('pfx').attr('id'),'testIdentify', "use default");
    });
    
    test("should provide an id", function() {
      equals($('.testIdentify1').identify('pfx').attr('id'),'pfx_1', "has new id");
    });
    
    test("should provide an id", function() {
      equals($('.testIdentify2').identify().attr('id'),'jq_1', "has new id");
    });
    
  module("jalios-common:fn.matchClass()");
  
    test("should default on id", function() {
      var value = $('#testRegexp').matchClass(/test_(\S+)/g);
      deepEqual(value, ["reg1","reg2"], "match multiple classes");
    });
    
    test("should default on id", function() {
      var value = $('#testRegexp').matchClass(/test_(reg1)/g);
      deepEqual(value, ["reg1"], "match single classes");
    });
    
  module("jalios-common:fn.serializeObject()");
    
    test("should build a JSON object from Form", function() {
      same($('#testSerialize').serializeObject(), { 'inputA': ['value1','value3'], 'inputB' : 'value2-1' }, "done");
    });
    
  module("jalios-common:fn.isPortlet()");
    
    test("should not be a Portlet", function() {
      ok(!$().isPortlet(), "not a Portlet");
    });
      
    test("should be a Portlet", function() {
      ok($('#testPortlet').isPortlet(), "is Portlet");
    });
    
    test("should not be a Portlet", function() {
      ok(!$('#testPortlet2').isPortlet(), "not a  Portlet");
    });
    
  module("jalios-common:fn.getJcmsId()");
    
    test("should return an Id", function() {
      equals($('#testPortlet').getJcmsId(), 'c_1234', "have an Id");
    });
    
    test("should return a complex custom Id (as used in Virtual Desktop)", function() {
      equals($('#testDesktopService').getJcmsId(), 'dsk-service_130633477087120', "have an Id");
    });
    
    test("should return false", function() {
      ok(!$('#testPortlet2').getJcmsId(), "no Id");
    });
    
    test("should return false", function() {
      ok(!$().getJcmsId(), "no Id");
    });
    
  module("jalios-common:fn.getUsage()");
  
    test("should return a Usage", function() {
      equals($('#testPortlet').getUsage(), 'front', "have an usage");
    });
    
    test("should return an Usage", function() {
      ok(!$('#testPortlet2').getUsage(),  "have an usage");
    });

    test("should return a complex Usage", function() {
      equals($('#testDesktopService').getUsage(), 'jcmsplugin.my-usage.box', "have an usage");
    });
    
    test("should return an Usage", function() {
      ok(!$().getUsage(), "have an usage");
    });
    
});