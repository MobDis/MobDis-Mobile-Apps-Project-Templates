//
//  webpagesViewController.m
//  webpages
//
//  Created by 2359Media on 9/23/10.
//  Copyright __MyCompanyName__ 2010. All rights reserved.
//

#import "webpagesViewController.h"
#define degreesToRadian(x) (M_PI * (x) / 180.0)
@implementation webpagesViewController




// The designated initializer. Override to perform setup that is required before the view is loaded.
- (id)initWithString:(NSString*)url {
    if ((self = [super init])) {
		baseURL=[url	copy];
        // Custom initialization
    }
    return self;
}



// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
	
	CannotGoin=YES;
	compareString=@"";
	webViews = [[UIWebView alloc] initWithFrame: CGRectMake(0.0f, 0, 320, 480)];  
	[webViews loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"]isDirectory:NO]]];
	webViews.delegate=self;
	webViews.autoresizingMask =UIViewAutoresizingFlexibleHeight |UIViewAutoresizingFlexibleWidth;
	//| UIViewAutoresizingFlexibleHeight;
	webViews.scalesPageToFit = YES;
	webViews.backgroundColor=[UIColor clearColor];
	[self.view addSubview:webViews];
	[webViews release];
	//CGAffineTransform transform = CGAffineTransformMakeRotation(degreesToRadian(90));
	//[webViews setTransform: transform];
	//[self.view setTransform: transform];
	
}
- (BOOL)webView:(UIWebView *)w shouldStartLoadWithRequest:(NSURLRequest *)r navigationType:(UIWebViewNavigationType)navigationType
{
    if ([[[r URL]absoluteString] hasPrefix:@"http"]){
    DLog(@"%@",[r URL]);
        [[UIApplication sharedApplication] openURL:[r URL]];

        return NO;
    }else{  
        return YES;
    }else if ([[[r URL]absoluteString] hasPrefix:@"browser://"]) {//next time can command to launch browser
        NSString* finalURL=[NSString stringWithString:[[r URL] absoluteString]];
        finalURL = [ finalURL stringByReplacingOccurrencesOfString:@"browser://" withString:@"http://"];
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:finalURL]];
        return NO;
    }else if ([[[r URL]absoluteString] hasPrefix:@"http://maps.google.com"]) {
        [[UIApplication sharedApplication] openURL:[r URL]];
        return NO;
    }    
    [[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:YES];
    return YES;
		
		
	
}

- (void)webViewDidFinishLoad:(UIWebView *)webView{
	CannotGoin=NO;
    [[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:NO];


}


// Override to allow orientations other than the default portrait orientation.
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
    //return (interfaceOrientation == UIInterfaceOrientationLandscapeLeft);
}


- (void)didReceiveMemoryWarning {
	// Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
	
	// Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
	// Release any retained subviews of the main view.
	// e.g. self.myOutlet = nil;
}


- (void)dealloc {
    [super dealloc];
}

@end
