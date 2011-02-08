//
//  webpagesViewController.h
//  webpages
//
//  Created by 2359Media on 9/23/10.
//  Copyright __MyCompanyName__ 2010. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface webpagesViewController : UIViewController<UIWebViewDelegate> {

	UIWebView *webViews;
	NSString *baseURL;
	BOOL CannotGoin;
	NSString *compareString;
}
- (id)initWithString:(NSString*)url;
@end

