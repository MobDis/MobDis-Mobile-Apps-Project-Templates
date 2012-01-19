package com.android.app;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends Activity {
	private WebView wView;
	
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
//        Intent browserIntent = new Intent(Intent.ACTION_VIEW,Uri.fromFile(new File("/mnt/sdcard/Server/index.html")));// Uri.parse("content://com.android.htmlfileprovider/sdcard/Server/index.html"));
//        browserIntent.setClassName("com.android.browser", "com.android.browser.BrowserActivity");
//		startActivity(browserIntent);
        
        setContentView(R.layout.webview_layout);
         
        wView = (WebView) findViewById(R.id.webview);
        wView.getSettings().setJavaScriptEnabled(true);
        wView.setBackgroundColor(0);
        wView.getSettings().setLoadsImagesAutomatically(true);
        wView.clearCache(true);
	    
	    wView.loadUrl("file:///android_asset/Server/index.html");
	    
//      wView.loadUrl("http://appointment.mobdis.co");
//	    wView.getSettings().setSupportZoom(true);
//	    wView.getSettings().setBuiltInZoomControls(true);
	    
//	    wView.setWebViewClient(new WebViewClient() {
//	    	@Override
//	    	public boolean shouldOverrideUrlLoading (WebView view, String url) {
//	    		Log.d("test","test: 1: "+url);
////	    		if(!url.contains("http://fareast.com.sg/watertown"))
////	    			return true;
////	    		Log.d("test","test: "+url);
////	    		Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
////	    		startActivity(browserIntent);
//	    		
//	    		return false;
//	    	}
//	    });
	    
	    //wView.loadUrl("http://ilovewatertown.com.sg");
//	    wView.loadUrl("http://jquerymobile.com");
	    wView.setWebChromeClient(new WebChromeClient() {
	    	@Override
	    	public boolean onJsAlert(WebView view, String browser_url, String url, JsResult result) {
	    		//Required functionality here
	    		Log.d("test","test url: "+url);
	    		Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
	    		startActivity(browserIntent);
	    		return true;
	        }
	    }); 
	  
	    wView.addJavascriptInterface(new IJavascriptHandler(), "communication");
	    
    }
    
    final class IJavascriptHandler {
    	   IJavascriptHandler() {
    	   }

    	   public void sendToAndroid(String url) {
    	      // this is called from JS with passed value
    		   Log.d("test","test urlb: "+url);
    		   Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
    		   startActivity(browserIntent);
    	   }
    }
    
}
