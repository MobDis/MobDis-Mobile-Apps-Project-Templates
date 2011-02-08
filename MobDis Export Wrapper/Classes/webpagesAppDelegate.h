//
//  webpagesAppDelegate.h
//  webpages
//
//  Created by 2359Media on 9/23/10.
//  Copyright __MyCompanyName__ 2010. All rights reserved.
//

#import <UIKit/UIKit.h>

@class webpagesViewController;

@interface webpagesAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
    webpagesViewController *viewController;
	UINavigationController *nav;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet webpagesViewController *viewController;

@end

