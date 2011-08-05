package com.android.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.webview_layout);
        
        WebView wView = (WebView) findViewById(R.id.webview);
        wView.getSettings().setJavaScriptEnabled(true);
        wView.setBackgroundColor(0);
	    wView.loadUrl("file:///android_asset/testing/index.html");
    }
}